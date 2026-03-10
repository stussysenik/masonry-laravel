<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'company_blurb',
        'mission_statement',
        'contact_email',
        'contact_phone',
        'contact_address',
        'instagram_url',
        'facebook_url',
        'youtube_url',
        'twitter_url',
        'footer_copyright',
    ];
}
