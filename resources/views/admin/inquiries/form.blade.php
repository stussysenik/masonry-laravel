@extends('admin.layout')

@section('title', 'Review Inquiry')
@section('eyebrow', 'CRM')
@section('heading', 'Review Inquiry')

@section('content')
    <div class="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div class="admin-card space-y-5">
            <div>
                <div class="eyebrow">Inquiry</div>
                <h2 class="mt-3 text-2xl font-light tracking-[0.12em]">{{ $inquiry->name }}</h2>
            </div>
            <div class="space-y-3 text-sm text-white/70">
                <p><span class="text-white/40">Type:</span> {{ ucfirst($inquiry->type) }}</p>
                <p><span class="text-white/40">Email:</span> {{ $inquiry->email }}</p>
                <p><span class="text-white/40">Phone:</span> {{ $inquiry->phone ?: 'Not provided' }}</p>
                <p><span class="text-white/40">Vehicle:</span> {{ $inquiry->vehicle?->name ?: 'Not selected' }}</p>
                <p><span class="text-white/40">Dealer:</span> {{ $inquiry->dealer?->name ?: 'Not selected' }}</p>
                <p><span class="text-white/40">Received:</span> {{ $inquiry->created_at->format('M d, Y H:i') }}</p>
            </div>
        </div>

        <div class="admin-card space-y-6">
            <div>
                <div class="eyebrow">Message</div>
                <div class="mt-4 whitespace-pre-wrap text-sm leading-8 text-white/75">{{ $inquiry->message }}</div>
            </div>

            <form action="{{ route('admin.inquiries.update', $inquiry) }}" method="post" class="space-y-5">
                @csrf
                @method('put')
                <label class="block">
                    <span class="admin-label">Status</span>
                    <select name="status" class="admin-input">
                        <option value="new" @selected(old('status', $inquiry->status) === 'new')>New</option>
                        <option value="in_progress" @selected(old('status', $inquiry->status) === 'in_progress')>In progress</option>
                        <option value="closed" @selected(old('status', $inquiry->status) === 'closed')>Closed</option>
                    </select>
                </label>
                <button type="submit" class="btn-primary">Update status</button>
            </form>
        </div>
    </div>
@endsection
