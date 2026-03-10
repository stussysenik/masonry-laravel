<x-mail::message>
# New {{ ucfirst($inquiry->type) }} inquiry

- Name: {{ $inquiry->name }}
- Email: {{ $inquiry->email }}
- Phone: {{ $inquiry->phone ?: 'Not provided' }}
- Status: {{ $inquiry->status }}
- Vehicle: {{ $inquiry->vehicle?->name ?: 'Not selected' }}
- Dealer: {{ $inquiry->dealer?->name ?: 'Not selected' }}

{{ $inquiry->message }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
