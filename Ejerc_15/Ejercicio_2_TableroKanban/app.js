const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.column');

let draggedCard = null;

cards.forEach(card => {
    card.addEventListener('dragstart', e => {
        draggedCard = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', () => {
        draggedCard = null;
        card.classList.remove('dragging');
    });
});

columns.forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault(); 
        column.classList.add('over');

        const afterElement = getDragAfterElement(column, e.clientY);
        if (afterElement == null) {
            column.appendChild(draggedCard);
        } else {
            column.insertBefore(draggedCard, afterElement);
        }
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('over');
    });

    column.addEventListener('drop', e => {
        e.preventDefault();
        column.classList.remove('over');
        if (draggedCard) {
            column.appendChild(draggedCard);
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}




