document.getElementById('foto').addEventListener('change', function(event) {
    const preview = document.getElementById('preview');
    const files = Array.from(event.target.files);

    // Agregar cada archivo a la vista previa
    files.forEach((file, index) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const listItem = document.createElement('li');
                listItem.style.listStyle = 'none';
                listItem.style.display = 'inline-block';
                listItem.style.marginRight = '10px';
                listItem.classList.add('image-preview-item');

                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                img.style.width = '70px';
                img.style.height = '70px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '5px';
                img.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.style.display = 'block';
                deleteButton.style.marginTop = '5px';
                deleteButton.style.backgroundColor = '#ff4d4d';
                deleteButton.style.color = 'white';
                deleteButton.style.border = 'none';
                deleteButton.style.padding = '3px 6px';
                deleteButton.style.cursor = 'pointer';
                deleteButton.onclick = () => {
                    // Eliminar el elemento de vista previa
                    listItem.remove();

                    // Remover la imagen del input "foto"
                    files.splice(index, 1);
                    updateInputFiles(files);
                };

                listItem.appendChild(img);
                listItem.appendChild(deleteButton);
                preview.appendChild(listItem);
            };
            reader.readAsDataURL(file);
        }
    });
});

// Función para actualizar el input "foto" después de eliminar una imagen
function updateInputFiles(files) {
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    document.getElementById('foto').files = dataTransfer.files;
}


