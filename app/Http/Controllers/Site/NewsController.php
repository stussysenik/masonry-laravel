<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\NewsPost;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('News/Index', [
            'newsPosts' => NewsPost::query()
                ->published()
                ->orderByDesc('published_at')
                ->get(),
        ]);
    }

    public function show(NewsPost $newsPost): Response
    {
        abort_unless($newsPost->status === 'published', 404);

        return Inertia::render('News/Show', [
            'newsPost' => $newsPost,
            'relatedPosts' => NewsPost::query()
                ->published()
                ->whereKeyNot($newsPost->getKey())
                ->orderByDesc('published_at')
                ->limit(3)
                ->get(),
        ]);
    }
}
