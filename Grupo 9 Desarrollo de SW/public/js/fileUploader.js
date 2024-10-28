document.getElementById('foto').addEventListener('change', function(event) {
    const preview = document.getElementById('preview');
    preview.innerHTML = ''; // Limpiar la vista previa anterior
    const files = event.target.files;

    Array.from(files).forEach(file => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const listItem = document.createElement('li');
                listItem.style.listStyle = 'none';
                listItem.style.display = 'inline-block';
                listItem.style.marginRight = '10px';

                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                img.style.width = '70px'; // Ajusta el tamaño de la vista previa según prefieras
                img.style.height = '70px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '5px';
                img.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';

                listItem.appendChild(img);
                preview.appendChild(listItem);
            };
            reader.readAsDataURL(file);
        }
    });
});
