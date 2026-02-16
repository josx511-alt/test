import { initTextAnimations } from './text-animation.js';

if (window.location.hash) {
    window.location.hash = '/'; 
}

Reveal.initialize({
    mouseWheel: true,
    transition: 'slide',
    backgroundTransition: 'fade',
    controls: true,
    progress: true,
    center: true,
    autoAnimate: true,
    transitionSpeed: 'slow',
    view: 'separate'
});

const preloader = document.getElementById('preloader');

function removePreloader() {
    if (preloader && !preloader.classList.contains('hide')) {
        setTimeout(() => {
            preloader.classList.add('hide');
            
            Reveal.slide(0, 0);

            setTimeout(() => {
                initTextAnimations(Reveal.getCurrentSlide());
            }, 1000); 
        }, 7000); 
    }
}

Reveal.on('ready', (event) => {
    if (document.readyState === 'complete') {
        removePreloader();
    } else {
        window.addEventListener('load', removePreloader);
    }
});

Reveal.on('slidechanged', (event) => {
    const currentSlide = event.currentSlide;
    
    if (!currentSlide.hasAttribute('data-auto-animate')) {
        gsap.killTweensOf(currentSlide.querySelectorAll('*'));
        initTextAnimations(currentSlide);
    }
});