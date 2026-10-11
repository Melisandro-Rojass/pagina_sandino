# 🚀 Módulo JavaScript - Documentación

Esta carpeta contiene la arquitectura de JavaScript encargada de las animaciones, interactividad y efectos dinámicos del sitio web.

## 📂 Archivos en esta carpeta:

1. **`animations.js`**
   - **Efecto Ripple (Onda interactiva)** en botones (`.btn`, `.kahoot-link`, etc.) al hacer clic.
   - **Efecto 3D Tilt (Inclinación física)** al mover el cursor sobre las tarjetas informativas (`.muestra`, `.muestra2`).
   - **Animación cinética de entrada** para el lema *"Patria Libre o Morir"* en la sección Hero.
   - Respeta las preferencias de accesibilidad (`prefers-reduced-motion`).

2. **`scroll.js`**
   - **Barra de Progreso de Lectura (`#scroll-progress-bar`)**: Barra superior en tiempo real según el avance de scroll.
   - **Header Dinámico con Glassmorphism (`.header-scrolled`)**: El encabezado se adapta suavemente al deslizar.
   - **Aparición Fluida (Scroll Reveal)**: Utiliza `IntersectionObserver` para revelar elementos y tarjetas con cascada escalonada (*stagger delay*).
   - **Botón Flotante "Volver Arriba" (`#btn-back-to-top`)**: Aparece al bajar 350px y desplaza suavemente la página al inicio.
   - **Smooth Scroll con Compensación de Altura**: Los enlaces `#sobre-sandino` y `#kahoot` se deslizan con precisión sin que el menú tape el encabezado.
   - **Indicador de Sección Activa**: Actualiza dinámicamente qué enlace del menú está activo mientras el usuario navega.

3. **`main.js`**
   - Orquestador principal que asegura la carga ordenada tras el evento `DOMContentLoaded`.
   - Hace que las tarjetas (`.muestra`, `.muestra2`) sean completamente interactivas y cliqueables.

---

## 🛠️ Cómo incluir estos archivos en otras páginas:
Para usar estas mismas animaciones y utilidades en páginas secundarias (`biografia.html`, `logros.html`, etc.), simplemente agrega estas líneas antes de la etiqueta de cierre `</body>`:

```html
<script src="JavaScript/animations.js" defer></script>
<script src="JavaScript/scroll.js" defer></script>
<script src="JavaScript/main.js" defer></script>
```
