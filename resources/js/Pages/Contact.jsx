import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';

export default function Contact({ defaultVehicle, vehicles, dealers }) {
    const defaultVehicleId = vehicles.find((vehicle) => vehicle.slug === defaultVehicle)?.id ?? '';
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        vehicle_id: defaultVehicleId,
        dealer_id: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post('/inquiries/contact');
    };

    return (
        <>
            <Head title="Contact" />
            <PublicLayout>
                <section className="page-shell page-section border-b border-white/10">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="eyebrow">Atelier</div>
                        <h1 className="mt-4 text-5xl font-light tracking-[0.18em] md:text-6xl">Contact Us</h1>
                        <p className="mt-6 text-sm leading-7 text-white/65">
                            Share your expectations and the atelier team will respond with the right next step.
                        </p>
                    </div>
                </section>

                <section className="page-shell page-section grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
                    <div className="glass-panel p-8 md:p-10">
                        <div className="eyebrow">Direct</div>
                        <div className="mt-8 space-y-6 text-sm leading-7 text-white/70">
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">General inquiries</div>
                                <div className="mt-2">atelier@mansory.test</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Dealer network</div>
                                <div className="mt-2">Use the dealer page to route your request to a market representative.</div>
                            </div>
                            <div>
                                <Link href="/dealers" className="btn-outline">
                                    Browse dealers
                                </Link>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="glass-panel p-8 md:p-10">
                        <div className="form-grid">
                            <label>
                                <span className="admin-label">Name</span>
                                <input
                                    className="admin-input"
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                />
                                {form.errors.name ? <div className="mt-2 text-sm text-rose-300">{form.errors.name}</div> : null}
                            </label>
                            <label>
                                <span className="admin-label">Email</span>
                                <input
                                    type="email"
                                    className="admin-input"
                                    value={form.data.email}
                                    onChange={(event) => form.setData('email', event.target.value)}
                                />
                                {form.errors.email ? <div className="mt-2 text-sm text-rose-300">{form.errors.email}</div> : null}
                            </label>
                            <label>
                                <span className="admin-label">Phone</span>
                                <input
                                    className="admin-input"
                                    value={form.data.phone}
                                    onChange={(event) => form.setData('phone', event.target.value)}
                                />
                            </label>
                            <label>
                                <span className="admin-label">Vehicle</span>
                                <select
                                    className="admin-input"
                                    value={form.data.vehicle_id}
                                    onChange={(event) => form.setData('vehicle_id', event.target.value)}
                                >
                                    <option value="">Select a model</option>
                                    {vehicles.map((vehicle) => (
                                        <option key={vehicle.id} value={vehicle.id} className="text-black">
                                            {vehicle.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="md:col-span-2">
                                <span className="admin-label">Preferred dealer</span>
                                <select
                                    className="admin-input"
                                    value={form.data.dealer_id}
                                    onChange={(event) => form.setData('dealer_id', event.target.value)}
                                >
                                    <option value="">No preference</option>
                                    {dealers.map((dealer) => (
                                        <option key={dealer.id} value={dealer.id} className="text-black">
                                            {dealer.name} · {dealer.city}
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
                                {form.processing ? 'Sending...' : 'Send inquiry'}
                            </button>
                        </div>
                    </form>
                </section>
            </PublicLayout>
        </>
    );
}
