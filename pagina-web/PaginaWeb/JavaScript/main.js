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
