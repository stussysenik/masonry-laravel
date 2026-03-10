@extends('admin.layout')

@php($editing = $brand->exists)

@section('title', $editing ? 'Edit Brand' : 'Create Brand')
@section('eyebrow', 'Catalog')
@section('heading', $editing ? 'Edit Brand' : 'Create Brand')

@section('content')
    <form action="{{ $editing ? route('admin.brands.update', $brand) : route('admin.brands.store') }}" method="post" class="admin-card max-w-3xl space-y-6">
        @csrf
        @if ($editing)
            @method('put')
        @endif

        <label class="block">
            <span class="admin-label">Name</span>
            <input type="text" name="name" value="{{ old('name', $brand->name) }}" class="admin-input" required>
        </label>

        <label class="block">
            <span class="admin-label">Teaser</span>
            <textarea name="teaser" rows="4" class="admin-input">{{ old('teaser', $brand->teaser) }}</textarea>
        </label>

        <label class="block">
            <span class="admin-label">Sort order</span>
            <input type="number" min="0" name="sort_order" value="{{ old('sort_order', $brand->sort_order) }}" class="admin-input" required>
        </label>

        <label class="flex items-center gap-3 text-sm text-white/70">
            <input type="checkbox" name="is_active" value="1" class="admin-checkbox" @checked(old('is_active', $brand->is_active))>
            Visible on the public site
        </label>

        <div class="flex gap-4">
            <button type="submit" class="btn-primary">{{ $editing ? 'Update brand' : 'Create brand' }}</button>
            <a href="{{ route('admin.brands.index') }}" class="btn-outline">Cancel</a>
        </div>
    </form>
@endsection
