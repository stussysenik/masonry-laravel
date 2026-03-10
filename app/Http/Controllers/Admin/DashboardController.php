<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Dealer;
use App\Models\HeroSlide;
use App\Models\Inquiry;
use App\Models\NewsPost;
use App\Models\Vehicle;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        return view('admin.dashboard', [
            'stats' => [
                'brands' => Brand::count(),
                'vehicles' => Vehicle::count(),
                'newsPosts' => NewsPost::count(),
                'heroSlides' => HeroSlide::count(),
                'dealers' => Dealer::count(),
                'openInquiries' => Inquiry::query()->where('status', '!=', 'closed')->count(),
            ],
            'recentInquiries' => Inquiry::query()
                ->with(['vehicle', 'dealer'])
                ->latest()
                ->limit(6)
                ->get(),
        ]);
    }
}
