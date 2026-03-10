<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Mail\InquirySubmitted;
use App\Models\Dealer;
use App\Models\Inquiry;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Contact', [
            'defaultVehicle' => $request->string('vehicle')->toString(),
            'vehicles' => Vehicle::query()
                ->published()
                ->with('brand:id,name,slug')
                ->orderBy('name')
                ->get(['id', 'brand_id', 'name', 'slug']),
            'dealers' => Dealer::query()
                ->active()
                ->orderBy('country')
                ->orderBy('city')
                ->get(['id', 'name', 'city', 'country']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:4000'],
            'vehicle_id' => ['nullable', 'exists:vehicles,id'],
            'dealer_id' => ['nullable', 'exists:dealers,id'],
        ]);

        $inquiry = Inquiry::query()->create($data + [
            'type' => 'contact',
            'status' => 'new',
        ]);

        Mail::to(env('ADMIN_EMAIL', config('mail.from.address')))
            ->send(new InquirySubmitted($inquiry->load(['vehicle.brand', 'dealer'])));

        return back()->with('success', 'Your inquiry has been received. Our atelier team will get back to you shortly.');
    }
}
