// Datos de los eventos
const events = [
    {
        id: 1,
        title: 'Evento',
        description: 'Próximamente.',
        date: 'Próximamente',
        image: 'assets/images/icon.jpg'
    },
    {
        id: 2,
        title: 'Evento',
        description: 'Próximamente.',
        date: 'Próximamente',
        image: 'assets/images/icon.jpg'
    }
];

// Función para renderizar los eventos
function renderEvents() {
    const eventList = document.getElementById('eventList');
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <h2 class="event-title">${event.title}</h2>
                <p class="event-description">${event.description}</p>
                <p class="event-date">${event.date}</p>
                <a href="#" class="event-button">Ver más</a>
            </div>
        `;
        
        eventList.appendChild(eventCard);
    });
}

// Inicializar la página cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    
    // Configurar el botón "Ver más"
    document.querySelectorAll('.event-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Más información estará disponible próximamente.');
        });
    });

});