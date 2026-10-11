/**
 * ====================================================================
 * animations.js - Motor de Animaciones e Interactividad
 * ====================================================================
 * Este archivo gestiona las microinteracciones visuales:
 * 1. Efecto de inclinación 3D (Tilt) suave en tarjetas al mover el cursor.
 * 2. Animaciones cinéticas de entrada en el texto del Hero.
 * (Nota: Se eliminó el efecto ripple para evitar parpadeos blancos al hacer clic).
 */

(function () {
    'use strict';

    /**
     * Inicializa el efecto de inclinación 3D (Tilt) en las tarjetas de información
     */
    function initCardTilt() {
        // Desactivar si el usuario prefiere movimiento reducido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const cards = document.querySelectorAll('.muestra, .muestra2, .info-card');
        if (!cards.length) return;

        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -4; // Inclinación suave y controlada
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    /**
     * Animación de entrada escalonada para el texto Hero ("Patria Libre o Morir")
     */
    function initHeroEntranceAnimation() {
        const heroElements = document.querySelectorAll('.hero-reveal');
        if (!heroElements.length) return;

        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transitionDelay = `${index * 120}ms`;

            requestAnimationFrame(() => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 80);
            });
        });
    }

    /**
     * Expone y ejecuta las animaciones
     */
    window.AppAnimations = {
        init: function () {
            initCardTilt();
            initHeroEntranceAnimation();
        }
    };
})();
