<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\StoresUploadedImages;
use App\Http\Controllers\Controller;
use App\Models\Dealer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DealerController extends Controller
{
    use StoresUploadedImages;

    public function index(): View
    {
        return view('admin.dealers.index', [
            'dealers' => Dealer::query()->orderBy('country')->orderBy('city')->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.dealers.form', [
            'dealer' => new Dealer(['is_active' => true]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['image'] = $this->storeImage($request->file('image'), null, 'dealers');

        Dealer::query()->create($data);

        return redirect()->route('admin.dealers.index')->with('success', 'Dealer created.');
    }

    public function edit(Dealer $dealer): View
    {
        return view('admin.dealers.form', compact('dealer'));
    }

    public function update(Request $request, Dealer $dealer): RedirectResponse
    {
        $data = $this->validated($request);
        $data['image'] = $this->storeImage($request->file('image'), $dealer->image, 'dealers');

        $dealer->update($data);

        return redirect()->route('admin.dealers.index')->with('success', 'Dealer updated.');
    }

    public function destroy(Dealer $dealer): RedirectResponse
    {
        $this->deleteStoredImage($dealer->image);
        $dealer->delete();

        return redirect()->route('admin.dealers.index')->with('success', 'Dealer removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:1000'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['sometimes', 'boolean'],
        ]) + ['is_active' => $request->boolean('is_active')];
    }
}
