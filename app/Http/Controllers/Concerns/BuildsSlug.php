<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait BuildsSlug
{
    protected function buildUniqueSlug(string $value, string $modelClass, ?Model $ignore = null): string
    {
        $baseSlug = Str::slug($value);
        $base = $baseSlug !== '' ? $baseSlug : 'item';
        $slug = $base;
        $counter = 2;

        while ($modelClass::query()
            ->where('slug', $slug)
            ->when($ignore, fn ($query) => $query->whereKeyNot($ignore->getKey()))
            ->exists()) {
            $slug = sprintf('%s-%d', $base, $counter);
            $counter++;
        }

        return $slug;
    }
}
