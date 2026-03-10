@extends('admin.layout')

@section('title', 'Site Settings')
@section('eyebrow', 'Configuration')
@section('heading', 'Site Settings')

@section('content')
    <form action="{{ route('admin.settings.update') }}" method="post" class="admin-card max-w-5xl space-y-6">
        @csrf
        @method('put')

        <div class="form-grid">
            <label class="block">
                <span class="admin-label">Site name</span>
                <input type="text" name="site_name" value="{{ old('site_name', $settings->site_name) }}" class="admin-input" required>
            </label>
            <label class="block">
                <span class="admin-label">Contact email</span>
                <input type="email" name="contact_email" value="{{ old('contact_email', $settings->contact_email) }}" class="admin-input">
            </label>
            <label class="block">
                <span class="admin-label">Contact phone</span>
                <input type="text" name="contact_phone" value="{{ old('contact_phone', $settings->contact_phone) }}" class="admin-input">
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Contact address</span>
                <textarea name="contact_address" rows="4" class="admin-input">{{ old('contact_address', $settings->contact_address) }}</textarea>
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Company blurb</span>
                <textarea name="company_blurb" rows="4" class="admin-input">{{ old('company_blurb', $settings->company_blurb) }}</textarea>
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Mission statement</span>
                <textarea name="mission_statement" rows="4" class="admin-input">{{ old('mission_statement', $settings->mission_statement) }}</textarea>
            </label>
            <label class="block">
                <span class="admin-label">Instagram URL</span>
                <input type="url" name="instagram_url" value="{{ old('instagram_url', $settings->instagram_url) }}" class="admin-input">
            </label>
            <label class="block">
                <span class="admin-label">Facebook URL</span>
                <input type="url" name="facebook_url" value="{{ old('facebook_url', $settings->facebook_url) }}" class="admin-input">
            </label>
            <label class="block">
                <span class="admin-label">YouTube URL</span>
                <input type="url" name="youtube_url" value="{{ old('youtube_url', $settings->youtube_url) }}" class="admin-input">
            </label>
            <label class="block">
                <span class="admin-label">X URL</span>
                <input type="url" name="twitter_url" value="{{ old('twitter_url', $settings->twitter_url) }}" class="admin-input">
            </label>
            <label class="block md:col-span-2">
                <span class="admin-label">Footer copyright</span>
                <input type="text" name="footer_copyright" value="{{ old('footer_copyright', $settings->footer_copyright) }}" class="admin-input">
            </label>
        </div>

        <button type="submit" class="btn-primary">Save settings</button>
    </form>
@endsection
