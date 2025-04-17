// Cargar noticias desde el archivo JSON
fetch('./data/noticias.json')
  .then(response => response.json())
  .then(data => {
    const noticiasContainer = document.getElementById('cargarNoticias');
    data.forEach(noticia => {
      // Crear un contenedor para cada noticia
      const noticiaDiv = document.createElement('div');
      noticiaDiv.classList.add('noticia');
      
      // Crear el contenido de la noticia
      noticiaDiv.innerHTML = `
        <h3>${noticia.titulo}</h3>
        <p class="fecha">${noticia.fecha}</p>
        <img src="${noticia.imagen}" alt="${noticia.titulo}" class="imagen-noticia"/>
        <p>${noticia.contenido}</p>
      `;
      
      // Agregar la noticia al contenedor de noticias
      noticiasContainer.appendChild(noticiaDiv);
    });
  })
  .catch(error => {
    console.error('Error cargando las noticias:', error);
  });
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