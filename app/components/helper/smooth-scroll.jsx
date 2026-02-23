"use client";

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';

const SmoothScroll = ({ children }) => {
    const pathname = usePathname();
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: true,
            touchMultiplier: 2,
            infinite: false,
            wheelMultiplier: 1,
            lerp: 0.1,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        // Global event delegation for all anchor clicks
        const handleGlobalClick = (e) => {
            const anchor = e.target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');

            // Handle both '#' and '/#' (for homepage sections)
            if (href && (href.startsWith('#') || (href.startsWith('/#') && window.location.pathname === '/'))) {
                const targetId = href.startsWith('/#') ? href.substring(1) : href;

                // If it's just '#', it's usually a dummy link or scroll to top
                if (targetId === '#') {
                    e.preventDefault();
                    lenis.scrollTo(0, { duration: 1.2 });
                    return;
                }

                const target = document.querySelector(targetId);

                if (target) {
                    e.preventDefault();
                    lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.5,
                        easing: (t) => 1 - Math.pow(1 - t, 5), // Even smoother easing
                    });
                }
            }
        };

        document.addEventListener('click', handleGlobalClick);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    // Scroll to top on route change for immediate responsiveness
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
