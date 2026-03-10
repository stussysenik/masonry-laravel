<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class InquiryController extends Controller
{
    public function index(): View
    {
        return view('admin.inquiries.index', [
            'inquiries' => Inquiry::query()
                ->with(['vehicle.brand', 'dealer'])
                ->latest()
                ->get(),
        ]);
    }

    public function edit(Inquiry $inquiry): View
    {
        return view('admin.inquiries.form', [
            'inquiry' => $inquiry->load(['vehicle.brand', 'dealer']),
        ]);
    }

    public function update(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:new,in_progress,closed'],
        ]);

        $inquiry->update($data);

        return redirect()->route('admin.inquiries.index')->with('success', 'Inquiry status updated.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return redirect()->route('admin.inquiries.index')->with('success', 'Inquiry deleted.');
    }
}
