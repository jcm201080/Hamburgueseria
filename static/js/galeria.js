document.addEventListener("DOMContentLoaded", function () {
    const galeria = document.getElementById("galeria");

    // Lista de imágenes (esto debería generarse dinámicamente desde el backend en Flask)
    fetch('/lista-imagenes')
        .then(response => response.json())
        .then(data => {
            data.forEach(img => {
                const imgElement = document.createElement("img");
                imgElement.src = `/static/img/galeria/${img}`;
                imgElement.alt = "Imagen de la galería";
                imgElement.classList.add("imagen-galeria");

                // Agregar evento de clic para ampliar la imagen
                imgElement.addEventListener("click", () => ampliarImagen(imgElement.src));

                galeria.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Error cargando imágenes:", error));

    // Función para ampliar la imagen
    function ampliarImagen(src) {
        // Crear el contenedor de la imagen ampliada
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        // Crear la imagen ampliada
        const imgAmpliada = document.createElement("img");
        imgAmpliada.src = src;
        imgAmpliada.classList.add("imagen-ampliada");

        // Crear el botón para cerrar
        const cerrarBtn = document.createElement("button");
        cerrarBtn.classList.add("cerrar-btn");
        cerrarBtn.textContent = "X";
        cerrarBtn.addEventListener("click", () => document.body.removeChild(overlay));

        // Agregar la imagen y el botón al overlay
        overlay.appendChild(imgAmpliada);
        overlay.appendChild(cerrarBtn);

        // Agregar el overlay al cuerpo del documento
        document.body.appendChild(overlay);
    }
});