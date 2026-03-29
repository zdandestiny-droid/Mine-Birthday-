document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const splash = document.getElementById('splash');
    const enterBtn = document.getElementById('enter-btn');
    const mainSite = document.getElementById('main-site');
    const typingWords = document.getElementById('typing-words');

    // Words for typing effect
    const words = [
        "best friend.",
        "safe place.",
        "biggest inspiration.",
        "favorite person.",
        "peace of mind.",
        "greatest adventure.",
        "reason to smile.",
        "home.",
        "dream come true.",
        "answered prayer.",
        "soulmate.",
        "everything."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Typing effect function
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingWords.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingWords.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Enter Site Logic
    enterBtn.addEventListener('click', () => {

        // Fade out splash
        splash.style.opacity = '0';
        splash.style.visibility = 'hidden';

        // Show main site
        setTimeout(() => {
            splash.style.display = 'none';
            mainSite.style.display = 'block';
            
            // Allow display block to render before fading in
            setTimeout(() => {
                mainSite.style.opacity = '1';
                // Start typing effect when site appears
                typeEffect();
            }, 50);
        }, 1000); // Wait for splash fade out
    });

    // Gallery Logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const mediaModal = document.getElementById('media-modal');
    const mediaModalClose = document.querySelector('.media-modal-close');
    const mediaContainer = document.getElementById('media-container');
    const mediaCaption = document.getElementById('media-caption');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const mediaType = item.getAttribute('data-media-type');
            const mediaSrc = item.getAttribute('data-src');
            const caption = item.getAttribute('data-caption');

            mediaContainer.innerHTML = '';
            mediaCaption.textContent = caption;

            if (mediaType === 'image') {
                const img = document.createElement('img');
                img.src = mediaSrc;
                mediaContainer.appendChild(img);
            } else if (mediaType === 'video') {
                if (mediaSrc) {
                    const video = document.createElement('video');
                    video.src = mediaSrc;
                    video.controls = true;
                    video.autoplay = true;
                    mediaContainer.appendChild(video);
                } else {
                    const errorMsg = document.createElement('p');
                    errorMsg.style.color = 'white';
                    errorMsg.style.fontFamily = 'var(--font-body)';
                    errorMsg.style.fontSize = '1.2rem';
                    errorMsg.textContent = 'Awaiting video upload...';
                    mediaContainer.appendChild(errorMsg);
                }
            }

            mediaModal.classList.add('active');
        });
    });

    mediaModalClose.addEventListener('click', () => {
        mediaModal.classList.remove('active');
        // Clear media after transition
        setTimeout(() => mediaContainer.innerHTML = '', 400); 
    });

    // Close modal on click outside
    mediaModal.addEventListener('click', (e) => {
        if (e.target === mediaModal) {
            mediaModal.classList.remove('active');
            setTimeout(() => mediaContainer.innerHTML = '', 400); 
        }
    });

    // ── WISH TYPEWRITER ──────────────────────────────────────────────
    const wishText = document.getElementById('wish-text');
    const wishCursor = document.getElementById('wish-cursor');

    const wishMessage = `Today is not just another birthday. It is the day you step into 18, into a new chapter, a little more grown, a little more powerful, and somehow even more beautiful than the girl I first fell for. I have been watching you become, quietly and in awe, and I want you to know: it has been one of the greatest privileges of my life.

Watching you reach this age feels like watching a sunrise in slow motion. The same you I love, but brighter, bolder, and more ready for everything life is about to offer than you even realize. You are eighteen now, and that means the world is about to open up to you in ways that will take your breath away. I pray you are ready for all of it.

As you cross this line into adulthood, I pray you never lose the softness in your heart or the light in your eyes, even while you chase big dreams and face bigger decisions. I pray this year opens doors you have only ever whispered about in the quiet of the night. I pray it surrounds you with people who protect your peace, celebrate your wins, and love you right, the way you deserve to be loved.

I pray it keeps you close to the One who has been guiding your steps since before you even knew His name. He has carried you this far, and He is not done yet. Every good thing in you is proof of that.

And through all of it, the beautiful parts and the hard parts, the growth and the uncertainty, I want you to know that you do not have to walk any of it alone. I am here. Always. On your team, choosing you over and over, cheering for you louder than anyone in the room, and loving you in every version of who you are becoming.

You are my universe. My calm. My favorite thing about being alive. And I thank God every single day that out of all the places in the world, your path found mine.

Happy 18th birthday, my love. Welcome to the most beautiful era of you yet.`;

    let wishCharIndex = 0;
    let wishStarted = false;

    function typeWish() {
        if (wishCharIndex < wishMessage.length) {
            wishText.textContent += wishMessage[wishCharIndex];
            wishCharIndex++;
            const char = wishMessage[wishCharIndex - 1];
            const delay = char === '\n' ? 150 : (char === '.' || char === '!' || char === '?') ? 120 : 55;
            setTimeout(typeWish, delay);
        } else {
            // Done typing — hide cursor after a moment
            setTimeout(() => {
                if (wishCursor) wishCursor.style.display = 'none';
            }, 2000);
        }
    }

    // Trigger on scroll into view
    const wishSection = document.querySelector('.wish-section');
    const wishObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !wishStarted) {
                wishStarted = true;
                setTimeout(typeWish, 600);
                wishObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    if (wishSection) wishObserver.observe(wishSection);
});
