import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';

export default function Dealers({ defaultDealer, dealers, vehicles }) {
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        vehicle_id: '',
        dealer_id: defaultDealer || '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post('/inquiries/dealer');
    };

    return (
        <>
            <Head title="Dealers" />
            <PublicLayout>
                <section className="page-shell page-section border-b border-white/10">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="eyebrow">Network</div>
                        <h1 className="mt-4 text-5xl font-light tracking-[0.18em] md:text-6xl">Find a Dealer</h1>
                        <p className="mt-6 text-sm leading-7 text-white/65">
                            Browse active dealer locations and route a build or sourcing inquiry to the correct market.
                        </p>
                    </div>
                </section>

                <section className="page-shell page-section grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
                    <div className="grid gap-6 md:grid-cols-2">
                        {dealers.map((dealer) => (
                            <div key={dealer.id} className="glass-panel overflow-hidden">
                                {dealer.image_url ? (
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img src={dealer.image_url} alt={dealer.name} className="h-full w-full object-cover" />
                                    </div>
                                ) : null}
                                <div className="p-6">
                                    <div className="eyebrow">{dealer.country}</div>
                                    <h2 className="mt-3 text-2xl font-light tracking-[0.12em]">{dealer.name}</h2>
                                    <div className="mt-4 space-y-2 text-sm leading-7 text-white/65">
                                        <p>{dealer.city}</p>
                                        <p>{dealer.address}</p>
                                        <p>{dealer.phone}</p>
                                        <p>{dealer.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={submit} className="glass-panel p-8 md:p-10">
                        <div className="eyebrow">Dealer inquiry</div>
                        <h2 className="mt-4 text-3xl font-light tracking-[0.14em]">Request Contact</h2>
                        <div className="mt-8 form-grid">
                            <label>
                                <span className="admin-label">Name</span>
                                <input className="admin-input" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} />
                                {form.errors.name ? <div className="mt-2 text-sm text-rose-300">{form.errors.name}</div> : null}
                            </label>
                            <label>
                                <span className="admin-label">Email</span>
                                <input type="email" className="admin-input" value={form.data.email} onChange={(event) => form.setData('email', event.target.value)} />
                                {form.errors.email ? <div className="mt-2 text-sm text-rose-300">{form.errors.email}</div> : null}
                            </label>
                            <label>
                                <span className="admin-label">Phone</span>
                                <input className="admin-input" value={form.data.phone} onChange={(event) => form.setData('phone', event.target.value)} />
                            </label>
                            <label>
                                <span className="admin-label">Dealer</span>
                                <select className="admin-input" value={form.data.dealer_id} onChange={(event) => form.setData('dealer_id', event.target.value)}>
                                    <option value="">Select dealer</option>
                                    {dealers.map((dealer) => (
                                        <option key={dealer.id} value={dealer.id} className="text-black">
                                            {dealer.name} · {dealer.city}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="md:col-span-2">
                                <span className="admin-label">Vehicle of interest</span>
                                <select className="admin-input" value={form.data.vehicle_id} onChange={(event) => form.setData('vehicle_id', event.target.value)}>
                                    <option value="">Select model</option>
                                    {vehicles.map((vehicle) => (
                                        <option key={vehicle.id} value={vehicle.id} className="text-black">
                                            {vehicle.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="md:col-span-2">
                                <span className="admin-label">Message</span>
                                <textarea
                                    rows="7"
                                    className="admin-input"
                                    value={form.data.message}
                                    onChange={(event) => form.setData('message', event.target.value)}
                                />
                                {form.errors.message ? <div className="mt-2 text-sm text-rose-300">{form.errors.message}</div> : null}
                            </label>
                        </div>
                        <div className="mt-8">
                            <button type="submit" disabled={form.processing} className="btn-primary">
                                {form.processing ? 'Sending...' : 'Send dealer request'}
                            </button>
                        </div>
                    </form>
                </section>
            </PublicLayout>
        </>
    );
}
