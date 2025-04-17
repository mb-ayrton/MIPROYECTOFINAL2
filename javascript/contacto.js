document.addEventListener("DOMContentLoaded", () => {
    // Inicializar el mapa con las coordenadas de MasterD
    // Usando las coordenadas de tu iframe: cerca de 40.440995, -3.697715
    const masterDLat = 40.440995;
    const masterDLng = -3.697715;
    const map = L.map('map').setView([masterDLat, masterDLng], 15);

    // Añadir la capa del mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Añadir marcador para MasterD
    const masterDMarker = L.marker([masterDLat, masterDLng]).addTo(map)
        .bindPopup("MasterD Madrid")
        .openPopup();

    // Obtener ubicación del usuario
    function getLocationAndCalculateDistance() {
        if (!navigator.geolocation) {
            document.getElementById("distance-info").innerText = "Tu navegador no soporta geolocalización.";
            return;
        }

        navigator.geolocation.getCurrentPosition(position => {
            let userLat = position.coords.latitude;
            let userLng = position.coords.longitude;

            // Añadir marcador para la ubicación del usuario
            const userMarker = L.marker([userLat, userLng]).addTo(map)
                .bindPopup("Tu ubicación")
                .openPopup();

            // Calcular distancia
            const distance = calculateDistance(userLat, userLng, masterDLat, masterDLng);
            document.getElementById("distance-info").innerHTML = `<strong>Distancia aproximada:</strong> ${distance.toFixed(2)} km`;

            // Dibujar ruta entre los dos puntos
            const route = L.polyline([
                [userLat, userLng],
                [masterDLat, masterDLng]
            ], {
                color: 'red',
                dashArray: '10 10',
                weight: 3
            }).addTo(map);

            // Ajustar el mapa para que se vean ambos marcadores
            map.fitBounds(route.getBounds(), { padding: [50, 50] });

        }, error => {
            console.error("Error de geolocalización:", error);
            document.getElementById("distance-info").innerText = "No se pudo obtener tu ubicación.";
        });
    }

    // Función para calcular la distancia (fórmula de Haversine)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    // Iniciar la obtención de ubicación
    getLocationAndCalculateDistance();
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