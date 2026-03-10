import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Show({ vehicle, relatedVehicles }) {
    return (
        <>
            <Head title={vehicle.name} />
            <PublicLayout>
                <section className="relative min-h-[70vh] overflow-hidden border-b border-white/10">
                    {vehicle.image_url ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${vehicle.image_url})` }}
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
                    <div className="page-shell relative z-10 flex min-h-[70vh] items-end py-16">
                        <div className="max-w-3xl">
                            {vehicle.brand ? (
                                <div className="eyebrow">{vehicle.brand.name}</div>
                            ) : null}
                            <h1 className="mt-4 text-5xl font-light tracking-[0.16em] md:text-7xl">{vehicle.name}</h1>
                            {vehicle.subtitle ? (
                                <p className="mt-4 text-xl uppercase tracking-[0.3em] text-white/70">{vehicle.subtitle}</p>
                            ) : null}
                            <p className="mt-8 max-w-2xl text-sm leading-8 text-white/70">{vehicle.teaser}</p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link href={`/contact?vehicle=${vehicle.slug}`} className="btn-primary">
                                    Start an inquiry
                                </Link>
                                <Link href="/dealers" className="btn-outline">
                                    Find a dealer
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="page-shell page-section grid gap-10 lg:grid-cols-[1.3fr,0.7fr]">
                    <div className="space-y-8">
                        <div>
                            <div className="eyebrow">Overview</div>
                            <div className="mt-5 max-w-3xl text-base leading-8 text-white/75">{vehicle.description}</div>
                        </div>
                    </div>
                    <aside className="glass-panel p-8">
                        <div className="eyebrow">Build Snapshot</div>
                        <div className="mt-6 space-y-4 text-sm text-white/70">
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Brand</div>
                                <div className="mt-1">{vehicle.brand?.name || 'Atelier'}</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Status</div>
                                <div className="mt-1 capitalize">{vehicle.status}</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Commission</div>
                                <div className="mt-1">{vehicle.is_featured ? 'Featured atelier program' : 'Bespoke atelier build'}</div>
                            </div>
                        </div>
                    </aside>
                </section>

                {relatedVehicles.length ? (
                    <section className="page-shell page-section border-t border-white/10">
                        <div className="mb-8">
                            <div className="eyebrow">More</div>
                            <h2 className="section-title mt-4">Related Models</h2>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-3">
                            {relatedVehicles.map((relatedVehicle) => (
                                <Link key={relatedVehicle.id} href={`/models/${relatedVehicle.slug}`} className="group block">
                                    <div className="aspect-[4/3] overflow-hidden bg-white/5">
                                        {relatedVehicle.image_url ? (
                                            <img
                                                src={relatedVehicle.image_url}
                                                alt={relatedVehicle.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : null}
                                    </div>
                                    <div className="mt-5">
                                        <h3 className="text-2xl font-light tracking-[0.12em]">{relatedVehicle.name}</h3>
                                        <p className="mt-3 text-sm leading-7 text-white/65">{relatedVehicle.teaser}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ) : null}
            </PublicLayout>
        </>
    );
}
