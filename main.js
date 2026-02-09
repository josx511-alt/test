import { initTextAnimations } from './text-animation.js';

// 1. Configurar Reveal.js de forma directa
Reveal.initialize({
    hash: true,
    mouseWheel: true,
    transition: 'slide',
    controls: true,
    progress: true,
    center: true,
    autoAnimate: true,
    transitionSpeed: 'slow',
    backgroundTransition: 'fade',
});

// 2. Ejecutar animación en la primera slide al cargar
Reveal.on('ready', (event) => {
    initTextAnimations(event.currentSlide);
});

// 3. Ejecutar animaciones al cambiar de slide
Reveal.on('slidechanged', (event) => {
    const currentSlide = event.currentSlide;
    
    if (!currentSlide.hasAttribute('data-auto-animate')) {
        // Matar animaciones previas para evitar solapamientos
        gsap.killTweensOf(currentSlide.querySelectorAll('*'));
        
        // Iniciar animaciones de la nueva slide
        initTextAnimations(currentSlide);
    }
});