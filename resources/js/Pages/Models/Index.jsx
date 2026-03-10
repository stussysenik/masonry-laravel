import { Head, Link, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Index({ filters, brands, vehicles, vehicleOptions }) {
    const [brand, setBrand] = useState(filters.brand || '');
    const [model, setModel] = useState(filters.model || '');

    const modelOptions = useMemo(() => {
        return vehicleOptions.filter((vehicle) => !brand || vehicle.brand?.slug === brand);
    }, [brand, vehicleOptions]);

    const submit = (event) => {
        event.preventDefault();

        router.get('/models', {
            brand: brand || undefined,
            model: model || undefined,
        }, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Models" />
            <PublicLayout>
                <section className="page-shell page-section border-b border-white/10">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="eyebrow">Catalog</div>
                        <h1 className="mt-4 text-5xl font-light tracking-[0.18em] md:text-6xl">Published Models</h1>
                        <p className="mt-6 text-sm leading-7 text-white/65">
                            Filter by brand or jump directly to a published model from the current collection.
                        </p>
                    </div>
                    <form onSubmit={submit} className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
                        <select
                            value={brand}
                            onChange={(event) => {
                                setBrand(event.target.value);
                                setModel('');
                            }}
                            className="glass-panel px-5 py-4 text-sm uppercase tracking-[0.24em] text-white outline-none"
                        >
                            <option value="">All brands</option>
                            {brands.map((brandOption) => (
                                <option key={brandOption.id} value={brandOption.slug} className="text-black">
                                    {brandOption.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={model}
                            onChange={(event) => setModel(event.target.value)}
                            className="glass-panel px-5 py-4 text-sm uppercase tracking-[0.24em] text-white outline-none"
                        >
                            <option value="">All models</option>
                            {modelOptions.map((vehicle) => (
                                <option key={vehicle.id} value={vehicle.slug} className="text-black">
                                    {vehicle.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="btn-primary !w-full gap-3">
                            <Search className="h-4 w-4" />
                            Apply filters
                        </button>
                    </form>
                </section>

                <section className="page-shell page-section">
                    <div className="mb-8 text-sm uppercase tracking-[0.28em] text-white/50">
                        {vehicles.length} {vehicles.length === 1 ? 'result' : 'results'}
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {vehicles.map((vehicle) => (
                            <Link key={vehicle.id} href={`/models/${vehicle.slug}`} className="group block">
                                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
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
                                            <span className="border border-white/35 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em]">
                                                {vehicle.brand.name}
                                            </span>
                                        ) : null}
                                        {vehicle.is_featured ? (
                                            <span className="border border-white/20 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/70">
                                                Featured
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mt-5 space-y-2">
                                    <h2 className="text-2xl font-light tracking-[0.12em]">{vehicle.name}</h2>
                                    {vehicle.subtitle ? (
                                        <p className="text-xs uppercase tracking-[0.28em] text-white/50">{vehicle.subtitle}</p>
                                    ) : null}
                                    <p className="text-sm leading-7 text-white/65">{vehicle.teaser}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {!vehicles.length ? (
                        <div className="glass-panel mt-10 p-10 text-center text-sm leading-7 text-white/60">
                            No published models match the current filter combination.
                        </div>
                    ) : null}
                </section>
            </PublicLayout>
        </>
    );
}
