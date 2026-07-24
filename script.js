// ==========================
// SELECT ELEMENTS
// ==========================

const cards = document.querySelectorAll(".card");
const images = document.querySelectorAll(".card img");

// IMPORTANT : on exclut City du groupe des boutons
const filterButtons = document.querySelectorAll(".buttons > button:not(#cityBtn)");

const cityBtn = document.getElementById("cityBtn");
const cityMenu = document.querySelector(".city-menu");
const cityButtons = document.querySelectorAll(".city-menu button");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const scrollTopBtn = document.getElementById("scrollTopBtn");

let currentIndex = 0;
let visibleImages = [];

// ==========================
// UPDATE VISIBLE IMAGES
// ==========================

function updateVisibleImages() {

    visibleImages = [];

    cards.forEach(card => {

        if (card.style.display !== "none") {

            visibleImages.push(card.querySelector("img"));

        }

    });

}

// ==========================
// FILTER BUTTONS
// ==========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        cityBtn.classList.remove("active");

        cityBtn.innerHTML =
            'City <i class="fa-solid fa-chevron-down"></i>';

        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (filter === "all") {

                card.style.display = "block";

            }

            else if (card.classList.contains(filter)) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

        updateVisibleImages();

    });

});

// ==========================
// CITY DROPDOWN
// ==========================

cityBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    cityMenu.classList.toggle("show");

    // rendre le bouton City actif
    filterButtons.forEach(btn => btn.classList.remove("active"));
    cityBtn.classList.add("active");

    // afficher toutes les villes
    cards.forEach(card => {

        if(card.classList.contains("city")){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

    updateVisibleImages();

});

document.addEventListener("click", () => {

    cityMenu.classList.remove("show");

});

// ==========================
// CITY FILTER
// ==========================

cityButtons.forEach(button => {

    button.addEventListener("click", () => {

        const city = button.dataset.filter;

        cards.forEach(card => {

            if (card.classList.contains(city)) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

        filterButtons.forEach(btn => btn.classList.remove("active"));

        cityBtn.classList.add("active");

        cityBtn.innerHTML =
            button.textContent +
            ' <i class="fa-solid fa-chevron-down"></i>';

        cityMenu.classList.remove("show");

        updateVisibleImages();

    });

});
// ==========================
// UPDATE BUTTONS
// ==========================

function updateButtons() {

    if (currentIndex <= 0) {

        prevBtn.style.display = "none";

    } else {

        prevBtn.style.display = "flex";

    }

    if (currentIndex >= visibleImages.length - 1) {

        nextBtn.style.display = "none";

    } else {

        nextBtn.style.display = "flex";

    }

}

// ==========================
// OPEN LIGHTBOX
// ==========================

images.forEach(img => {

    img.addEventListener("click", () => {

        updateVisibleImages();

        currentIndex = visibleImages.indexOf(img);

        lightbox.classList.add("active");

        lightboxImg.src = img.src;

        updateButtons();

    });

});

// ==========================
// CLOSE LIGHTBOX
// ==========================

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});

// ==========================
// NEXT IMAGE
// ==========================

function nextImage() {

    if (currentIndex >= visibleImages.length - 1) return;

    currentIndex++;

    lightboxImg.src = visibleImages[currentIndex].src;

    updateButtons();

}

nextBtn.addEventListener("click", nextImage);

// ==========================
// PREVIOUS IMAGE
// ==========================

function previousImage() {

    if (currentIndex <= 0) return;

    currentIndex--;

    lightboxImg.src = visibleImages[currentIndex].src;

    updateButtons();

}

prevBtn.addEventListener("click", previousImage);
// ==========================
// KEYBOARD
// ==========================

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;

    switch (e.key) {

        case "ArrowRight":
            nextImage();
            break;

        case "ArrowLeft":
            previousImage();
            break;

        case "Escape":
            lightbox.classList.remove("active");
            break;

    }

});

// ==========================
// SCROLL TO TOP
// ==========================

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

// ==========================
// INITIALIZATION
// ==========================

// Au chargement de la page,
// toutes les images sont visibles.

cards.forEach(card => {

    card.style.display = "block";

});

updateVisibleImages();