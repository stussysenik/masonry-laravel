# MANSORY Laravel

![Demo](demo.gif)


Laravel rebuild of the MANSORY website draft, implemented as a full end-to-end product with:

- Laravel 12 backend
- Inertia.js + React public frontend
- Blade-based internal admin CMS
- SQLite development database
- CMS-managed hero slides, brands, vehicles, news posts, dealers, and site settings
- Stored inquiries plus Laravel mail notifications

## What Is Included

### Public site
- Homepage with hero slider, model finder, latest additions, news section, dealer and contact CTAs, and social/footer areas
- `/models` catalog with brand/model filtering
- `/models/{slug}` detail pages
- `/news` listing and `/news/{slug}` article pages
- `/contact` inquiry form
- `/dealers` dealer listing and dealer inquiry form
- Privacy policy and terms pages

### Admin CMS
- `/admin/login`
- Dashboard overview
- CRUD for:
  - Hero slides
  - Brands
  - Vehicles
  - News posts
  - Dealers
  - Site settings
- Inquiry review and status updates

## Local Credentials

Seeded admin account:

- Email: `admin@mansory.test`
- Password: `password`

## Tech Stack

- PHP 8.5
- Laravel 12
- Inertia.js
- React 19
- Vite 7
- SQLite

## Getting Started

### 1. Install dependencies

```bash
composer install
npm install
```

### 2. Prepare environment

```bash
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan storage:link
```

### 3. Migrate and seed

```bash
php artisan migrate --seed
```

### 4. Run the app

```bash
php artisan serve
```

In another terminal:

```bash
npm run dev
```

The app will be available at `http://127.0.0.1:8000`.

## Build and Test

Run the production frontend build:

```bash
npm run build
```

Run the test suite:

```bash
php artisan test
```

## Mail Behavior

Development mail is configured through Laravel mail settings. By default this project uses Laravel's `log` mailer locally, so inquiry notifications are written to the application logs unless you switch SMTP settings in `.env`.

## Data Model Summary

Main content entities:

- `brands`
- `vehicles`
- `news_posts`
- `hero_slides`
- `dealers`
- `inquiries`
- `site_settings`

## Project Notes

- The original standalone React draft is preserved in `draft-react/` as source/reference material.
- Runtime dependencies and generated assets are ignored via `.gitignore`.
- The application is optimized for local development with SQLite by default.
