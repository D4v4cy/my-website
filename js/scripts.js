document.addEventListener('DOMContentLoaded', function() {
    const glitchImages = document.querySelectorAll('.glitch-image');
    glitchImages.forEach(image => {
        image.style.animation = 'glitch-animation 1s infinite';
    });
    
    // Setup for the alternating flickering messages
    const message1 = document.getElementById('message1');
    const message2 = document.getElementById('message2');
    
    // Initially hide both messages
    message1.style.opacity = '0';
    message2.style.opacity = '0';
    
    // Function to show a message with flickering effect
    function showMessage(element, duration) {
        // Reset any existing animations
        element.style.animation = 'none';
        element.offsetHeight; // Force reflow
        
        // Apply flickering animation
        if (element.id === 'message1') {
            element.style.animation = 'error-flicker-animation 0.5s steps(1) infinite, message-fade-in 0.5s forwards';
        } else {
            element.style.animation = 'reality-flicker-animation 0.5s steps(1) infinite, message-fade-in 0.5s forwards';
        }
        
        // Schedule fade out
        setTimeout(() => {
            if (element.id === 'message1') {
                element.style.animation = 'error-flicker-animation 0.5s steps(1) infinite, message-fade-out 0.5s forwards';
            } else {
                element.style.animation = 'reality-flicker-animation 0.5s steps(1) infinite, message-fade-out 0.5s forwards';
            }
        }, duration - 500); // Start fade out 500ms before the next message appears
    }
    
    // Alternating display logic
    function alternateMessages() {
        const displayDuration = 3000; // Each message displays for 3 seconds
        
        // Start with message 1
        showMessage(message1, displayDuration);
        
        // Set up alternating interval
        let showingMessage1 = true;
        
        setInterval(() => {
            if (showingMessage1) {
                showMessage(message2, displayDuration);
            } else {
                showMessage(message1, displayDuration);
            }
            showingMessage1 = !showingMessage1;
        }, displayDuration);
    }
    
    // Start the message alternation
    alternateMessages();
    
    // Random glitch effects to enhance the flickering
    function addRandomGlitches(element) {
        if (Math.random() > 0.7) {
            const randomOffset = Math.floor(Math.random() * 5) - 2;
            const randomSkew = Math.floor(Math.random() * 10) - 5;
            
            element.style.transform = `translateX(${randomOffset}px) skew(${randomSkew}deg)`;
            
            setTimeout(() => {
                element.style.transform = '';
            }, 100);
        }
    }
    
    // Apply random glitches to both messages
    setInterval(() => {
        // Only apply glitches to the currently visible message
        if (parseFloat(window.getComputedStyle(message1).opacity) > 0.5) {
            addRandomGlitches(message1);
        }
        if (parseFloat(window.getComputedStyle(message2).opacity) > 0.5) {
            addRandomGlitches(message2);
        }
    }, 300);
});

// Contact Form Submission
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('responseMessage').innerText = "Your request has been logged. So have you.";
    });
}