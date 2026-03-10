<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\HeroSlide;
use App\Models\NewsPost;
use App\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Home', [
            'heroSlides' => HeroSlide::query()
                ->active()
                ->orderBy('sort_order')
                ->get(),
            'brands' => Brand::query()
                ->active()
                ->orderBy('sort_order')
                ->get(['id', 'name', 'slug']),
            'vehicleOptions' => Vehicle::query()
                ->published()
                ->with('brand:id,name,slug')
                ->orderByDesc('launched_at')
                ->get(),
            'latestVehicles' => Vehicle::query()
                ->published()
                ->with('brand:id,name,slug')
                ->orderByDesc('is_latest')
                ->orderByDesc('launched_at')
                ->limit(6)
                ->get(),
            'featuredVehicles' => Vehicle::query()
                ->published()
                ->with('brand:id,name,slug')
                ->where('is_featured', true)
                ->orderBy('sort_order')
                ->limit(4)
                ->get(),
            'latestNews' => NewsPost::query()
                ->published()
                ->orderByDesc('published_at')
                ->limit(3)
                ->get(),
        ]);
    }
}
