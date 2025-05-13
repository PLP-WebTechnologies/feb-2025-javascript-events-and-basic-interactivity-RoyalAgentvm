// JavaScript Event Handling & Interactive Elements
// This script implements various event handlers and interactive features

/*
 * SECTION 1: EVENT HANDLING
 * Includes: button clicks, hover effects, keypress detection, and secret actions
 */

// Key Detection Event
document.addEventListener('keydown', function(event) {
    const keyDisplay = document.getElementById('key-display');
    keyDisplay.textContent = `Key pressed: ${event.key} (Code: ${event.code})`;
    keyDisplay.classList.add('bounce');
    
    // Remove the bounce animation after it completes
    setTimeout(() => {
        keyDisplay.classList.remove('bounce');
    }, 500);
});

// Color-Changing Button
const colorButton = document.getElementById('color-change-btn');
const colors = ['#4a6cf7', '#f7734a', '#4af7a1', '#f74acd', '#f7d54a', '#4af7f7'];
let colorIndex = 0;

colorButton.addEventListener('click', function() {
    colorIndex = (colorIndex + 1) % colors.length;
    this.style.backgroundColor = colors[colorIndex];
});

// Hover Box - Additional events beyond CSS hover
const hoverBox = document.getElementById('hover-me');

hoverBox.addEventListener('mouseenter', function() {
    this.textContent = "That tickles!";
});

hoverBox.addEventListener('mouseleave', function() {
    this.textContent = "Hover over me!";
    this.style.transform = "scale(1)";
});

// Secret Double-Click Feature
const secretButton = document.getElementById('secret-btn');
let clicks = 0;

secretButton.addEventListener('dblclick', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 
        "Double-click for light mode!" : "Double-click for a surprise!";
});

// Tracking click and showing hint if user clicks once
secretButton.addEventListener('click', function(event) {
    if (event.detail === 1) {  // Check if it's a single click
        clicks++;
        if (clicks === 3) {
            this.textContent = "Try double-clicking instead!";
            setTimeout(() => {
                this.textContent = "Double-click for a surprise!";
                clicks = 0;
            }, 2000);
        }
    }
});

/*
 * SECTION 2: INTERACTIVE ELEMENTS
 * Includes: Image gallery/slideshow and tab navigation
 */

// Image Gallery/Slideshow
const galleryImages = [
    {
        color: "#3498db", // Blue for sky/water
        emoji: "🏔️",
        caption: "Beautiful Mountain View"
    },
    {
        color: "#e67e22", // Orange for sunset
        emoji: "🌅",
        caption: "Peaceful Ocean Sunset"
    },
    {
        color: "#2ecc71", // Green for forest
        emoji: "🌳",
        caption: "Lush Green Forest"
    },
    {
        color: "#34495e", // Dark blue for night sky
        emoji: "🌃",
        caption: "Urban Cityscape at Night"
    }
];

let currentImageIndex = 0;
const galleryImg = document.getElementById('gallery-img');
const imageCaption = document.getElementById('image-caption');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Function to update the displayed image
function updateGalleryImage() {
    const currentImage = galleryImages[currentImageIndex];
    
    // Create a visual placeholder instead of using an image URL
    galleryImg.style.backgroundColor = currentImage.color;
    galleryImg.style.display = "flex";
    galleryImg.style.alignItems = "center";
    galleryImg.style.justifyContent = "center";
    galleryImg.style.fontSize = "4rem";
    galleryImg.textContent = currentImage.emoji;
    
    imageCaption.textContent = currentImage.caption;
    
    // Add a small animation
    galleryImg.style.transform = 'scale(0.95)';
    setTimeout(() => {
        galleryImg.style.transform = 'scale(1)';
    }, 200);
}

prevBtn.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
});

nextBtn.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGalleryImage();
});

// Initialize the gallery with the first image
updateGalleryImage();

// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current button
        this.classList.add('active');
        
        // Show the corresponding tab pane
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

/*
 * SECTION 3: FORM VALIDATION
 * Includes: Required fields, email validation, password rules, and real-time feedback
 */

const form = document.getElementById('validation-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const submitBtn = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const passwordStrengthMeter = document.getElementById('password-strength-meter');
const passwordStrengthText = document.getElementById('password-strength-text');

// Form Submission Handler
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate all fields before submission
    let isValid = true;
    
    // Username validation
    if (!usernameInput.value.trim()) {
        usernameError.textContent = "Username is required";
        isValid = false;
    } else {
        usernameError.textContent = "";
    }
    
    // Email validation
    if (!validateEmail(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
    } else {
        emailError.textContent = "";
    }
    
    // Password validation
    if (!validatePassword(passwordInput.value)) {
        passwordError.textContent = "Password must be at least 8 characters with letters and numbers";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }
    
    // Confirm password validation
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        isValid = false;
    } else {
        confirmPasswordError.textContent = "";
    }
    
    // If valid, show success message
    if (isValid) {
        formSuccess.classList.remove('hidden');
        form.reset();
        passwordStrengthMeter.style.width = "0";
        passwordStrengthMeter.style.backgroundColor = "#ddd";
        passwordStrengthText.textContent = "Password strength";
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 3000);
    }
});

// Real-time validation and feedback

// Username validation
usernameInput.addEventListener('input', function() {
    if (!this.value.trim()) {
        usernameError.textContent = "Username is required";
    } else {
        usernameError.textContent = "";
    }
});

// Email validation
emailInput.addEventListener('input', function() {
    if (this.value && !validateEmail(this.value)) {
        emailError.textContent = "Please enter a valid email address";
    } else {
        emailError.textContent = "";
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Password validation with strength meter
passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    // Update strength meter
    const strength = checkPasswordStrength(password);
    updatePasswordStrengthMeter(strength);
    
    // Show validation error if needed
    if (password && !validatePassword(password)) {
        passwordError.textContent = "Password must be at least 8 characters with letters and numbers";
    } else {
        passwordError.textContent = "";
    }
    
    // Update confirm password validation
    if (confirmPasswordInput.value && password !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match";
    } else {
        confirmPasswordError.textContent = "";
    }
});

// Password validation function
function validatePassword(password) {
    // At least 8 characters with letters and numbers
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

// Check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Complexity checks
    if (/[a-z]/.test(password)) strength += 1; // lowercase
    if (/[A-Z]/.test(password)) strength += 1; // uppercase
    if (/[0-9]/.test(password)) strength += 1; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1; // special characters
    
    return strength;
}

// Update password strength meter
function updatePasswordStrengthMeter(strength) {
    let width = 0;
    let color = "";
    let text = "";
    
    switch(strength) {
        case 0:
            width = "0%";
            color = "#ddd";
            text = "Too short";
            break;
        case 1:
        case 2:
            width = "25%";
            color = "#e74c3c"; // Red
            text = "Weak";
            break;
        case 3:
        case 4:
            width = "50%";
            color = "#f39c12"; // Orange
            text = "Moderate";
            break;
        case 5:
            width = "75%";
            color = "#3498db"; // Blue
            text = "Strong";
            break;
        case 6:
            width = "100%";
            color = "#27ae60"; // Green
            text = "Very Strong";
            break;
    }
    
    passwordStrengthMeter.style.width = width;
    passwordStrengthMeter.style.backgroundColor = color;
    passwordStrengthText.textContent = text || "Password strength";
}

// Confirm password validation
confirmPasswordInput.addEventListener('input', function() {
    if (this.value && this.value !== passwordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match";
    } else {
        confirmPasswordError.textContent = "";
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log("Interactive Playground loaded and ready!");
});