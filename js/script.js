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