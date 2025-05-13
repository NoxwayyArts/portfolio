let darkMode = false;

function changeDarkMode() {
  if (darkMode) {
    darkMode = false;
    document.documentElement.style.setProperty("--text-color", "black");
    document.documentElement.style.setProperty("--background-color", "#efe7e5");
    document.getElementById("dark-light-mode").innerHTML = "Dark mode";
  } else {
    darkMode = true;
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty("--background-color", "black");
    document.getElementById("dark-light-mode").innerHTML = "Light mode";
  }
}


// Carousel and Arrows
const carousel = document.querySelector('.carousel-container');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// Scroll Step (One card width + gap)
const cardWidth = 170; // Adjust this based on card size + gap

// Left Arrow Click
leftArrow.addEventListener('click', () => {
    carousel.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
    });
});

// Right Arrow Click
rightArrow.addEventListener('click', () => {
    carousel.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
    });
});

// Dragging Feature
let isDragging = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});

// Fonction pour vérifier si un élément est dans la fenêtre de vue
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Ajouter la classe 'visible' aux éléments visibles dans la fenêtre
function checkTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        if (isElementInView(item)) {
            item.classList.add('visible');
        }
    });
}

// Écouter l'événement de défilement et vérifier les éléments visibles
window.addEventListener('scroll', checkTimelineItems);

// Appeler la fonction initialement pour vérifier les éléments visibles dès le chargement
document.addEventListener('DOMContentLoaded', checkTimelineItems);


