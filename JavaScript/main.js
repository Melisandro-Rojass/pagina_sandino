/**
 * ====================================================================
 * main.js - Orquestador Principal de JavaScript
 * ====================================================================
 * Coordina la inicialización de todos los módulos:
 * - AppAnimations: Ripple, 3D Tilt, kinetic typography, etc.
 * - AppScroll: Barra de progreso, Header dinámico, IntersectionObserver, Back-to-Top.
 * - Navegación interactiva de tarjetas (hace clicable toda la tarjeta con accesibilidad).
 */

(function () {
    'use strict';

    /**
     * Permite que toda la tarjeta sea cliqueable al hacer clic en cualquier área,
     * respetando clics directos sobre botones y enlaces hijos.
     */
    function initCardClickability() {
        const cards = document.querySelectorAll('.muestra, .muestra2');
        cards.forEach((card) => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Si el clic fue directo en un enlace o botón dentro de la tarjeta, dejar que funcione normalmente
                if (e.target.closest('a') || e.target.closest('button')) {
                    return;
                }

                // Buscar el enlace principal de la tarjeta
                const mainLink = card.querySelector('a');
                if (mainLink && mainLink.href) {
                    window.location.href = mainLink.href;
                }
            });
        });
    }

    function initMobileNavigation() {
        const toggle = document.getElementById('nav-toggle');
        const menu = document.getElementById('nav-menu');
        if (!toggle || !menu) return;

        function closeMenu() {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menú');
        }

        toggle.addEventListener('click', () => {
            const shouldOpen = toggle.getAttribute('aria-expanded') !== 'true';
            menu.classList.toggle('is-open', shouldOpen);
            toggle.setAttribute('aria-expanded', String(shouldOpen));
            toggle.setAttribute('aria-label', shouldOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        menu.addEventListener('click', (event) => {
            if (event.target.closest('a')) closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                closeMenu();
                toggle.focus();
            }
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('#main-header')) closeMenu();
        });

        if (window.matchMedia) {
            const desktopViewport = window.matchMedia('(min-width: 960px)');
            const closeMenuOnDesktop = (event) => {
                if (event.matches) closeMenu();
            };

            if (desktopViewport.addEventListener) {
                desktopViewport.addEventListener('change', closeMenuOnDesktop);
            } else if (desktopViewport.addListener) {
                desktopViewport.addListener(closeMenuOnDesktop);
            }
        }
    }

    /**
     * Inicialización global de la aplicación
     */
    function initApp() {
        // Inicializar animaciones de interacción
        if (window.AppAnimations && typeof window.AppAnimations.init === 'function') {
            window.AppAnimations.init();
        }

        // Inicializar efectos de desplazamiento (Scroll)
        if (window.AppScroll && typeof window.AppScroll.init === 'function') {
            window.AppScroll.init();
        }

        initMobileNavigation();

        // Configurar interacción en tarjetas
        initCardClickability();

        console.log(
            '%c⚡ Sandino Web App - JavaScript y Animaciones Inicializadas con Éxito.',
            'color: #00d2ff; font-weight: bold; font-size: 13px;'
        );
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
