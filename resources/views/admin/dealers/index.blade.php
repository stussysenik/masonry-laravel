@extends('admin.layout')

@section('title', 'Dealers')
@section('eyebrow', 'Network')
@section('heading', 'Dealers')

@section('content')
    <div class="flex justify-end">
        <a href="{{ route('admin.dealers.create') }}" class="btn-primary">Add dealer</a>
    </div>

    <div class="admin-card overflow-x-auto">
        <table class="min-w-full text-left text-sm text-white/70">
            <thead class="border-b border-white/10 text-[10px] uppercase tracking-[0.28em] text-white/40">
                <tr>
                    <th class="pb-3 pr-4">Dealer</th>
                    <th class="pb-3 pr-4">City</th>
                    <th class="pb-3 pr-4">Country</th>
                    <th class="pb-3 pr-4">Status</th>
                    <th class="pb-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
                @foreach ($dealers as $dealer)
                    <tr>
                        <td class="py-4 pr-4">{{ $dealer->name }}</td>
                        <td class="py-4 pr-4">{{ $dealer->city }}</td>
                        <td class="py-4 pr-4">{{ $dealer->country }}</td>
                        <td class="py-4 pr-4">{{ $dealer->is_active ? 'Active' : 'Hidden' }}</td>
                        <td class="py-4">
                            <div class="flex justify-end gap-4">
                                <a href="{{ route('admin.dealers.edit', $dealer) }}" class="hover:text-white">Edit</a>
                                <form action="{{ route('admin.dealers.destroy', $dealer) }}" method="post">
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
