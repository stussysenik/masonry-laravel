<?php

namespace Tests\Feature;

use App\Models\NewsPost;
use App\Models\Vehicle;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicSiteTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_renders_seeded_content(): void
    {
        $this->seed(DatabaseSeeder::class);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('heroSlides', 4)
            ->has('latestVehicles')
            ->has('latestNews'));
    }

    public function test_models_filter_by_brand_and_specific_model(): void
    {
        $this->seed(DatabaseSeeder::class);

        $vehicle = Vehicle::query()->with('brand')->firstOrFail();

        $response = $this->get('/models?brand='.$vehicle->brand->slug.'&model='.$vehicle->slug);

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Models/Index')
            ->where('filters.brand', $vehicle->brand->slug)
            ->where('filters.model', $vehicle->slug)
            ->has('vehicles', 1)
            ->where('vehicles.0.slug', $vehicle->slug));
    }

    public function test_vehicle_and_news_detail_pages_load_for_published_records(): void
    {
        $this->seed(DatabaseSeeder::class);

        $vehicle = Vehicle::query()->firstOrFail();
        $newsPost = NewsPost::query()->firstOrFail();

        $this->get('/models/'.$vehicle->slug)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Models/Show')
                ->where('vehicle.slug', $vehicle->slug));

        $this->get('/news/'.$newsPost->slug)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('News/Show')
                ->where('newsPost.slug', $newsPost->slug));
    }

    public function test_unpublished_vehicle_returns_not_found(): void
    {
        $this->seed(DatabaseSeeder::class);

        $vehicle = Vehicle::query()->firstOrFail();
        $vehicle->update(['status' => 'draft']);

        $this->get('/models/'.$vehicle->slug)->assertNotFound();
    }
}
