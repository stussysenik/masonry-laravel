@extends('admin.layout')

@php($editing = $dealer->exists)

@section('title', $editing ? 'Edit Dealer' : 'Create Dealer')
@section('eyebrow', 'Network')
@section('heading', $editing ? 'Edit Dealer' : 'Create Dealer')

@section('content')
    <form action="{{ $editing ? route('admin.dealers.update', $dealer) : route('admin.dealers.store') }}" method="post" enctype="multipart/form-data" class="admin-card max-w-4xl space-y-6">
        @csrf
        @if ($editing)
            @method('put')
        @endif

        <div class="form-grid">
            <label class="block">
                <span class="admin-label">Name</span>
                <input type="text" name="name" value="{{ old('name', $dealer->name) }}" class="admin-input" required>
            </label>
            <label class="block">
                <span class="admin-label">City</span>
                <input type="text" name="city" value="{{ old('city', $dealer->city) }}" class="admin-input" required>
            </label>
            <label class="block">
                <span class="admin-label">Country</span>
                <input type="text" name="country" value="{{ old('country', $dealer->country) }}" class="admin-input" required>
            </label>
            <label class="block">
                <span class="admin-label">Phone</span>
                <input type="text" name="phone" value="{{ old('phone', $dealer->phone) }}" class="admin-input">
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Email</span>
                <input type="email" name="email" value="{{ old('email', $dealer->email) }}" class="admin-input">
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Address</span>
                <textarea name="address" rows="4" class="admin-input">{{ old('address', $dealer->address) }}</textarea>
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Image</span>
                <input type="file" name="image" class="admin-input">
                @if ($dealer->image_url)
                    <img src="{{ $dealer->image_url }}" alt="{{ $dealer->name }}" class="mt-4 h-40 w-full object-cover">
                @endif
            </label>
        </div>

        <label class="flex items-center gap-3 text-sm text-white/70">
            <input type="checkbox" name="is_active" value="1" class="admin-checkbox" @checked(old('is_active', $dealer->is_active))>
            Visible on the public site
        </label>

        <div class="flex gap-4">
            <button type="submit" class="btn-primary">{{ $editing ? 'Update dealer' : 'Create dealer' }}</button>
            <a href="{{ route('admin.dealers.index') }}" class="btn-outline">Cancel</a>
        </div>
    </form>
@endsection
