"use client";

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';

const SmoothScroll = ({ children }) => {
    const pathname = usePathname();
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.7,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: true,
            touchMultiplier: 3,
            infinite: false,
            wheelMultiplier: 1.4,
            lerp: 0.2,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        // Professional anchor click handling to prevent sudden jumps
        const handleAnchorClick = (e) => {
            const href = e.currentTarget.getAttribute('href');

            if (href && (href.startsWith('#') || (href.startsWith('/#') && window.location.pathname === '/'))) {
                e.preventDefault();
                const targetId = href.startsWith('/#') ? href.substring(1) : href;
                const target = document.querySelector(targetId);

                if (target) {
                    lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.2,
                        easing: (t) => 1 - Math.pow(1 - t, 4),
                    });
                }
            }
        };

        const anchors = document.querySelectorAll('a[href*="#"]');
        anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
            anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
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
