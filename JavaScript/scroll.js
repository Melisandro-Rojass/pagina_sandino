/**
 * ====================================================================
 * scroll.js - Motor de Animaciones de Desplazamiento (Scroll)
 * ====================================================================
 * Este archivo gestiona la experiencia de scroll en la página:
 * 1. Barra de progreso de lectura superior sincronizada con el scroll.
 * 2. Header dinámico con efecto glassmorphic y reducción al deslizar.
 * 3. Aparición fluida de elementos (Scroll Reveal) mediante IntersectionObserver.
 * 4. Botón flotante "Volver arriba" con aparición suave.
 * 5. Desplazamiento suave (smooth scroll) con ajuste automático de compensación de header.
 * 6. Resaltado automático de la sección activa en el menú de navegación.
 */

(function () {
    'use strict';

    /**
     * Barra de progreso de lectura en la parte superior
     */
    function initProgressBar() {
        const progressBar = document.getElementById('scroll-progress-bar');
        if (!progressBar) return;

        function updateProgress() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercentage))}%`;
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /**
     * Header dinámico con cambio de estilo al desplazarse
     */
    function initDynamicHeader() {
        const header = document.getElementById('main-header');
        if (!header) return;

        function handleScroll() {
            if (window.scrollY > 40) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    /**
     * Animaciones de aparición fluida al entrar en pantalla (Scroll Reveal)
     */
    function initScrollReveal() {
        const revealItems = document.querySelectorAll('.reveal-item, .section-reveal');
        if (!revealItems.length) return;

        // Si el navegador no soporta IntersectionObserver, mostrar directamente
        if (!('IntersectionObserver' in window)) {
            revealItems.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.12
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Una vez revelado, dejamos de observar para rendimiento
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealItems.forEach((item, index) => {
            // Asignar retardo escalonado si es una tarjeta o elemento agrupado
            if (item.classList.contains('muestra') || item.classList.contains('muestra2')) {
                const parentGroup = item.parentElement;
                if (parentGroup) {
                    const siblingCards = Array.from(parentGroup.children);
                    const cardIndex = siblingCards.indexOf(item);
                    item.style.transitionDelay = `${(cardIndex % 3) * 0.15}s`;
                }
            }
            observer.observe(item);
        });
    }

    /**
     * Botón flotante para volver arriba
     */
    function initBackToTop() {
        const backToTopBtn = document.getElementById('btn-back-to-top');
        if (!backToTopBtn) return;

        function toggleBackToTop() {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Desplazamiento suave para enlaces ancla respetando la altura del header fijo
     */
    function initSmoothAnchorScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        const header = document.getElementById('main-header');

        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = Math.max(0, elementPosition - headerHeight - 10);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Resaltado automático del menú según la sección visible
     */
    function initActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#nav-menu .nav-link');
        if (!sections.length || !navLinks.length) return;

        function updateActiveNav() {
            const scrollY = window.scrollY;
            const header = document.getElementById('main-header');
            const headerHeight = header ? header.offsetHeight : 70;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - headerHeight - 40;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach((link) => {
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }

    /**
     * Expone y ejecuta las funciones de scroll
     */
    window.AppScroll = {
        init: function () {
            initProgressBar();
            initDynamicHeader();
            initScrollReveal();
            initBackToTop();
            initSmoothAnchorScroll();
            initActiveNavOnScroll();
        }
    };
})();
