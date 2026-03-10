<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function privacy(): Response
    {
        return Inertia::render('Legal', [
            'title' => 'Privacy Policy',
            'intro' => 'We handle client information with discretion, minimal collection, and clear operational purpose.',
            'sections' => [
                [
                    'heading' => 'Information we collect',
                    'body' => 'We collect the information you submit through contact and dealer inquiry forms, including your contact details, selected vehicle or dealer, and the message required to respond to your request.',
                ],
                [
                    'heading' => 'How we use it',
                    'body' => 'Submitted details are used to manage customer inquiries, coordinate follow-up from the atelier or dealer network, and maintain a history of communication for service quality.',
                ],
                [
                    'heading' => 'Retention',
                    'body' => 'Inquiry records are stored within the application for internal review and can be removed as part of routine CRM cleanup or upon request where applicable.',
                ],
            ],
        ]);
    }

    public function terms(): Response
    {
        return Inertia::render('Legal', [
            'title' => 'Terms of Service',
            'intro' => 'This website is a marketing and inquiry experience for MANSORY atelier content and dealer discovery.',
            'sections' => [
                [
                    'heading' => 'Content',
                    'body' => 'Vehicle descriptions, atelier programs, and dealer information are indicative and may be updated without notice as specifications or availability evolve.',
                ],
                [
                    'heading' => 'Inquiries',
                    'body' => 'Submitting an inquiry does not create a purchase agreement or reservation. All projects remain subject to availability, review, and direct confirmation.',
                ],
                [
                    'heading' => 'Use of the site',
                    'body' => 'You agree not to interfere with site operations, attempt unauthorized access, or misuse forms, content, or imagery presented through this application.',
                ],
            ],
        ]);
    }
}
