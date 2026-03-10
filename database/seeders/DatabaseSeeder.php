<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Dealer;
use App\Models\HeroSlide;
use App\Models\NewsPost;
use App\Models\SiteSetting;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->updateOrCreate(
            ['email' => 'admin@mansory.test'],
            [
                'name' => 'MANSORY Admin',
                'password' => 'password',
                'is_admin' => true,
            ]
        );

        User::query()->updateOrCreate([
            'email' => 'guest@mansory.test',
        ], [
            'name' => 'Guest User',
            'password' => 'password',
            'is_admin' => false,
        ]);

        SiteSetting::query()->updateOrCreate(
            ['id' => 1],
            [
                'site_name' => 'MANSORY',
                'company_blurb' => 'MANSORY crafts one-of-one automotive statements with bespoke design, carbon bodywork, and tailored luxury finishes.',
                'mission_statement' => 'Our mission goes beyond tuning. We create unique masterpieces that defy convention.',
                'contact_email' => 'atelier@mansory.test',
                'contact_phone' => '+41 44 555 0101',
                'contact_address' => 'MANSORY Atelier, Brandstrasse 7, 8152 Zurich, Switzerland',
                'instagram_url' => 'https://www.instagram.com/mansory/',
                'facebook_url' => 'https://www.facebook.com/mansory/',
                'youtube_url' => 'https://www.youtube.com/@mansory',
                'twitter_url' => 'https://x.com/mansory',
                'footer_copyright' => 'MANSORY. All rights reserved.',
            ]
        );

        $brands = collect([
            ['name' => 'Lamborghini', 'teaser' => 'Radical silhouettes built for the bold.'],
            ['name' => 'Ferrari', 'teaser' => 'Italian drama with a carbon couture finish.'],
            ['name' => 'Rolls-Royce', 'teaser' => 'Hand-built luxury with commanding presence.'],
            ['name' => 'Bentley', 'teaser' => 'Grand touring elevated with bespoke detail.'],
            ['name' => 'Mercedes', 'teaser' => 'Performance saloons and SUVs with custom authority.'],
            ['name' => 'BMW', 'teaser' => 'Precision platforms tailored for a sharper identity.'],
        ])->map(function (array $brand, int $index) {
            return Brand::query()->updateOrCreate(
                ['slug' => Str::slug($brand['name'])],
                [
                    'name' => $brand['name'],
                    'teaser' => $brand['teaser'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        })->keyBy('slug');

        collect([
            [
                'title' => 'KOENIGSEGG JESKO',
                'subtitle' => 'BY MANSORY',
                'image' => 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=1920&q=80',
                'cta_label' => 'Discover now',
                'cta_url' => '/models',
                'sort_order' => 1,
            ],
            [
                'title' => 'THE PIRELLI 42',
                'subtitle' => 'MANSORY',
                'image' => 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1920&q=80',
                'cta_label' => 'Explore the fleet',
                'cta_url' => '/models',
                'sort_order' => 2,
            ],
            [
                'title' => 'MANSORY CULLINAN',
                'subtitle' => 'BLACK BADGE',
                'image' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&q=80',
                'cta_label' => 'View models',
                'cta_url' => '/models',
                'sort_order' => 3,
            ],
            [
                'title' => 'MANSORY REVUELTO',
                'subtitle' => 'TORNADO',
                'image' => 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80',
                'cta_label' => 'Enter atelier',
                'cta_url' => '/contact',
                'sort_order' => 4,
            ],
        ])->each(function (array $slide): void {
            HeroSlide::query()->updateOrCreate(
                ['sort_order' => $slide['sort_order']],
                $slide + ['is_active' => true]
            );
        });

        $vehicles = [
            [
                'brand' => 'lamborghini',
                'name' => 'Venatus SE',
                'subtitle' => 'Wide Body Kit',
                'teaser' => 'A sharpened super-SUV with exposed carbon and a dramatic new stance.',
                'description' => 'Venatus SE is a bold reinterpretation of the Urus platform, pairing intricate exterior surfacing with a cabin finished to atelier specification. It is built to feel tailored rather than merely upgraded.',
                'image' => 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800&q=80',
                'is_featured' => true,
                'is_latest' => true,
                'launched_at' => now()->subDays(18),
            ],
            [
                'brand' => 'ferrari',
                'name' => 'Purosangue',
                'subtitle' => 'Soft Kit',
                'teaser' => 'Ferrari grand touring with sculpted carbon restraint.',
                'description' => 'Purosangue receives a tailored exterior package, bespoke trim selections, and a more assertive silhouette while preserving the unmistakable Ferrari proportion.',
                'image' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
                'is_featured' => true,
                'is_latest' => true,
                'launched_at' => now()->subDays(11),
            ],
            [
                'brand' => 'rolls-royce',
                'name' => 'Initiate',
                'subtitle' => 'One of One',
                'teaser' => 'Commissioned luxury shaped into a singular identity.',
                'description' => 'Initiate is a one-off atelier project built around personal storytelling, rare materials, and a completely bespoke finish package intended for an individual collector.',
                'image' => 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
                'is_featured' => true,
                'is_latest' => true,
                'launched_at' => now()->subDays(7),
            ],
            [
                'brand' => 'mercedes',
                'name' => 'M5 Blackline',
                'subtitle' => 'Atelier Edition',
                'teaser' => 'Darkened performance saloon refinement with custom interior work.',
                'description' => 'M5 Blackline balances everyday usability with bespoke exterior detailing and a cockpit tailored around contrast stitching, carbon accents, and handmade surfaces.',
                'image' => 'https://images.unsplash.com/photo-1555215695-3004980adade?w=800&q=80',
                'is_featured' => false,
                'is_latest' => true,
                'launched_at' => now()->subDays(4),
            ],
            [
                'brand' => 'bentley',
                'name' => 'Equestre',
                'subtitle' => 'Coachbuilt Luxury',
                'teaser' => 'A grand touring statement with contemporary hand-built detailing.',
                'description' => 'Equestre pushes Bentley craftsmanship through a more expressive lens, blending architectural lines, high-gloss carbon, and a cabin dressed for long-distance theatre.',
                'image' => 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
                'is_featured' => false,
                'is_latest' => true,
                'launched_at' => now()->subDay(),
            ],
        ];

        foreach ($vehicles as $index => $vehicleData) {
            $brand = $brands->get($vehicleData['brand']);

            Vehicle::query()->updateOrCreate(
                ['slug' => Str::slug($vehicleData['name'])],
                [
                    'brand_id' => $brand?->id,
                    'name' => $vehicleData['name'],
                    'subtitle' => $vehicleData['subtitle'],
                    'teaser' => $vehicleData['teaser'],
                    'description' => $vehicleData['description'],
                    'image' => $vehicleData['image'],
                    'status' => 'published',
                    'is_featured' => $vehicleData['is_featured'],
                    'is_latest' => $vehicleData['is_latest'],
                    'sort_order' => $index + 1,
                    'launched_at' => $vehicleData['launched_at'],
                ]
            );
        }

        collect([
            [
                'title' => 'MANSORY CARBONADO X',
                'excerpt' => 'A new carbon intensive statement piece arrives in the atelier.',
                'body' => 'Carbonado X explores the far end of the atelier spectrum with exposed weave, sculpted aero, and a monochrome cabin designed around contrast and drama.',
                'image' => 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
                'published_at' => now()->subDays(9),
            ],
            [
                'title' => 'The Ferrari Purosangue Soft Kit',
                'excerpt' => 'A softer exterior package that still carries unmistakable presence.',
                'body' => 'The Purosangue soft kit focuses on proportion and materiality, delivering an elegant yet assertive profile for clients who want a less theatrical, more sculpted statement.',
                'image' => 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
                'published_at' => now()->subDays(6),
            ],
            [
                'title' => 'Atelier commissions now open for summer builds',
                'excerpt' => 'A limited number of client slots are now available for Q3 atelier production.',
                'body' => 'Summer atelier commissioning is now open for select build slots across bespoke exterior packages, interior retrims, and fully specified one-off programs.',
                'image' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
                'published_at' => now()->subDays(2),
            ],
        ])->each(function (array $newsItem): void {
            NewsPost::query()->updateOrCreate(
                ['slug' => Str::slug($newsItem['title'])],
                $newsItem + ['status' => 'published']
            );
        });

        collect([
            [
                'name' => 'MANSORY Zurich',
                'city' => 'Zurich',
                'country' => 'Switzerland',
                'address' => 'Brandstrasse 7, 8152 Zurich',
                'phone' => '+41 44 555 0101',
                'email' => 'zurich@mansory.test',
                'image' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
            ],
            [
                'name' => 'MANSORY Dubai',
                'city' => 'Dubai',
                'country' => 'UAE',
                'address' => 'Sheikh Zayed Road, Dubai',
                'phone' => '+971 4 555 0102',
                'email' => 'dubai@mansory.test',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
            ],
            [
                'name' => 'MANSORY Miami',
                'city' => 'Miami',
                'country' => 'USA',
                'address' => 'Design District, Miami, FL',
                'phone' => '+1 305 555 0199',
                'email' => 'miami@mansory.test',
                'image' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
            ],
        ])->each(function (array $dealer): void {
            Dealer::query()->updateOrCreate(
                ['email' => $dealer['email']],
                $dealer + ['is_active' => true]
            );
        });
    }
}
