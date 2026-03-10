<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\BrandController as AdminBrandController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DealerController as AdminDealerController;
use App\Http\Controllers\Admin\HeroSlideController as AdminHeroSlideController;
use App\Http\Controllers\Admin\InquiryController as AdminInquiryController;
use App\Http\Controllers\Admin\NewsPostController as AdminNewsPostController;
use App\Http\Controllers\Admin\SiteSettingController as AdminSiteSettingController;
use App\Http\Controllers\Admin\VehicleController as AdminVehicleController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\DealerController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\NewsController;
use App\Http\Controllers\Site\PageController;
use App\Http\Controllers\Site\VehicleController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/models', [VehicleController::class, 'index'])->name('models.index');
Route::get('/models/{vehicle:slug}', [VehicleController::class, 'show'])->name('models.show');
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{newsPost:slug}', [NewsController::class, 'show'])->name('news.show');
Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/inquiries/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/dealers', [DealerController::class, 'index'])->name('dealers.index');
Route::post('/inquiries/dealer', [DealerController::class, 'store'])->name('dealers.store');
Route::get('/privacy-policy', [PageController::class, 'privacy'])->name('legal.privacy');
Route::get('/terms-of-service', [PageController::class, 'terms'])->name('legal.terms');

Route::prefix('admin')->name('admin.')->group(function (): void {
    Route::middleware('guest')->group(function (): void {
        Route::get('/login', [AdminAuthController::class, 'create'])->name('login');
        Route::post('/login', [AdminAuthController::class, 'store'])->name('login.store');
    });

    Route::middleware(['auth', 'admin'])->group(function (): void {
        Route::get('/', DashboardController::class)->name('dashboard');
        Route::post('/logout', [AdminAuthController::class, 'destroy'])->name('logout');
        Route::resource('hero-slides', AdminHeroSlideController::class)->except('show');
        Route::resource('brands', AdminBrandController::class)->except('show');
        Route::resource('vehicles', AdminVehicleController::class)->except('show');
        Route::resource('news-posts', AdminNewsPostController::class)->except('show');
        Route::resource('dealers', AdminDealerController::class)->except('show');
        Route::resource('inquiries', AdminInquiryController::class)->only(['index', 'edit', 'update', 'destroy']);
        Route::get('/settings', [AdminSiteSettingController::class, 'edit'])->name('settings.edit');
        Route::put('/settings', [AdminSiteSettingController::class, 'update'])->name('settings.update');
    });
});
