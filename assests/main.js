document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
        const items = carousel.querySelectorAll(".carousel-item");
        const totalItems = items.length;
        let currentIndex = 0;

        // Create control buttons
        const prevButton = document.createElement("button");
        prevButton.classList.add("carousel-button");
        prevButton.innerHTML = "&#8249;";
        prevButton.addEventListener("click", () => navigateCarousel(-1));

        const nextButton = document.createElement("button");
        nextButton.classList.add("carousel-button");
        nextButton.innerHTML = "&#8250;";
        nextButton.addEventListener("click", () => navigateCarousel(1));

        // Add controls to carousel
        const controls = document.createElement("div");
        controls.classList.add("carousel-controls");
        controls.appendChild(prevButton);
        controls.appendChild(nextButton);
        carousel.appendChild(controls);

        // Initialize carousel
        function initializeCarousel() {
            items.forEach((item, index) => {
                item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
            });
        }

        // Navigate carousel
        function navigateCarousel(direction) {
            currentIndex = (currentIndex + direction + totalItems) % totalItems;
            initializeCarousel();
        }

        // Set initial positions
        initializeCarousel();
    });
});
