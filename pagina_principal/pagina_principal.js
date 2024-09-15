// pagina_principal.js
document.addEventListener('DOMContentLoaded', function() {
    // Animar el contenido al pasar el mouse sobre los elementos del menú
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.color = '#ffc107'; // Cambia el color al pasar el mouse
        });

        link.addEventListener('mouseout', function() {
            this.style.color = '#28a745'; // Vuelve al color original
        });

        // Añadimos redirección al hacer clic en el menú
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita la acción por defecto
            window.location.href = this.href; // Redirige a la página vinculada
        });
    });

    // Funcionalidad para el botón de cerrar sesión
    document.getElementById('logout').addEventListener('click', function() {
        // Limpiar el almacenamiento local al cerrar sesión
        localStorage.removeItem('user');
    });

    // Funcionalidad para los controles del carrusel
    const carouselImages = document.querySelector('.carousel-images');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
        const slides = carouselImages.children;
        const totalSlides = slides.length;
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    prevButton.addEventListener('click', function() {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', function() {
        showSlide(currentIndex + 1);
    });

    // Inicializar el carrusel
    showSlide(currentIndex);
});
