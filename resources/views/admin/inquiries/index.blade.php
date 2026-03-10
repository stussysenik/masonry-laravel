@extends('admin.layout')

@section('title', 'Inquiries')
@section('eyebrow', 'CRM')
@section('heading', 'Inquiries')

@section('content')
    <div class="admin-card overflow-x-auto">
        <table class="min-w-full text-left text-sm text-white/70">
            <thead class="border-b border-white/10 text-[10px] uppercase tracking-[0.28em] text-white/40">
                <tr>
                    <th class="pb-3 pr-4">Name</th>
                    <th class="pb-3 pr-4">Type</th>
                    <th class="pb-3 pr-4">Email</th>
                    <th class="pb-3 pr-4">Vehicle</th>
                    <th class="pb-3 pr-4">Dealer</th>
                    <th class="pb-3 pr-4">Status</th>
                    <th class="pb-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
                @forelse ($inquiries as $inquiry)
                    <tr>
                        <td class="py-4 pr-4">{{ $inquiry->name }}</td>
                        <td class="py-4 pr-4 capitalize">{{ $inquiry->type }}</td>
                        <td class="py-4 pr-4">{{ $inquiry->email }}</td>
                        <td class="py-4 pr-4">{{ $inquiry->vehicle?->name ?: '—' }}</td>
                        <td class="py-4 pr-4">{{ $inquiry->dealer?->name ?: '—' }}</td>
                        <td class="py-4 pr-4 capitalize">{{ str_replace('_', ' ', $inquiry->status) }}</td>
                        <td class="py-4">
                            <div class="flex justify-end gap-4">
                                <a href="{{ route('admin.inquiries.edit', $inquiry) }}" class="hover:text-white">Review</a>
                                <form action="{{ route('admin.inquiries.destroy', $inquiry) }}" method="post">
                                    @csrf
                                    @method('delete')
                                    <button type="submit" class="text-rose-300 hover:text-rose-200">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="py-6 text-center text-white/45">No inquiries found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
