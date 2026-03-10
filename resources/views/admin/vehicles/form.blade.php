@extends('admin.layout')

@php($editing = $vehicle->exists)

@section('title', $editing ? 'Edit Vehicle' : 'Create Vehicle')
@section('eyebrow', 'Catalog')
@section('heading', $editing ? 'Edit Vehicle' : 'Create Vehicle')

@section('content')
    <form action="{{ $editing ? route('admin.vehicles.update', $vehicle) : route('admin.vehicles.store') }}" method="post" enctype="multipart/form-data" class="admin-card max-w-4xl space-y-6">
        @csrf
        @if ($editing)
            @method('put')
        @endif

        <div class="form-grid">
            <label class="block">
                <span class="admin-label">Name</span>
                <input type="text" name="name" value="{{ old('name', $vehicle->name) }}" class="admin-input" required>
            </label>
            <label class="block">
                <span class="admin-label">Subtitle</span>
                <input type="text" name="subtitle" value="{{ old('subtitle', $vehicle->subtitle) }}" class="admin-input">
            </label>
            <label class="block">
                <span class="admin-label">Brand</span>
                <select name="brand_id" class="admin-input">
                    <option value="">Atelier / Unassigned</option>
                    @foreach ($brands as $brand)
                        <option value="{{ $brand->id }}" @selected((string) old('brand_id', $vehicle->brand_id) === (string) $brand->id)>
                            {{ $brand->name }}
                        </option>
                    @endforeach
                </select>
            </label>
            <label class="block">
                <span class="admin-label">Status</span>
                <select name="status" class="admin-input">
                    <option value="draft" @selected(old('status', $vehicle->status) === 'draft')>Draft</option>
                    <option value="published" @selected(old('status', $vehicle->status) === 'published')>Published</option>
                </select>
            </label>
            <label class="block">
                <span class="admin-label">Sort order</span>
                <input type="number" min="0" name="sort_order" value="{{ old('sort_order', $vehicle->sort_order) }}" class="admin-input" required>
            </label>
            <label class="block">
                <span class="admin-label">Launch date</span>
                <input type="date" name="launched_at" value="{{ old('launched_at', optional($vehicle->launched_at)->format('Y-m-d')) }}" class="admin-input">
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Teaser</span>
                <textarea name="teaser" rows="4" class="admin-input">{{ old('teaser', $vehicle->teaser) }}</textarea>
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Description</span>
                <textarea name="description" rows="8" class="admin-input" required>{{ old('description', $vehicle->description) }}</textarea>
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Image</span>
                <input type="file" name="image" class="admin-input">
                @if ($vehicle->image_url)
                    <img src="{{ $vehicle->image_url }}" alt="{{ $vehicle->name }}" class="mt-4 h-40 w-full object-cover">
                @endif
            </label>
        </div>

        <div class="flex flex-wrap gap-6 text-sm text-white/70">
            <label class="flex items-center gap-3">
                <input type="checkbox" name="is_featured" value="1" class="admin-checkbox" @checked(old('is_featured', $vehicle->is_featured))>
                Featured on the homepage
            </label>
            <label class="flex items-center gap-3">
                <input type="checkbox" name="is_latest" value="1" class="admin-checkbox" @checked(old('is_latest', $vehicle->is_latest))>
                Mark as latest addition
            </label>
        </div>

        <div class="flex gap-4">
            <button type="submit" class="btn-primary">{{ $editing ? 'Update vehicle' : 'Create vehicle' }}</button>
            <a href="{{ route('admin.vehicles.index') }}" class="btn-outline">Cancel</a>
        </div>
    </form>
@endsection
