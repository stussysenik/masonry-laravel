<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\BuildsSlug;
use App\Http\Controllers\Concerns\StoresUploadedImages;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class VehicleController extends Controller
{
    use BuildsSlug;
    use StoresUploadedImages;

    public function index(): View
    {
        return view('admin.vehicles.index', [
            'vehicles' => Vehicle::query()
                ->with('brand')
                ->latest('launched_at')
                ->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.vehicles.form', [
            'vehicle' => new Vehicle([
                'status' => 'draft',
                'is_featured' => false,
                'is_latest' => true,
                'sort_order' => Vehicle::max('sort_order') + 1,
            ]),
            'brands' => Brand::query()->active()->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->buildUniqueSlug($data['name'], Vehicle::class);
        $data['image'] = $this->storeImage($request->file('image'), null, 'vehicles');

        Vehicle::query()->create($data);

        return redirect()->route('admin.vehicles.index')->with('success', 'Vehicle created.');
    }

    public function edit(Vehicle $vehicle): View
    {
        return view('admin.vehicles.form', [
            'vehicle' => $vehicle,
            'brands' => Brand::query()->active()->orderBy('sort_order')->get(),
        ]);
    }

    public function update(Request $request, Vehicle $vehicle): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->buildUniqueSlug($data['name'], Vehicle::class, $vehicle);
        $data['image'] = $this->storeImage($request->file('image'), $vehicle->image, 'vehicles');

        $vehicle->update($data);

        return redirect()->route('admin.vehicles.index')->with('success', 'Vehicle updated.');
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $this->deleteStoredImage($vehicle->image);
        $vehicle->delete();

        return redirect()->route('admin.vehicles.index')->with('success', 'Vehicle removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'brand_id' => ['nullable', 'exists:brands,id'],
            'name' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'teaser' => ['nullable', 'string', 'max:500'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'status' => ['required', 'in:draft,published'],
            'is_featured' => ['sometimes', 'boolean'],
            'is_latest' => ['sometimes', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'launched_at' => ['nullable', 'date'],
        ]) + [
            'is_featured' => $request->boolean('is_featured'),
            'is_latest' => $request->boolean('is_latest'),
        ];
    }
}
