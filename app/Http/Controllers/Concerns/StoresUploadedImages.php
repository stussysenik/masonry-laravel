<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait StoresUploadedImages
{
    protected function storeImage(?UploadedFile $file, ?string $currentImage, string $directory): ?string
    {
        if (! $file) {
            return $currentImage;
        }

        if ($currentImage && ! Str::startsWith($currentImage, ['http://', 'https://'])) {
            Storage::disk('public')->delete($currentImage);
        }

        return $file->store($directory, 'public');
    }

    protected function deleteStoredImage(?string $image): void
    {
        if ($image && ! Str::startsWith($image, ['http://', 'https://'])) {
            Storage::disk('public')->delete($image);
        }
    }
}
