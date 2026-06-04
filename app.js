/* ==========================================================================
   CANVAS STARFIELD BACKGROUND
   ========================================================================== */
const canvas = document.getElementById('starfield-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const starColors = ['#F8F6F1', '#BBA6E6', '#D4AF37']; // Cream, Lavender, Soft Gold
const numStars = 60;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

class Star {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Random starting height
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.size = Math.random() * 1.8 + 0.5;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.color = starColors[Math.floor(Math.random() * starColors.length)];
        this.opacity = Math.random() * 0.7 + 0.2;
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Twinkle effect (fade in and out)
        this.opacity += this.twinkleSpeed * this.twinkleDir;
        if (this.opacity >= 0.9) {
            this.twinkleDir = -1;
        } else if (this.opacity <= 0.2) {
            this.twinkleDir = 1;
        }

        // Reset star if it drifts off the screen
        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

// Event Listeners for Starfield
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
requestAnimationFrame(animateStars);


/* ==========================================================================
   MOBILE NAV TOGGLE
   ========================================================================== */
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


/* ==========================================================================
   SCROLL REVEAL (FADE-IN ANIMATION)
   ========================================================================== */
const scrollFadeElems = document.querySelectorAll('.scroll-fade');

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once it's shown
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

scrollFadeElems.forEach(elem => {
    scrollObserver.observe(elem);
});


/* ==========================================================================
   INTERACTIVE CAMPFIRE STORIES
   ========================================================================== */
const campfireStories = {
    nova: {
        quote: "Under the starlit sky, I find my greatest inspirations. The sparks from the fire look like little stars dancing with us. I keep my notebook close, hoping to capture this magical feeling forever.",
        author: "Nova, Creative Dreamer"
    },
    jade: {
        quote: "Every trail leads to a new story, but my favorite moments are right here, sharing the warmth of the fire with friends. It's the laughter we share that makes the journey truly unforgettable.",
        author: "Jade, Adventure Seeker"
    },
    zara: {
        quote: "Fashion isn't just about what you wear; it's about how you express your soul. Around the campfire, our stories are like threads weaving a beautiful tapestry of friendship.",
        author: "Zara, Fashion Enthusiast"
    },
    luna: {
        quote: "Music is the language of the night. When I strum my guitar and we all sing along, I feel like our dreams are floating up to the heavens, carried by the smoke.",
        author: "Luna, Music Lover"
    }
};

function selectCampfireGirl(girlId) {
    // Update active state in selector buttons
    const buttons = document.querySelectorAll('.girl-selector');
    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase() === girlId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Quote Display with smooth transition
    const quoteDisplay = document.getElementById('campfire-quote');
    const authorDisplay = document.getElementById('campfire-quote-author');
    
    quoteDisplay.style.opacity = 0;
    authorDisplay.style.opacity = 0;

    setTimeout(() => {
        quoteDisplay.innerText = campfireStories[girlId].quote;
        authorDisplay.innerHTML = `&mdash; ${campfireStories[girlId].author}`;
        quoteDisplay.style.opacity = 1;
        authorDisplay.style.opacity = 1;
    }, 250);
}

// Attach styling to handle quote transitions
document.getElementById('campfire-quote').style.transition = 'opacity 0.25s ease';
document.getElementById('campfire-quote-author').style.transition = 'opacity 0.25s ease';


/* ==========================================================================
   CHARACTER DETAILS MODAL POPUP
   ========================================================================== */
const characterData = {
    nova: {
        name: "Nova",
        tag: "Creative Dreamer",
        hobby: "Journaling & Stargazing",
        img: "assets/nova_purple.jpg",
        story: "Nova is a dreamer at heart, often found looking up at the night sky or scribbling in her journal. She believes that the universe is a canvas waiting for us to paint our thoughts on. Her drawings are full of stars, moons, and magical landscapes. She was the first Classy Girl created by Aliyah, representing the spark of pure imagination that started this entire collection."
    },
    jade: {
        name: "Jade",
        tag: "Adventure Seeker",
        hobby: "Exploring Hidden Trails",
        img: "assets/jade_blue.jpg",
        story: "Jade is a force of nature, always seeking adventure. Whether she is climbing a mountain path or exploring a hidden clearing, she brings her sketchbook and paints to capture the raw beauty of the wilderness. She believes that nature has its own pulse, and she seeks to synchronize her artwork with the earth's natural rhythm."
    },
    zara: {
        name: "Zara",
        tag: "Fashion Enthusiast",
        hobby: "Outfit Styling",
        img: "assets/zara_teal.jpg",
        story: "Zara is a fashion enthusiast who sees clothing as a form of visual poetry. She spends hours styling outfits, blending vintage aesthetics with futuristic ideas. For Zara, design is about confidence and self-expression. She wants to inspire everyone she meets to embrace their unique style without fear or compromise."
    },
    luna: {
        name: "Luna",
        tag: "Music Lover",
        hobby: "Playing Guitar",
        img: "assets/luna_red.jpg",
        story: "Luna is a talented musician whose life is set to a beautiful melody. With her trusty acoustic guitar, she has a song for every emotion and every memory. Around the campfire, she leads the music circle, filling the starry night with soft, soulful chords. She dreams of writing songs that will travel across the globe and touch people's hearts."
    }
};

const charModal = document.getElementById('character-modal');

function openCharacterModal(charId) {
    const char = characterData[charId];
    if (!char) return;

    document.getElementById('modal-char-name').innerText = char.name;
    document.getElementById('modal-char-tag').innerText = char.tag;
    document.getElementById('modal-char-hobby').innerText = char.hobby;
    document.getElementById('modal-char-story').innerText = char.story;
    
    const imgElem = document.getElementById('modal-char-img');
    imgElem.style.filter = ''; // Reset filter
    imgElem.src = char.img;

    charModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeCharacterModal() {
    charModal.style.opacity = 0;
    setTimeout(() => {
        charModal.style.display = 'none';
        charModal.style.opacity = 1;
        document.body.style.overflow = '';
    }, 250);
}


/* ==========================================================================
   PORTFOLIO MASONRY GALLERY FILTER & LIGHTBOX
   ========================================================================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Mapped array of elements inside the gallery grid for lightbox traversal
let filteredItems = Array.from(galleryItems);
let currentLightboxIndex = 0;

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // Filter items
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Update filtered list for lightbox slider controls
        filteredItems = Array.from(galleryItems).filter(item => {
            return filterValue === 'all' || item.classList.contains(filterValue);
        });
    });
});

// Lightbox Modal Controls
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');

function openLightbox(originalIndex) {
    const clickedItem = galleryItems[originalIndex];
    currentLightboxIndex = filteredItems.indexOf(clickedItem);

    if (currentLightboxIndex === -1) {
        currentLightboxIndex = 0;
    }

    updateLightboxContent();
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function updateLightboxContent() {
    const currentItem = filteredItems[currentLightboxIndex];
    if (!currentItem) return;

    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-item-title').innerText;
    const category = currentItem.querySelector('.gallery-item-category').innerText;

    lightboxImg.style.filter = img.style.filter; // Match placeholder colors
    lightboxImg.src = img.src;
    lightboxTitle.innerText = title;
    lightboxCategory.innerText = category;
}

function changeLightboxItem(direction) {
    currentLightboxIndex += direction;
    
    // Loop navigation boundaries
    if (currentLightboxIndex >= filteredItems.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = filteredItems.length - 1;
    }
    
    updateLightboxContent();
}

function closeLightbox() {
    lightboxModal.style.opacity = 0;
    setTimeout(() => {
        lightboxModal.style.display = 'none';
        lightboxModal.style.opacity = 1;
        document.body.style.overflow = '';
    }, 250);
}

// Lightbox Keybinds (Arrows & Escape)
window.addEventListener('keydown', (e) => {
    if (lightboxModal.style.display === 'flex') {
        if (e.key === 'ArrowRight') {
            changeLightboxItem(1);
        } else if (e.key === 'ArrowLeft') {
            changeLightboxItem(-1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
    if (charModal.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeCharacterModal();
        }
    }
});


/* ==========================================================================
   FAQ ACCORDION SLIDE TOGGLE
   ========================================================================== */
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Close all other active items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Toggle clicked item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});


/* ==========================================================================
   NEWSLETTER DUMMY SUBMIT SYSTEM
   ========================================================================== */
function handleSubscribe() {
    const form = document.getElementById('newsletter-form');
    const input = form.querySelector('input');
    const message = document.getElementById('subscribe-message');
    const btn = form.querySelector('.btn-subscribe');

    if (!input.value) return;

    btn.disabled = true;
    btn.innerText = 'Subscribing...';

    // Simulate API request delay
    setTimeout(() => {
        btn.disabled = false;
        btn.innerText = 'Subscribe';
        message.className = 'subscribe-message success';
        message.innerHTML = `<i class="fa-solid fa-circle-check"></i> Welcome to the club! You've successfully subscribed.`;
        input.value = '';
        
        // Clear message after 5 seconds
        setTimeout(() => {
            message.style.opacity = 0;
            setTimeout(() => {
                message.innerHTML = '';
                message.className = 'subscribe-message';
                message.style.opacity = 1;
            }, 300);
        }, 5000);
    }, 1500);
}
