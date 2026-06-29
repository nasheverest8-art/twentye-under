const images = [
    "images/image1.png",
    "images/image2.png",
    "images/image3.png",
    "images/image4.png"
];

const track = document.querySelector(".carousel-track");
const dotsContainer = document.querySelector(".dots");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const fullscreenBtn = document.querySelector(".fullscreen-btn");

const modal = document.querySelector(".fullscreen-modal");
const fsImage = document.querySelector(".fs-image");

const fsPrev = document.querySelector(".fs-prev");
const fsNext = document.querySelector(".fs-next");
const fsClose = document.querySelector(".fs-close");

let currentIndex = 0;


/* Create slides */

images.forEach((src, index) => {

    const slide = document.createElement("div");
    slide.className = "slide";

    slide.innerHTML = `<img src="${src}" alt="">`;

    track.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "dot";

    dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");


function updateCarousel() {

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");

    fsImage.src = images[currentIndex];
}


function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex =
        (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}


nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

fullscreenBtn.addEventListener("click", () => {
    modal.classList.add("open");
    fsImage.src = images[currentIndex];
});

fsClose.addEventListener("click", () => {
    modal.classList.remove("open");
});

fsNext.addEventListener("click", nextSlide);
fsPrev.addEventListener("click", prevSlide);


/* Keyboard controls */

document.addEventListener("keydown", e => {

    if (modal.classList.contains("open")) {

        if (e.key === "ArrowRight")
            nextSlide();

        if (e.key === "ArrowLeft")
            prevSlide();

        if (e.key === "Escape")
            modal.classList.remove("open");
    }
});

updateCarousel();
