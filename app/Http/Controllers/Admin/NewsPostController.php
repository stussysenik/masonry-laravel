<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\BuildsSlug;
use App\Http\Controllers\Concerns\StoresUploadedImages;
use App\Http\Controllers\Controller;
use App\Models\NewsPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class NewsPostController extends Controller
{
    use BuildsSlug;
    use StoresUploadedImages;

    public function index(): View
    {
        return view('admin.news-posts.index', [
            'newsPosts' => NewsPost::query()->latest('published_at')->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.news-posts.form', [
            'newsPost' => new NewsPost([
                'status' => 'draft',
                'published_at' => now(),
            ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->buildUniqueSlug($data['title'], NewsPost::class);
        $data['image'] = $this->storeImage($request->file('image'), null, 'news-posts');

        NewsPost::query()->create($data);

        return redirect()->route('admin.news-posts.index')->with('success', 'News post created.');
    }

    public function edit(NewsPost $newsPost): View
    {
        return view('admin.news-posts.form', compact('newsPost'));
    }

    public function update(Request $request, NewsPost $newsPost): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->buildUniqueSlug($data['title'], NewsPost::class, $newsPost);
        $data['image'] = $this->storeImage($request->file('image'), $newsPost->image, 'news-posts');

        $newsPost->update($data);

        return redirect()->route('admin.news-posts.index')->with('success', 'News post updated.');
    }

    public function destroy(NewsPost $newsPost): RedirectResponse
    {
        $this->deleteStoredImage($newsPost->image);
        $newsPost->delete();

        return redirect()->route('admin.news-posts.index')->with('success', 'News post removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'status' => ['required', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
        ]);
    }
}
