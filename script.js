document.addEventListener('DOMContentLoaded', () => {
    
    // --- CUSTOM CURSOR ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const interactives = document.querySelectorAll('.interactive-el, a, button, input, textarea, .accordion-header, .dev-card');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add slight delay to outline for smooth trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });
    
    // --- SPLIT-FLAP BOARD ANIMATION ---
    const flapChars = document.querySelectorAll('.flap-char');
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*";
    
    flapChars.forEach((char, index) => {
        const targetLetter = char.getAttribute('data-target');
        let iterations = 0;
        
        // Cascading stop: left letters stop first, right letters spin longer
        const maxIterations = 15 + (index * 4); 
        
        const spinInterval = setInterval(() => {
            // Pick a random character
            const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
            char.innerHTML = `<span class="flap-letter">${randomChar}</span>`;
            iterations++;
            
            // Stop on the target letter
            if (iterations >= maxIterations) {
                clearInterval(spinInterval);
                char.innerHTML = `<span class="flap-letter">${targetLetter}</span>`;
            }
        }, 50); // 50ms = 20 frames per second for a fast flicker
    });

    // Cursor Hover States
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--sienna)'; // Maps to retro-orange
            cursorDot.style.backgroundColor = 'var(--gold)'; // Maps to retro-mustard
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--espresso)'; // Maps to text-brown
            cursorDot.style.backgroundColor = 'var(--sienna)'; // Maps to retro-orange
        });
    });

    // --- HEADER SCROLL EFFECT ---
    const header = document.getElementById('mainNav');
    const heroSection = document.getElementById('hero');

    window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

});

    // --- ACCORDION LOGIC ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Close others
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current
            item.classList.toggle('active');
        });
    });

    // Open the first accordion by default
    if(document.querySelector('.accordion-item')) {
        document.querySelector('.accordion-item').classList.add('active');
    }

    // --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- SKILL BAR ANIMATION ---
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                setTimeout(() => {
                    fill.style.width = fill.dataset.width;
                }, [...document.querySelectorAll(".skill-fill")].indexOf(fill) * 200);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll(".skill-fill").forEach(bar => skillObserver.observe(bar));

    // --- EDUCATION TILT CARD ---
    const tiltCard = document.getElementById("tiltCard");
    if (tiltCard) {
        tiltCard.addEventListener("mousemove", (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 12;
            const rotateX = ((y / rect.height) - 0.5) * -12;
            tiltCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        tiltCard.addEventListener("mouseleave", () => {
            tiltCard.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
        });
    }
});