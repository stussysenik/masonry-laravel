import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';

const formatDate = (value) =>
    new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));

export default function Index({ newsPosts }) {
    return (
        <>
            <Head title="News" />
            <PublicLayout>
                <section className="page-shell page-section border-b border-white/10">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="eyebrow">Journal</div>
                        <h1 className="mt-4 text-5xl font-light tracking-[0.18em] md:text-6xl">News & Events</h1>
                        <p className="mt-6 text-sm leading-7 text-white/65">
                            Editorial updates, atelier launches, and announcements from the current collection.
                        </p>
                    </div>
                </section>

                <section className="page-shell page-section">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {newsPosts.map((post) => (
                            <Link key={post.id} href={`/news/${post.slug}`} className="group block">
                                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                                    {post.image_url ? (
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : null}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                </div>
                                <div className="mt-5">
                                    <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                                        {formatDate(post.published_at)}
                                    </div>
                                    <h2 className="mt-3 text-2xl font-light tracking-[0.12em]">{post.title}</h2>
                                    <p className="mt-3 text-sm leading-7 text-white/65">{post.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {!newsPosts.length ? (
                        <div className="glass-panel mt-10 p-10 text-center text-sm text-white/60">
                            No news posts are published yet.
                        </div>
                    ) : null}
                </section>
            </PublicLayout>
        </>
    );
}
