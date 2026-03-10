@extends('admin.layout')

@section('title', 'Brands')
@section('eyebrow', 'Catalog')
@section('heading', 'Brands')

@section('content')
    <div class="flex justify-end">
        <a href="{{ route('admin.brands.create') }}" class="btn-primary">Add brand</a>
    </div>

    <div class="admin-card overflow-x-auto">
        <table class="min-w-full text-left text-sm text-white/70">
            <thead class="border-b border-white/10 text-[10px] uppercase tracking-[0.28em] text-white/40">
                <tr>
                    <th class="pb-3 pr-4">Name</th>
                    <th class="pb-3 pr-4">Slug</th>
                    <th class="pb-3 pr-4">Order</th>
                    <th class="pb-3 pr-4">Status</th>
                    <th class="pb-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
                @foreach ($brands as $brand)
                    <tr>
                        <td class="py-4 pr-4">{{ $brand->name }}</td>
                        <td class="py-4 pr-4">{{ $brand->slug }}</td>
                        <td class="py-4 pr-4">{{ $brand->sort_order }}</td>
                        <td class="py-4 pr-4">{{ $brand->is_active ? 'Active' : 'Hidden' }}</td>
                        <td class="py-4">
                            <div class="flex justify-end gap-4">
                                <a href="{{ route('admin.brands.edit', $brand) }}" class="hover:text-white">Edit</a>
                                <form action="{{ route('admin.brands.destroy', $brand) }}" method="post">
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
