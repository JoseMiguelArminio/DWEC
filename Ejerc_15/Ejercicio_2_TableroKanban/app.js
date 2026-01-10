const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.column');

cards.forEach(card => {
    card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', card.id);
        card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
});

columns.forEach(col => {
    col.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(col, e.clientY);
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        if (afterElement == null) {
            col.appendChild(draggable);
        } else {
            col.insertBefore(draggable, afterElement);
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
