/* assets/script.js
   Applied Computer School™ — Polished Interactions
   v1.5 · Cleaned & refined · Low-end Android safe
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ── LANGUAGE DROPDOWN ── */
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');

    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = !languageDropdown.hasAttribute('hidden');

            if (isOpen) {
                languageDropdown.setAttribute('hidden', '');
                languageToggle.setAttribute('aria-expanded', 'false');
            } else {
                languageDropdown.removeAttribute('hidden');
                languageToggle.setAttribute('aria-expanded', 'true');
            }
        });

        languageDropdown.querySelectorAll('.language-option').forEach((option) => {
            option.addEventListener('click', () => {
                const selectedLang = option.dataset.lang || 'hi';
                localStorage.setItem('acs_lang', selectedLang);

                languageDropdown.querySelectorAll('.language-option').forEach((item) => {
                    item.classList.remove('active');
                    item.textContent = item.textContent.replace(' ✓', '');
                });

                option.classList.add('active');
                if (!option.textContent.includes('✓')) {
                    option.textContent = option.textContent.trim() + ' ✓';
                }

                languageDropdown.setAttribute('hidden', '');
                languageToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.setAttribute('hidden', '');
                languageToggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                languageDropdown.setAttribute('hidden', '');
                languageToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }


    /* ── SECTION AUDIO BUTTONS ──
       (Bhashini APK integration pending — placeholder behavior) */
    document.querySelectorAll('.audio-section-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;

            const originalText = btn.dataset.originalText || btn.textContent.trim();
            btn.dataset.originalText = originalText;

            btn.disabled = true;
            btn.classList.add('active');
            btn.textContent = '🔊 चल रहा है...';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('active');
                btn.disabled = false;
            }, 2000);
        });
    });

    /* ── NAV: Scroll shadow (rAF-throttled for smoothness) ── */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 8) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── SMOOTH SCROLL for in-page anchors ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ── INTERSECTION OBSERVER: Fade-in on scroll ──
       .in-view rule अब style.css में है — यहाँ सिर्फ class add होती है */
    const fadeEls = document.querySelectorAll(
        '.hero-content, .course-categories, .testimonials, .academy-courses, .vani-category, .skill-hub, .employer-section, .about-section, .premium-card, .course-category-card, .testimonial-card, .trust-card'
    );

    if ('IntersectionObserver' in window && fadeEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

        fadeEls.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
            el.style.transitionDelay = (i % 4 * 60) + 'ms';
            io.observe(el);
        });
    }

});
