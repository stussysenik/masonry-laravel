import { Head, Link, router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import PublicLayout from '../Layouts/PublicLayout';

const formatDate = (value) =>
    new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));

function VehicleCard({ vehicle, theme = 'dark' }) {
    const textClass = theme === 'light' ? 'text-black' : 'text-white';
    const copyClass = theme === 'light' ? 'text-black/65' : 'text-white/60';

    return (
        <Link href={`/models/${vehicle.slug}`} className="group block w-[320px] shrink-0 md:w-[380px]">
            <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-white/5">
                {vehicle.image_url ? (
                    <img
                        src={vehicle.image_url}
                        alt={vehicle.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {vehicle.brand ? (
                        <span className="border border-white/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em]">
                            {vehicle.brand.name}
                        </span>
                    ) : null}
                    {vehicle.subtitle ? (
                        <span className="border border-white/20 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/70">
                            {vehicle.subtitle}
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="space-y-2">
                <h3 className={`text-xl font-light tracking-[0.12em] ${textClass}`}>{vehicle.name}</h3>
                <p className={`text-sm leading-7 ${copyClass}`}>{vehicle.teaser}</p>
            </div>
        </Link>
    );
}

export default function Home({ heroSlides, brands, vehicleOptions, latestVehicles, featuredVehicles, latestNews }) {
    const { site } = usePage().props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const featuredRef = useRef(null);
    const socials = [
        { label: 'Instagram', href: site.instagram_url, image: latestVehicles[0]?.image_url },
        { label: 'Facebook', href: site.facebook_url, image: latestVehicles[1]?.image_url },
        { label: 'YouTube', href: site.youtube_url, image: latestVehicles[2]?.image_url },
        { label: 'X', href: site.twitter_url, image: latestVehicles[3]?.image_url },
    ].filter((item) => item.href);

    useEffect(() => {
        if (heroSlides.length <= 1) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setCurrentSlide((index) => (index + 1) % heroSlides.length);
        }, 6000);

        return () => window.clearInterval(interval);
    }, [heroSlides.length]);

    const modelOptions = useMemo(() => {
        return vehicleOptions.filter((vehicle) => !selectedBrand || vehicle.brand?.slug === selectedBrand);
    }, [selectedBrand, vehicleOptions]);

    const scrollFeatured = (direction) => {
        if (!featuredRef.current) {
            return;
        }

        featuredRef.current.scrollBy({
            left: direction === 'left' ? -404 : 404,
            behavior: 'smooth',
        });
    };

    const searchModels = () => {
        const query = {};

        if (selectedBrand) {
            query.brand = selectedBrand;
        }

        if (selectedModel) {
            query.model = selectedModel;
        }

        router.get('/models', query);
    };

    const slides = heroSlides.length ? heroSlides : [{
        id: 0,
        title: 'MANSORY',
        subtitle: 'ATELIER',
        image_url: latestVehicles[0]?.image_url,
        cta_label: 'Explore models',
        cta_url: '/models',
    }];

    return (
        <>
            <Head title="MANSORY Atelier" />
            <PublicLayout overlayNav>
                <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-all duration-1000 ${
                                index === currentSlide ? 'opacity-100' : 'pointer-events-none opacity-0'
                            }`}
                        >
                            {slide.image_url ? (
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${slide.image_url})` }}
                                />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/15" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />
                        </div>
                    ))}

                    <div className="page-shell relative z-10 flex w-full items-center pt-24">
                        <div className="max-w-4xl">
                            <div className="eyebrow mb-6 animate-fade-in-up">Official atelier website copy, rebuilt in Laravel</div>
                            <h1 className="animate-fade-in-up text-5xl font-light tracking-[0.16em] text-white md:text-7xl lg:text-8xl">
                                {slides[currentSlide]?.title}
                            </h1>
                            <p className="animate-fade-in-up mt-4 text-3xl font-light tracking-[0.22em] text-white/85 md:text-5xl lg:text-6xl">
                                {slides[currentSlide]?.subtitle}
                            </p>
                            <div className="animate-fade-in-up mt-10 flex flex-wrap gap-4">
                                <Link href={slides[currentSlide]?.cta_url || '/models'} className="btn-primary">
                                    {slides[currentSlide]?.cta_label || 'Discover now'}
                                </Link>
                                <Link href="/contact" className="btn-outline">
                                    Book a consultation
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                type="button"
                                className={`h-[2px] ${index === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/40'}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="absolute bottom-12 right-12 hidden text-center lg:block">
                        <div className="text-[10px] uppercase tracking-[0.35em] text-white/50">Scroll</div>
                        <div className="mx-auto mt-3 h-20 w-px overflow-hidden bg-white/20">
                            <div className="scroll-indicator h-6 w-full bg-white" />
                        </div>
                    </div>
                </section>

                <section className="page-shell page-section border-y border-white/10">
                    <div className="mx-auto max-w-6xl text-center">
                        <h2 className="section-title">Find Your Dream Model</h2>
                        <p className="mt-4 text-sm tracking-[0.25em] text-white/55">
                            Choose a brand and model, then jump straight into the catalog.
                        </p>
                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            <select
                                value={selectedBrand}
                                onChange={(event) => {
                                    setSelectedBrand(event.target.value);
                                    setSelectedModel('');
                                }}
                                className="glass-panel px-5 py-4 text-sm uppercase tracking-[0.24em] text-white outline-none"
                            >
                                <option value="">Select brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.slug} className="text-black">
                                        {brand.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedModel}
                                onChange={(event) => setSelectedModel(event.target.value)}
                                className="glass-panel px-5 py-4 text-sm uppercase tracking-[0.24em] text-white outline-none"
                            >
                                <option value="">Select model</option>
                                {modelOptions.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.slug} className="text-black">
                                        {vehicle.name}
                                    </option>
                                ))}
                            </select>

                            <button type="button" onClick={searchModels} className="btn-primary !w-full gap-3">
                                <Search className="h-4 w-4" />
                                Search
                            </button>
                        </div>
                    </div>
                </section>

                <section className="page-section bg-white text-black">
                    <div className="page-shell">
                        <div className="mb-10 flex items-center justify-between gap-6">
                            <div>
                                <div className="eyebrow !text-black/50">Curated selection</div>
                                <h2 className="section-title !text-black">Latest Additions</h2>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => scrollFeatured('left')}
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 hover:bg-black/5"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollFeatured('right')}
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 hover:bg-black/5"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div ref={featuredRef} className="scrollbar-hide flex gap-6 overflow-x-auto pb-4">
                            {latestVehicles.map((vehicle) => (
                                <VehicleCard key={vehicle.id} vehicle={vehicle} theme="light" />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="page-shell page-section bg-[#7b8795]">
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <div>
                            <div className="eyebrow">Editorial</div>
                            <h2 className="section-title">News & Events</h2>
                        </div>
                        <Link href="/news" className="btn-outline">
                            See all
                        </Link>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {latestNews.map((post) => (
                            <Link key={post.id} href={`/news/${post.slug}`} className="group block">
                                <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-black/20">
                                    {post.image_url ? (
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : null}
                                    <div className="absolute inset-0 bg-black/25" />
                                </div>
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="border border-white/40 px-3 py-1 text-[10px] uppercase tracking-[0.28em]">
                                        News
                                    </span>
                                    <span className="text-xs uppercase tracking-[0.24em] text-white/70">
                                        {formatDate(post.published_at)}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-light tracking-[0.12em]">{post.title}</h3>
                                <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">{post.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="grid md:grid-cols-2">
                    <Link href="/models" className="group relative flex min-h-[28rem] items-center justify-center overflow-hidden">
                        {featuredVehicles[0]?.image_url ? (
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${featuredVehicles[0].image_url})` }}
                            />
                        ) : null}
                        <div className="absolute inset-0 bg-black/55" />
                        <div className="relative z-10 max-w-md px-8 text-center">
                            <div className="eyebrow">Catalog</div>
                            <h2 className="mt-4 text-4xl font-light tracking-[0.18em]">All Models</h2>
                            <p className="mt-5 text-sm leading-7 text-white/70">
                                Browse published builds, atelier commissions, and the latest additions across the collection.
                            </p>
                        </div>
                    </Link>
                    <Link href="/dealers" className="group relative flex min-h-[28rem] items-center justify-center overflow-hidden">
                        {featuredVehicles[1]?.image_url ? (
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${featuredVehicles[1].image_url})` }}
                            />
                        ) : null}
                        <div className="absolute inset-0 bg-black/55" />
                        <div className="relative z-10 max-w-md px-8 text-center">
                            <div className="eyebrow">Network</div>
                            <h2 className="mt-4 text-4xl font-light tracking-[0.18em]">Find a Dealer</h2>
                            <p className="mt-5 text-sm leading-7 text-white/70">
                                Connect with the right market representative for consultation, sourcing, and delivery.
                            </p>
                        </div>
                    </Link>
                </section>

                <section className="page-shell page-section grid gap-8 lg:grid-cols-2">
                    <div className="glass-panel flex flex-col justify-center p-8 md:p-12">
                        <div className="eyebrow">Atelier</div>
                        <h2 className="mt-4 text-4xl font-light tracking-[0.18em]">Get In Touch</h2>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                            We tailor every consultation to the expectations of the client. Use the contact form to discuss a build, a sourcing request, or a special atelier commission.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/dealers" className="btn-outline">
                                Find a dealer
                            </Link>
                            <Link href="/contact" className="btn-primary">
                                Contact us
                            </Link>
                        </div>
                    </div>
                    <div className="glass-panel flex flex-col justify-center p-8 md:p-12">
                        <div className="eyebrow">Mission</div>
                        <h2 className="mt-4 text-4xl font-light tracking-[0.18em]">
                            {site.mission_statement}
                        </h2>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                            Each project is developed as an individual object, from carbon architecture to material selection and finished detailing.
                        </p>
                        <div className="mt-8">
                            <Link href="/models" className="btn-primary">
                                Explore the collection
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="page-shell page-section">
                    <div className="mb-10 text-center">
                        <div className="eyebrow">Social</div>
                        <h2 className="section-title mt-4">Follow Us</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {socials.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative aspect-square overflow-hidden border border-white/10"
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.label}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : null}
                                <div className="absolute inset-0 bg-black/40" />
                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <div className="text-[10px] uppercase tracking-[0.32em] text-white/60">
                                        @{site.site_name}
                                    </div>
                                    <div className="mt-2 text-lg font-light tracking-[0.14em]">{item.label}</div>
                                    <div className="mt-3 text-sm text-white/70">
                                        Follow the latest atelier drops and commissions.
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
