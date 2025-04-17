//FORMULARIO//
document.addEventListener("DOMContentLoaded", function () {
  const productoSelect = document.getElementById("producto");
  const plazoInput = document.getElementById("plazo");
  const envioRapidoCheckbox = document.getElementById("envioRapido");
  const envolturaRegaloCheckbox = document.getElementById("envolturaRegalo");
  const totalSpan = document.getElementById("total");

  function actualizarTotal() {
    let total = parseInt(productoSelect.value);
    const plazo = parseInt(plazoInput.value) || 0;

    if (plazo > 30) {
      total *= 0.9; // Descuento del 10% por entrega en más de 30 días
    }

    if (envioRapidoCheckbox.checked) {
      total += parseInt(envioRapidoCheckbox.value);
    }

    if (envolturaRegaloCheckbox.checked) {
      total += parseInt(envolturaRegaloCheckbox.value);
    }

    totalSpan.textContent = `$${total.toFixed(2)}`;
  }

  productoSelect.addEventListener("change", actualizarTotal);
  plazoInput.addEventListener("input", actualizarTotal);
  envioRapidoCheckbox.addEventListener("change", actualizarTotal);
  envolturaRegaloCheckbox.addEventListener("change", actualizarTotal);
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