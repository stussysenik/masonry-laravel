<?php

namespace App\Http\Middleware;

use App\Models\Brand;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'site' => fn () => $this->siteSettings(),
            'navigation' => fn () => $this->navigation(),
        ];
    }

    private function siteSettings(): array
    {
        try {
            if (! Schema::hasTable('site_settings')) {
                return $this->fallbackSiteSettings();
            }

            $settings = SiteSetting::query()->first();

            if (! $settings) {
                return $this->fallbackSiteSettings();
            }

            return [
                'site_name' => $settings->site_name,
                'company_blurb' => $settings->company_blurb,
                'mission_statement' => $settings->mission_statement,
                'contact_email' => $settings->contact_email,
                'contact_phone' => $settings->contact_phone,
                'contact_address' => $settings->contact_address,
                'instagram_url' => $settings->instagram_url,
                'facebook_url' => $settings->facebook_url,
                'youtube_url' => $settings->youtube_url,
                'twitter_url' => $settings->twitter_url,
                'footer_copyright' => $settings->footer_copyright,
            ];
        } catch (\Throwable) {
            return $this->fallbackSiteSettings();
        }
    }

    private function navigation(): array
    {
        try {
            if (! Schema::hasTable('brands')) {
                return ['brands' => []];
            }

            return [
                'brands' => Brand::query()
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->get(['id', 'name', 'slug']),
            ];
        } catch (\Throwable) {
            return ['brands' => []];
        }
    }

    private function fallbackSiteSettings(): array
    {
        return [
            'site_name' => 'MANSORY',
            'company_blurb' => 'Luxury automotive tailoring, limited commissions, and bespoke detailing.',
            'mission_statement' => 'Our mission goes beyond tuning. We create unique masterpieces that defy convention.',
            'contact_email' => 'atelier@mansory.test',
            'contact_phone' => '+41 44 555 0101',
            'contact_address' => 'MANSORY Atelier',
            'instagram_url' => null,
            'facebook_url' => null,
            'youtube_url' => null,
            'twitter_url' => null,
            'footer_copyright' => 'MANSORY. All rights reserved.',
        ];
    }
}
