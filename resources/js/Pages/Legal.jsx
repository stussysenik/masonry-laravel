import { Head } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';

export default function Legal({ title, intro, sections }) {
    return (
        <>
            <Head title={title} />
            <PublicLayout>
                <section className="page-shell page-section border-b border-white/10">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="eyebrow">Legal</div>
                        <h1 className="mt-4 text-5xl font-light tracking-[0.18em] md:text-6xl">{title}</h1>
                        <p className="mt-6 text-sm leading-7 text-white/65">{intro}</p>
                    </div>
                </section>
                <section className="page-shell page-section">
                    <div className="mx-auto max-w-4xl space-y-10">
                        {sections.map((section) => (
                            <div key={section.heading} className="glass-panel p-8">
                                <h2 className="text-2xl font-light tracking-[0.12em]">{section.heading}</h2>
                                <p className="mt-4 text-sm leading-8 text-white/70">{section.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
