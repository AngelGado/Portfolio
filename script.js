// Current year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// Certificate image modal
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".certificate-frame img").forEach(img => {
    img.addEventListener("click", () => {
        modalImage.src = img.src;
        imageModal.hidden = false;
        document.body.style.overflow = "hidden";
    });
});

// Close image modal
function closeModal() {
    imageModal.hidden = true;
    modalImage.src = "";
    document.body.style.overflow = "";
}

if (modalClose && imageModal) {
    modalClose.addEventListener("click", closeModal);

    imageModal.addEventListener("click", event => {
        if (event.target === imageModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !imageModal.hidden) {
            closeModal();
        }
    });
}

// Highlight active navigation link
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const isActive =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            }
        });
    }, {
        rootMargin: "-20% 0px -65% 0px"
    });

    sections.forEach(section => observer.observe(section));
}

console.log("My Portfolio Website is running!");