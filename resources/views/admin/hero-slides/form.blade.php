@extends('admin.layout')

@php($editing = $heroSlide->exists)

@section('title', $editing ? 'Edit Hero Slide' : 'Create Hero Slide')
@section('eyebrow', 'Homepage')
@section('heading', $editing ? 'Edit Hero Slide' : 'Create Hero Slide')

@section('content')
    <form action="{{ $editing ? route('admin.hero-slides.update', $heroSlide) : route('admin.hero-slides.store') }}" method="post" enctype="multipart/form-data" class="admin-card max-w-4xl space-y-6">
        @csrf
        @if ($editing)
            @method('put')
        @endif

        <div class="form-grid">
            <label class="block">
                <span class="admin-label">Title</span>
                <input type="text" name="title" value="{{ old('title', $heroSlide->title) }}" class="admin-input" required>
            </label>
            <label class="block">
                <span class="admin-label">Subtitle</span>
                <input type="text" name="subtitle" value="{{ old('subtitle', $heroSlide->subtitle) }}" class="admin-input">
            </label>
            <label class="block">
                <span class="admin-label">CTA label</span>
                <input type="text" name="cta_label" value="{{ old('cta_label', $heroSlide->cta_label) }}" class="admin-input">
            </label>
            <label class="block">
                <span class="admin-label">CTA URL</span>
                <input type="text" name="cta_url" value="{{ old('cta_url', $heroSlide->cta_url) }}" class="admin-input">
            </label>
            <label class="block">
                <span class="admin-label">Sort order</span>
                <input type="number" min="0" name="sort_order" value="{{ old('sort_order', $heroSlide->sort_order) }}" class="admin-input" required>
            </label>
            <label class="flex items-center gap-3 text-sm text-white/70">
                <input type="checkbox" name="is_active" value="1" class="admin-checkbox" @checked(old('is_active', $heroSlide->is_active))>
                Active on homepage
            </label>
        </div>

        <label class="block">
            <span class="admin-label">Image</span>
            <input type="file" name="image" class="admin-input">
            @if ($heroSlide->image_url)
                <img src="{{ $heroSlide->image_url }}" alt="{{ $heroSlide->title }}" class="mt-4 h-48 w-full object-cover">
            @endif
        </label>

        <div class="flex gap-4">
            <button type="submit" class="btn-primary">{{ $editing ? 'Update slide' : 'Create slide' }}</button>
            <a href="{{ route('admin.hero-slides.index') }}" class="btn-outline">Cancel</a>
        </div>
    </form>
@endsection
