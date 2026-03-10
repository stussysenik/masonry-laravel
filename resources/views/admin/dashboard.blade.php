@extends('admin.layout')

@section('title', 'Dashboard')
@section('eyebrow', 'Overview')
@section('heading', 'Content Dashboard')

@section('content')
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div class="admin-card">
            <div class="eyebrow">Brands</div>
            <div class="mt-3 text-4xl font-light">{{ $stats['brands'] }}</div>
        </div>
        <div class="admin-card">
            <div class="eyebrow">Vehicles</div>
            <div class="mt-3 text-4xl font-light">{{ $stats['vehicles'] }}</div>
        </div>
        <div class="admin-card">
            <div class="eyebrow">News Posts</div>
            <div class="mt-3 text-4xl font-light">{{ $stats['newsPosts'] }}</div>
        </div>
        <div class="admin-card">
            <div class="eyebrow">Hero Slides</div>
            <div class="mt-3 text-4xl font-light">{{ $stats['heroSlides'] }}</div>
        </div>
        <div class="admin-card">
            <div class="eyebrow">Dealers</div>
            <div class="mt-3 text-4xl font-light">{{ $stats['dealers'] }}</div>
        </div>
        <div class="admin-card">
            <div class="eyebrow">Open Inquiries</div>
            <div class="mt-3 text-4xl font-light">{{ $stats['openInquiries'] }}</div>
        </div>
    </div>

    <div class="admin-card">
        <div class="mb-6 flex items-center justify-between">
            <div>
                <div class="eyebrow">Pipeline</div>
                <h2 class="mt-3 text-2xl font-light tracking-[0.12em]">Recent Inquiries</h2>
            </div>
            <a href="{{ route('admin.inquiries.index') }}" class="btn-outline !px-4 !py-2">View all</a>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm text-white/70">
                <thead class="border-b border-white/10 text-[10px] uppercase tracking-[0.28em] text-white/40">
                    <tr>
                        <th class="pb-3 pr-4">Name</th>
                        <th class="pb-3 pr-4">Type</th>
                        <th class="pb-3 pr-4">Vehicle</th>
                        <th class="pb-3 pr-4">Dealer</th>
                        <th class="pb-3 pr-4">Status</th>
                        <th class="pb-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/10">
                    @forelse ($recentInquiries as $inquiry)
                        <tr>
                            <td class="py-4 pr-4">{{ $inquiry->name }}</td>
                            <td class="py-4 pr-4 capitalize">{{ $inquiry->type }}</td>
                            <td class="py-4 pr-4">{{ $inquiry->vehicle?->name ?: '—' }}</td>
                            <td class="py-4 pr-4">{{ $inquiry->dealer?->name ?: '—' }}</td>
                            <td class="py-4 pr-4 capitalize">{{ str_replace('_', ' ', $inquiry->status) }}</td>
                            <td class="py-4 text-right">
                                <a href="{{ route('admin.inquiries.edit', $inquiry) }}" class="text-white hover:text-white/70">Review</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="py-6 text-center text-white/45">No inquiries yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
