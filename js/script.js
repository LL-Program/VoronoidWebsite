document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const triggerSection = document.getElementById("feature-section");
    const triggerPoint = triggerSection.offsetTop - navbar.offsetHeight;

    window.addEventListener("scroll", function () {
        if (window.scrollY >= triggerPoint) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
    const cards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.5 });

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        observer.observe(card);
    });
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQoUljf5w7oSHewPep54fuw8gEIWgTV7s",
    authDomain: "chifengine-99dc5.firebaseapp.com",
    databaseURL: "https://chifengine-99dc5-default-rtdb.firebaseio.com",
    projectId: "chifengine-99dc5",
    storageBucket: "chifengine-99dc5.firebasestorage.app",
    messagingSenderId: "839312056400",
    appId: "1:839312056400:web:a42e235c9c6435fcaf7155",
    measurementId: "G-MK8TT6WD0N"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

document.querySelector('.GoogleButton').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            // Get user information
            const user = result.user;
            if (user) {
                // Add user info to Firebase Realtime Database under 'waitlist'
                database.ref('waitlist').push({
                    name: user.displayName,
                    email: user.email,
                    timestamp: Date.now()
                });
                console.log(`Added ${user.displayName} to the waitlist.`);
            }
        })
        .catch((error) => {
            console.error("Error signing in with Google:", error);
        });
});


$('#test-area').mouseout(function () {
    $('#cursor').width(0).height(0).removeClass('show').addClass('hide');
    return false;
});
$('#test-area').mouseenter(function () {
    $('#cursor').width(16).height(16).removeClass('hide').addClass('show');
    return false;
});

$('html').mousemove(function (e) {
    $('#cursor').css('left', e.clientX - 5).css('top', e.clientY + 10);
});
setTimeout(() => {
    document.getElementById("slideButton").classList.add("show");
}, 5000);

// Function to hide the button when clicked
function hideButton() {
    const button = document.getElementById("slideButton");
    button.classList.remove("show");
    button.classList.add("hidden");
}

//OSAKA WIDGET

import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'

const UPDATE = ({ x, y }) => {
    gsap.set(document.documentElement, {
        '--x': gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
        '--y': gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
    })
}

window.addEventListener('mousemove', UPDATE)

const handleOrientation = ({ beta, gamma }) => {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches
    gsap.set(document.documentElement, {
        '--x': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(-45, 45, -1, 1, beta) : gsap.utils.mapRange(-45, 45, -1, 1, gamma)),
        '--y': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(20, 70, 1, -1, Math.abs(gamma)) : gsap.utils.mapRange(20, 70, 1, -1, beta)),
    })
}

const START = () => {
    // if (BUTTON) BUTTON.remove();
    if (
        DeviceOrientationEvent?.requestPermission
    ) {
        Promise.all([
            DeviceOrientationEvent.requestPermission(),
        ]).then((results) => {
            if (results.every((result) => result === "granted")) {
                window.addEventListener("deviceorientation", handleOrientation);
            }
        });
    } else {
        window.addEventListener("deviceorientation", handleOrientation);
    }
};
document.body.addEventListener('click', START, { once: true })
