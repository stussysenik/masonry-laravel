<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_routes_require_authentication(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/admin/login');
    }

    public function test_seeded_admin_can_log_in_and_access_dashboard(): void
    {
        $this->seed(DatabaseSeeder::class);

        $response = $this->post('/admin/login', [
            'email' => 'admin@mansory.test',
            'password' => 'password',
        ]);

        $response->assertRedirect(route('admin.dashboard'));
        $this->followRedirects($response)->assertOk()->assertSee('Content Dashboard');
    }

    public function test_non_admin_user_is_rejected_from_admin_panel(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::query()->where('is_admin', false)->firstOrFail();

        $response = $this->actingAs($user)->get('/admin');

        $response->assertRedirect('/admin/login');
    }
}
