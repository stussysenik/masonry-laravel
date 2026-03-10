<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'brand' => ['nullable', 'string'],
            'model' => ['nullable', 'string'],
        ]);

        $vehicles = Vehicle::query()
            ->published()
            ->with('brand:id,name,slug')
            ->when($filters['brand'] ?? null, function ($query, string $brand): void {
                $query->whereHas('brand', fn ($brandQuery) => $brandQuery->where('slug', $brand));
            })
            ->when($filters['model'] ?? null, function ($query, string $model): void {
                $query->where('slug', $model);
            })
            ->orderByDesc('is_featured')
            ->orderByDesc('launched_at')
            ->get();

        return Inertia::render('Models/Index', [
            'filters' => $filters,
            'brands' => Brand::query()->active()->orderBy('sort_order')->get(['id', 'name', 'slug']),
            'vehicleOptions' => Vehicle::query()
                ->published()
                ->with('brand:id,name,slug')
                ->orderBy('name')
                ->get(['id', 'brand_id', 'name', 'slug']),
            'vehicles' => $vehicles,
        ]);
    }

    public function show(Vehicle $vehicle): Response
    {
        abort_unless($vehicle->status === 'published', 404);

        $vehicle->load('brand:id,name,slug');

        return Inertia::render('Models/Show', [
            'vehicle' => $vehicle,
            'relatedVehicles' => Vehicle::query()
                ->published()
                ->with('brand:id,name,slug')
                ->whereKeyNot($vehicle->getKey())
                ->when($vehicle->brand_id, fn ($query) => $query->where('brand_id', $vehicle->brand_id))
                ->orderByDesc('launched_at')
                ->limit(3)
                ->get(),
        ]);
    }
}
