document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;

        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    }

    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        const newNoteName = prompt('Введите новое название');
        if (newNoteName !== null) {
            edit(id, newNoteName);
        }
    }
});

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    });
}

async function edit(id) {
    await fetch(`/${id}`, {
        method: "PUT"
    });
}