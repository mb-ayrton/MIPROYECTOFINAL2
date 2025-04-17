// Seleccionar el contenedor de la galería y las imágenes
const gallery = document.querySelector('.galeria-dinamica');
const images = gallery.querySelectorAll('img');

// Índice de la imagen actual
let currentIndex = 0;

// Función para mostrar la imagen actual y ocultar las demás
function showImage(index) {
  images.forEach((img, i) => {
    img.style.display = i === index ? 'block' : 'none';
  });
}

// Navegar a la siguiente imagen
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length; // Bucle circular
  showImage(currentIndex);
}

// Intervalo para cambiar las imágenes automáticamente
setInterval(nextImage, 3000); // Cambia cada 3 segundos

// Mostrar la primera imagen al cargar la página
showImage(currentIndex);

// Opcional: Controles manuales (Anterior y Siguiente)
const controls = document.createElement('div');
controls.classList.add('controls');

const prevButton = document.createElement('button');
prevButton.textContent = 'Anterior';
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

const nextButton = document.createElement('button');
nextButton.textContent = 'Siguiente';
nextButton.addEventListener('click', nextImage);

controls.appendChild(prevButton);
controls.appendChild(nextButton);
gallery.after(controls);
        // Cargar la barra de navegación
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('header').innerHTML = data;
                highlightActiveLink();
            });

        function highlightActiveLink() {
            const currentLocation = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                if (link.href.includes(currentLocation)) {
                    link.classList.add('active');
                }
            });
        }