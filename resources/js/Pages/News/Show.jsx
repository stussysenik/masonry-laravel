import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';

const formatDate = (value) =>
    new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));

export default function Show({ newsPost, relatedPosts }) {
    return (
        <>
            <Head title={newsPost.title} />
            <PublicLayout>
                <section className="page-shell page-section border-b border-white/10">
                    <div className="mx-auto max-w-4xl">
                        <div className="eyebrow">News</div>
                        <h1 className="mt-4 text-5xl font-light tracking-[0.14em] md:text-6xl">{newsPost.title}</h1>
                        <div className="mt-5 text-sm uppercase tracking-[0.28em] text-white/45">
                            {formatDate(newsPost.published_at)}
                        </div>
                        {newsPost.excerpt ? (
                            <p className="mt-8 max-w-3xl text-base leading-8 text-white/70">{newsPost.excerpt}</p>
                        ) : null}
                    </div>
                </section>

                <section className="page-shell page-section grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
                    <div className="space-y-8">
                        {newsPost.image_url ? (
                            <div className="overflow-hidden border border-white/10">
                                <img src={newsPost.image_url} alt={newsPost.title} className="h-full w-full object-cover" />
                            </div>
                        ) : null}
                        <div className="max-w-3xl text-base leading-8 text-white/75">{newsPost.body}</div>
                    </div>
                    <aside className="glass-panel p-8">
                        <div className="eyebrow">Next reads</div>
                        <div className="mt-6 space-y-5">
                            {relatedPosts.map((post) => (
                                <Link key={post.id} href={`/news/${post.slug}`} className="block border-b border-white/10 pb-5 last:border-b-0">
                                    <div className="text-sm uppercase tracking-[0.24em] text-white/45">
                                        {formatDate(post.published_at)}
                                    </div>
                                    <div className="mt-2 text-lg font-light tracking-[0.1em]">{post.title}</div>
                                </Link>
                            ))}
                        </div>
                    </aside>
                </section>
            </PublicLayout>
        </>
    );
}
