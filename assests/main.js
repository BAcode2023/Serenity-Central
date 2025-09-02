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

function showCheckoutWindow(e) {
    e.preventDefault();

    const url = document.getElementById('embedded-checkout-modal-checkout-button').getAttribute('data-url');
    const title = 'Square Payment Links';

    // Some platforms embed in an iframe, so we want to top window to calculate sizes correctly
    const topWindow = window.top ? window.top : window;

    // Fixes dual-screen position                                Most browsers          Firefox
    const dualScreenLeft = topWindow.screenLeft !==  undefined ? topWindow.screenLeft : topWindow.screenX;
    const dualScreenTop = topWindow.screenTop !==  undefined   ? topWindow.screenTop  : topWindow.screenY;

    const width = topWindow.innerWidth ? topWindow.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = topWindow.innerHeight ? topWindow.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const h = height * .75;
    const w = 500;

    const systemZoom = width / topWindow.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(url, title, `scrollbars=yes, width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`);

    if (window.focus) newWindow.focus();
  }

  // This overrides the default checkout button click handler to show the embed modal
  // instead of opening a new tab with the given link url
  document.getElementById('embedded-checkout-modal-checkout-button').addEventListener('click', function (e) {
    showCheckoutWindow(e);
  });

