const gsap = window.gsap;

export function splitText(element) {
    if (!element) return;
    if (element.classList.contains("is-split")) return;

    const text = element.textContent || element.dataset.text || "";
    element.textContent = "";
    element.classList.add("is-split");

    [...text].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        element.appendChild(span);
    });
}

export function initTextAnimations(slide) {
    gsap.ticker.lagSmoothing(1000, 16);
    if (!slide) return;
    if (slide.hasAttribute('data-auto-animate')) return; 
    
    slide.classList.add('animating');

    const mainHeadings = slide.querySelectorAll("h1, h2, h3:not(.aspect-card h3)");
    const mainParagraphs = slide.querySelectorAll("p:not(.aspect-card p)");
    const image = slide.querySelector(".cartoon-img");

    mainHeadings.forEach(element => {
        if (element.dataset.text) {
            element.textContent = element.dataset.text;
            element.classList.remove("is-split");
            gsap.set(element, { opacity: 1 });
        }
    });

    mainParagraphs.forEach(element => {
        if (element.dataset.text) {
            element.textContent = element.dataset.text;
            gsap.set(element, { opacity: 0 });
        }
    });

    // ANIMACIÓN DE LOS H1, H2
    mainHeadings.forEach(heading => {
        splitText(heading);
        const chars = heading.querySelectorAll("span");
        
        if (chars && chars.length > 0) {
            gsap.set(chars, { 
                y: 100,
                opacity: 0,
            });
            
            gsap.to(chars, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                scale: 1,
                duration: 0.5,
                ease: "expo.out",
                stagger: 0.05,
                delay: 0.3 
            });
        }
    });

    // ANIMACIÓN DE PÁRRAFOS
    mainParagraphs.forEach(paragraph => {
        gsap.to(paragraph, {
            y: 0,
            opacity: 0.9,
            duration: 0.7,
            delay: 0.6, 
            startAt: { y: 30, opacity: 0 }
        });
    });

    // SLIDE NÚMERO 2
    if (slide.getAttribute('data-slide') === '2') {
        const icon = slide.querySelector('.intro-icon');
        const circles = slide.querySelectorAll('.deco-circle');

        gsap.set(circles, { scale: 0, opacity: 0 });
        gsap.set(icon, { scale: 0, opacity: 0 });

        gsap.to(circles, {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.3, 
            delay: 0.1
        });

        gsap.to(icon, {
            scale: 1,
            opacity: 0.6,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 1
        });
    }

    // SLIDE NÚMERO 3
    if (slide.getAttribute('data-slide') === '3') {
        const sideImg = slide.querySelector('.side-img');
        const questions = slide.querySelectorAll('.decor-question');

        gsap.set(sideImg, { opacity: 0, y: 150 });
        gsap.set(questions, { opacity: 0, scale: 0 });

        gsap.to(sideImg, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.8
        });

        questions.forEach((q) => {
            const isLeft = q.classList.contains('left');
            gsap.to(q, {
                opacity: 0.9,
                scale: 1.5,
                x: isLeft ? -50 : 50,
                rotation: isLeft ? -150 : 15,
                duration: 1,
                delay: 1.2,
                ease: "back.out(1.7)"
            });
        });
    }

    // SLIDE NÚMERO 4
    if (slide.getAttribute('data-slide') === '4') {
        const root = slide.querySelector('.root');
        const line = slide.querySelector('.org-line');
        const boxes = slide.querySelectorAll('.org-row .org-box');
        const labels = slide.querySelectorAll('.box-label');

        gsap.set([root, boxes], { scale: 0, opacity: 0 });
        gsap.set(line, { height: 0 });
        gsap.set(labels, { x: -20, opacity: 0 });

        gsap.to(root, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        });

        gsap.to(line, {
            height: 90,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.inOut"
        });

        gsap.to(boxes, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            delay: 0.8,
            ease: "back.out(1.5)"
        });

        gsap.to(labels, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 1.4,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // SLIDE NÚMERO 5
    const isDetails = slide.classList.contains('slide-details');

    if (isDetails) {
        const cards = slide.querySelectorAll(".aspect-card");
        
        const cardElements = slide.querySelectorAll(".aspect-card h3, .aspect-card p");
        gsap.set(cardElements, { opacity: 1, y: 0 });

        gsap.set(cards, { 
            y: 200,        
            opacity: 0,
            rotation: () => Math.random() * 10 - 6,
            scale: 0.9        
        });

        gsap.to(cards, {
            y: 0,             
            opacity: 1,
            rotation: 0,     
            scale: 1,
            duration: 1.1,    
            ease: "back.out(1.3)",
            stagger: 0.2,    
            delay: 0.5
        });
    }

    // SLIDE NÚMERO 6
    if (slide.getAttribute('data-slide') === '6') {
        const progressLine = slide.querySelector('.timeline-progress-h');
        const items = slide.querySelectorAll('.time-item-h');
        const dots = slide.querySelectorAll('.timeline-dot-h');
        const contents = slide.querySelectorAll('.time-content-h');

        gsap.set(progressLine, { width: "0%" });
        gsap.set(dots, { scale: 0, opacity: 0 });
        gsap.set(contents, { y: (i) => (i % 2 === 0 ? -20 : 20), opacity: 0 });

        const tl = gsap.timeline({ delay: 0.5 });

        tl.to(progressLine, {
            width: "100%",
            duration: 2,
            ease: "power2.inOut"
        });

        tl.to(dots, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.3, 
            ease: "back.out(1.7)"
        }, "<0.2"); 

        tl.to(contents, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.3,
            ease: "power2.out"
        }, "<0.4");
    }

    // SLIDE NÚMERO 7
    if (slide.getAttribute('data-slide') === '7') {
        const header = slide.querySelector('.slide-header');
        const balanceContainer = slide.querySelector('.balance-container');
        const positiveSide = slide.querySelector('.balance-positive');
        const negativeSide = slide.querySelector('.balance-negative');
        const divider = slide.querySelector('.balance-divider');
        const listItems = slide.querySelectorAll('.benefits-list li, .challenges-list li');
        
        // Configuración inicial: Movemos las cards hacia abajo (y: 100)
        gsap.set(header, { opacity: 0, y: -30 });
        gsap.set(balanceContainer, { opacity: 1 }); // Lo ponemos en 1 para ver lo de adentro
        gsap.set([positiveSide, negativeSide], { opacity: 0, y: 100 });
        gsap.set(divider, { scale: 0, opacity: 0 });
        gsap.set(listItems, { opacity: 0, x: -10 });
        
        const tl = gsap.timeline();
        
        tl.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .to(divider, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.4")
        // Animación de las cards desde abajo (y: 0)
        .to([positiveSide, negativeSide], {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.3 // Hace que una salga un poco después que la otra
        }, "-=0.6")
        // Efecto extra: las listas aparecen en cascada
        .to(listItems, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out"
        }, "-=0.5");
    }

    // SLIDE NÚMERO 8 Y 9
    if (image) {
        const isRightOrigin = image.classList.contains('right-origin');
        const startX = isRightOrigin ? "-110%" : "110%";

        gsap.fromTo(image, 
            { x: startX, opacity: 0 },
            { x: "0%", opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.9, overwrite: "auto" }
        );
    }

    // SLIDE NÚMERO 13
    if (slide.getAttribute('data-slide') === '13') {
        const cards13 = slide.querySelectorAll('.minimalist-card');
        const title13 = slide.querySelector('.minimalist-title');
        const icons13 = slide.querySelectorAll('.card-icon');
        const texts13 = slide.querySelectorAll('.card-text');

        const tl = gsap.timeline();
        
        tl.fromTo(title13, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
          .fromTo(cards13, { y: 50, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.4")
          .fromTo(icons13, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: "elastic.out(1, 0.5)" }, "-=0.5")
          .fromTo(texts13, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 }, "-=0.4");
    }
}