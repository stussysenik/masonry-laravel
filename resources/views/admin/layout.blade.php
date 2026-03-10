<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>@yield('title', 'Admin') · {{ config('app.name') }}</title>
        @vite(['resources/css/app.css'])
    </head>
    <body class="min-h-screen bg-neutral-950 text-white">
        <div class="grid min-h-screen lg:grid-cols-[260px,1fr]">
            <aside class="border-b border-white/10 bg-black lg:border-b-0 lg:border-r">
                <div class="p-6">
                    <a href="{{ route('admin.dashboard') }}" class="mansory-logo inline-block text-sm">
                        {{ config('app.name') }}
                    </a>
                </div>
                <nav class="space-y-1 px-4 pb-6 text-sm text-white/70">
                    @php
                        $links = [
                            ['label' => 'Dashboard', 'route' => 'admin.dashboard'],
                            ['label' => 'Hero Slides', 'route' => 'admin.hero-slides.index'],
                            ['label' => 'Brands', 'route' => 'admin.brands.index'],
                            ['label' => 'Vehicles', 'route' => 'admin.vehicles.index'],
                            ['label' => 'News Posts', 'route' => 'admin.news-posts.index'],
                            ['label' => 'Dealers', 'route' => 'admin.dealers.index'],
                            ['label' => 'Inquiries', 'route' => 'admin.inquiries.index'],
                            ['label' => 'Settings', 'route' => 'admin.settings.edit'],
                        ];
                    @endphp

                    @foreach ($links as $link)
                        <a
                            href="{{ route($link['route']) }}"
                            class="block border border-transparent px-4 py-3 uppercase tracking-[0.22em] hover:border-white/10 hover:bg-white/5 {{ request()->routeIs($link['route']) ? 'border-white/10 bg-white/5 text-white' : '' }}"
                        >
                            {{ $link['label'] }}
                        </a>
                    @endforeach
                </nav>
            </aside>

            <div>
                <header class="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-10">
                    <div>
                        <div class="text-xs uppercase tracking-[0.28em] text-white/45">@yield('eyebrow', 'Admin')</div>
                        <h1 class="mt-2 text-2xl font-light tracking-[0.12em]">@yield('heading', 'Dashboard')</h1>
                    </div>
                    <form action="{{ route('admin.logout') }}" method="post">
                        @csrf
                        <button type="submit" class="btn-outline !px-4 !py-2">Logout</button>
                    </form>
                </header>

                <main class="space-y-6 px-6 py-8 md:px-10">
                    @if (session('success'))
                        <div class="border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if ($errors->any())
                        <div class="border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                            <ul class="space-y-1">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    @yield('content')
                </main>
            </div>
        </div>
    </body>
</html>
