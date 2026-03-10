@extends('admin.layout')

@php($editing = $newsPost->exists)

@section('title', $editing ? 'Edit News Post' : 'Create News Post')
@section('eyebrow', 'Editorial')
@section('heading', $editing ? 'Edit News Post' : 'Create News Post')

@section('content')
    <form action="{{ $editing ? route('admin.news-posts.update', $newsPost) : route('admin.news-posts.store') }}" method="post" enctype="multipart/form-data" class="admin-card max-w-4xl space-y-6">
        @csrf
        @if ($editing)
            @method('put')
        @endif

        <label class="block">
            <span class="admin-label">Title</span>
            <input type="text" name="title" value="{{ old('title', $newsPost->title) }}" class="admin-input" required>
        </label>

        <label class="block">
            <span class="admin-label">Excerpt</span>
            <textarea name="excerpt" rows="4" class="admin-input">{{ old('excerpt', $newsPost->excerpt) }}</textarea>
        </label>

        <label class="block">
            <span class="admin-label">Body</span>
            <textarea name="body" rows="10" class="admin-input" required>{{ old('body', $newsPost->body) }}</textarea>
        </label>

        <div class="form-grid">
            <label class="block">
                <span class="admin-label">Status</span>
                <select name="status" class="admin-input">
                    <option value="draft" @selected(old('status', $newsPost->status) === 'draft')>Draft</option>
                    <option value="published" @selected(old('status', $newsPost->status) === 'published')>Published</option>
                </select>
            </label>
            <label class="block">
                <span class="admin-label">Published at</span>
                <input type="date" name="published_at" value="{{ old('published_at', optional($newsPost->published_at)->format('Y-m-d')) }}" class="admin-input">
            </label>
        </div>

        <label class="block">
            <span class="admin-label">Image</span>
            <input type="file" name="image" class="admin-input">
            @if ($newsPost->image_url)
                <img src="{{ $newsPost->image_url }}" alt="{{ $newsPost->title }}" class="mt-4 h-40 w-full object-cover">
            @endif
        </label>

        <div class="flex gap-4">
            <button type="submit" class="btn-primary">{{ $editing ? 'Update post' : 'Create post' }}</button>
            <a href="{{ route('admin.news-posts.index') }}" class="btn-outline">Cancel</a>
        </div>
    </form>
@endsection
