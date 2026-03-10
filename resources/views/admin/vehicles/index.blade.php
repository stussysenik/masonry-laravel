@extends('admin.layout')

@section('title', 'Vehicles')
@section('eyebrow', 'Catalog')
@section('heading', 'Vehicles')

@section('content')
    <div class="flex justify-end">
        <a href="{{ route('admin.vehicles.create') }}" class="btn-primary">Add vehicle</a>
    </div>

    <div class="admin-card overflow-x-auto">
        <table class="min-w-full text-left text-sm text-white/70">
            <thead class="border-b border-white/10 text-[10px] uppercase tracking-[0.28em] text-white/40">
                <tr>
                    <th class="pb-3 pr-4">Vehicle</th>
                    <th class="pb-3 pr-4">Brand</th>
                    <th class="pb-3 pr-4">Status</th>
                    <th class="pb-3 pr-4">Featured</th>
                    <th class="pb-3 pr-4">Launched</th>
                    <th class="pb-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
                @foreach ($vehicles as $vehicle)
                    <tr>
                        <td class="py-4 pr-4">{{ $vehicle->name }}</td>
                        <td class="py-4 pr-4">{{ $vehicle->brand?->name ?: '—' }}</td>
                        <td class="py-4 pr-4 capitalize">{{ $vehicle->status }}</td>
                        <td class="py-4 pr-4">{{ $vehicle->is_featured ? 'Yes' : 'No' }}</td>
                        <td class="py-4 pr-4">{{ optional($vehicle->launched_at)->format('M d, Y') ?: '—' }}</td>
                        <td class="py-4">
                            <div class="flex justify-end gap-4">
                                <a href="{{ route('admin.vehicles.edit', $vehicle) }}" class="hover:text-white">Edit</a>
                                <form action="{{ route('admin.vehicles.destroy', $vehicle) }}" method="post">
                                    @csrf
                                    @method('delete')
                                    <button type="submit" class="text-rose-300 hover:text-rose-200">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
