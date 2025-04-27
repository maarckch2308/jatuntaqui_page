document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const sliderLinks = document.querySelectorAll('.slider-link');
    
    // Variables del slider
    let currentIndex = 0;
    const slideCount = sliderLinks.length;
    let isDragging = false;
    let startX = 0;
    let endX = 0;
    let sliderInterval;
    let moved = false; // Para saber si hubo movimiento real
    const DRAG_THRESHOLD = 50; // Mínimo 50px para considerar un arrastre real

    // Inicializar el slider
    function initSlider() {
        updateSliderPosition();
        startAutoSlide();
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        // Clic en slider links
        sliderLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const distance = Math.abs(endX - startX);

                if (distance > 20) {
                    e.preventDefault(); // Si el movimiento fue grande, cancelar navegación
                    return;
                }

                // Mostrar loading overlay
                loadingOverlay.style.display = 'flex';

                // Simular carga antes de redirigir
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 800);
            });
        });
    }

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startAutoSlide() {
        sliderInterval = setInterval(() => {
            nextSlide();
        }, 7000);
    }

    function resetAutoSlide() {
        clearInterval(sliderInterval);
        startAutoSlide();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
        resetAutoSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex === 0) ? slideCount - 1 : currentIndex - 1;
        updateSliderPosition();
        resetAutoSlide();
    }

    // Mouse
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.clientX;
        endX = e.clientX;
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        endX = e.clientX;
    }

    function handleMouseUp() {
        isDragging = false;
    }



    // Touch
    function handleTouchStart(e) {
        isDragging = true;
        moved = false;
        startX = e.touches[0].clientX;
        endX = startX;
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
        moved = true;
    }
    
    function handleTouchEnd() {
        if (!isDragging) return;
    
        const diff = endX - startX;
    
        if (Math.abs(diff) > DRAG_THRESHOLD) {
            if (diff > 0) {
                prevSlide(); // Arrastró a la derecha ➔ slide anterior
            } else {
                nextSlide(); // Arrastró a la izquierda ➔ slide siguiente
            }
        }
    
        isDragging = false;
    }

    // Inicializar
    initSlider();

    // Cargar footer dinámico
    fetch('pages/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/footer.css';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'js/footer.js';
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error cargando el footer:', error));
});
