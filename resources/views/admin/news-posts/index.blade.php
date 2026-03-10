@extends('admin.layout')

@section('title', 'News Posts')
@section('eyebrow', 'Editorial')
@section('heading', 'News Posts')

@section('content')
    <div class="flex justify-end">
        <a href="{{ route('admin.news-posts.create') }}" class="btn-primary">Add news post</a>
    </div>

    <div class="admin-card overflow-x-auto">
        <table class="min-w-full text-left text-sm text-white/70">
            <thead class="border-b border-white/10 text-[10px] uppercase tracking-[0.28em] text-white/40">
                <tr>
                    <th class="pb-3 pr-4">Title</th>
                    <th class="pb-3 pr-4">Status</th>
                    <th class="pb-3 pr-4">Published</th>
                    <th class="pb-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
                @foreach ($newsPosts as $newsPost)
                    <tr>
                        <td class="py-4 pr-4">{{ $newsPost->title }}</td>
                        <td class="py-4 pr-4 capitalize">{{ $newsPost->status }}</td>
                        <td class="py-4 pr-4">{{ optional($newsPost->published_at)->format('M d, Y') ?: '—' }}</td>
                        <td class="py-4">
                            <div class="flex justify-end gap-4">
                                <a href="{{ route('admin.news-posts.edit', $newsPost) }}" class="hover:text-white">Edit</a>
                                <form action="{{ route('admin.news-posts.destroy', $newsPost) }}" method="post">
                                    @csrf
                                    @method('delete')
                                    <button type="submit" class="text-rose-300 hover:text-rose-200">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
