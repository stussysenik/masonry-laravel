<?php

namespace Tests\Feature;

use App\Mail\InquirySubmitted;
use App\Models\Dealer;
use App\Models\Inquiry;
use App\Models\Vehicle;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class InquiryFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_inquiry_is_stored_and_emailed(): void
    {
        Mail::fake();
        $this->seed(DatabaseSeeder::class);

        $vehicle = Vehicle::query()->firstOrFail();
        $dealer = Dealer::query()->firstOrFail();

        $response = $this->post('/inquiries/contact', [
            'name' => 'Avery Stone',
            'email' => 'avery@example.com',
            'phone' => '+1 555 100 200',
            'message' => 'Interested in a bespoke build consultation.',
            'vehicle_id' => $vehicle->id,
            'dealer_id' => $dealer->id,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('inquiries', [
            'type' => 'contact',
            'email' => 'avery@example.com',
            'vehicle_id' => $vehicle->id,
            'dealer_id' => $dealer->id,
            'status' => 'new',
        ]);
        Mail::assertSent(InquirySubmitted::class);
    }

    public function test_dealer_inquiry_requires_message(): void
    {
        $this->seed(DatabaseSeeder::class);

        $dealer = Dealer::query()->firstOrFail();

        $response = $this->from('/dealers')->post('/inquiries/dealer', [
            'name' => 'Jordan Vale',
            'email' => 'jordan@example.com',
            'phone' => '',
            'message' => '',
            'dealer_id' => $dealer->id,
        ]);

        $response->assertRedirect('/dealers');
        $response->assertSessionHasErrors('message');
        $this->assertDatabaseCount('inquiries', 0);
    }
}
