import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const navigationItems = [
    { label: 'Models', href: '/models' },
    { label: 'News', href: '/news' },
    { label: 'Find a Dealer', href: '/dealers' },
    { label: 'Contact', href: '/contact' },
];

export default function PublicLayout({ children, overlayNav = false }) {
    const { site, flash } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 24);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const footerLinks = useMemo(() => ([
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Admin', href: '/admin/login' },
    ]), []);

    const socials = [
        { label: 'Instagram', href: site.instagram_url },
        { label: 'Facebook', href: site.facebook_url },
        { label: 'YouTube', href: site.youtube_url },
        { label: 'X', href: site.twitter_url },
    ].filter((item) => item.href);

    return (
        <div className="min-h-screen bg-black text-white">
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                    isScrolled || !overlayNav ? 'border-b border-white/10 bg-black/90 backdrop-blur-md' : 'bg-transparent'
                }`}
            >
                <div className="page-shell flex h-20 items-center justify-between">
                    <div className="hidden items-center gap-6 lg:flex">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-xs uppercase tracking-[0.28em] text-white/70 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen((value) => !value)}
                        aria-label="Toggle navigation"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    <Link href="/" className="mansory-logo text-center">
                        {site.site_name}
                    </Link>

                    <div className="hidden lg:flex">
                        <Link href="/contact" className="btn-outline !px-4 !py-2">
                            Contact Us
                        </Link>
                    </div>

                    <div className="w-6 lg:hidden" />
                </div>

                <div
                    className={`lg:hidden ${
                        isMenuOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0 overflow-hidden'
                    } bg-black/95 transition-all duration-500`}
                >
                    <div className="page-shell flex flex-col gap-6 py-6">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm uppercase tracking-[0.32em] text-white/80 hover:text-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {flash.success ? (
                <div className="fixed right-4 top-24 z-50 max-w-sm border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    {flash.success}
                </div>
            ) : null}

            <main className={overlayNav ? '' : 'pt-20'}>{children}</main>

            <footer className="border-t border-white/10 bg-black">
                <div className="page-shell grid gap-12 py-16 lg:grid-cols-[1.5fr,1fr,1fr]">
                    <div className="space-y-6">
                        <div className="mansory-logo inline-block">{site.site_name}</div>
                        <p className="max-w-xl text-sm leading-7 text-white/60">{site.company_blurb}</p>
                        <div className="space-y-2 text-sm text-white/60">
                            <p>{site.contact_email}</p>
                            <p>{site.contact_phone}</p>
                            <p>{site.contact_address}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-xs uppercase tracking-[0.32em] text-white/60">Navigate</h3>
                        <div className="space-y-3 text-sm text-white/70">
                            {navigationItems.map((item) => (
                                <div key={item.href}>
                                    <Link href={item.href} className="hover:text-white">
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-xs uppercase tracking-[0.32em] text-white/60">Follow</h3>
                        <div className="space-y-3 text-sm text-white/70">
                            {socials.map((item) => (
                                <div key={item.label}>
                                    <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                                        {item.label}
                                    </a>
                                </div>
                            ))}
                            {footerLinks.map((item) => (
                                <div key={item.href}>
                                    <Link href={item.href} className="hover:text-white">
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10">
                    <div className="page-shell py-5 text-xs uppercase tracking-[0.24em] text-white/40">
                        © {new Date().getFullYear()} {site.footer_copyright}
                    </div>
                </div>
            </footer>
        </div>
    );
}
