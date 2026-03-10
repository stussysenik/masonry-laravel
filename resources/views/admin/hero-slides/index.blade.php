@extends('admin.layout')

@section('title', 'Hero Slides')
@section('eyebrow', 'Homepage')
@section('heading', 'Hero Slides')

@section('content')
    <div class="flex justify-end">
        <a href="{{ route('admin.hero-slides.create') }}" class="btn-primary">Add slide</a>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
        @foreach ($heroSlides as $heroSlide)
            <div class="admin-card">
                @if ($heroSlide->image_url)
                    <img src="{{ $heroSlide->image_url }}" alt="{{ $heroSlide->title }}" class="mb-5 h-52 w-full object-cover">
                @endif
                <div class="eyebrow">Order {{ $heroSlide->sort_order }}</div>
                <h2 class="mt-3 text-2xl font-light tracking-[0.12em]">{{ $heroSlide->title }}</h2>
                <p class="mt-2 text-sm uppercase tracking-[0.28em] text-white/50">{{ $heroSlide->subtitle }}</p>
                <div class="mt-6 flex justify-between gap-4 text-sm">
                    <a href="{{ route('admin.hero-slides.edit', $heroSlide) }}" class="hover:text-white">Edit</a>
                    <form action="{{ route('admin.hero-slides.destroy', $heroSlide) }}" method="post">
                        @csrf
                        @method('delete')
                        <button type="submit" class="text-rose-300 hover:text-rose-200">Delete</button>
                    </form>
                </div>
            </div>
        @endforeach
    </div>
@endsection
