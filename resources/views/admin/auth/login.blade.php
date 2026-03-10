<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Admin Login · {{ config('app.name') }}</title>
        @vite(['resources/css/app.css'])
    </head>
    <body class="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <form method="post" action="{{ route('admin.login.store') }}" class="w-full max-w-md border border-white/10 bg-white/[0.04] p-8">
            @csrf
            <div class="eyebrow">Protected access</div>
            <h1 class="mt-4 text-4xl font-light tracking-[0.16em]">Admin Login</h1>
            <p class="mt-4 text-sm leading-7 text-white/60">Use the seeded admin account to manage homepage content, catalog entries, and inquiries.</p>

            @if ($errors->any())
                <div class="mt-6 border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                    {{ $errors->first() }}
                </div>
            @endif

            <div class="mt-8 space-y-6">
                <label class="block">
                    <span class="admin-label">Email</span>
                    <input type="email" name="email" value="{{ old('email') }}" class="admin-input" required>
                </label>
                <label class="block">
                    <span class="admin-label">Password</span>
                    <input type="password" name="password" class="admin-input" required>
                </label>
                <label class="flex items-center gap-3 text-sm text-white/60">
                    <input type="checkbox" name="remember" value="1" class="admin-checkbox">
                    Remember this session
                </label>
            </div>

            <div class="mt-8">
                <button type="submit" class="btn-primary !w-full">Login</button>
            </div>

            <div class="mt-6 text-xs uppercase tracking-[0.18em] text-white/35">
                Seeded admin: admin@mansory.test / password
            </div>
        </form>
    </body>
</html>
