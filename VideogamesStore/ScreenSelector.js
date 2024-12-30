 // Obtener el parámetro de la URL
 const params = new URLSearchParams(window.location.search);
 const imagenId = params.get('imagen');

 // Cargar el archivo JSON
 fetch('Videogames.json')
     .then(response => response.json())
     .then(data => {
         console.log(imagenId);
         // Verificar si la imagen clicada está en los datos y mostrar su información
         if (data[imagenId]) {
             document.getElementById('Title').textContent = data[imagenId].title;
             document.getElementById('VideoSource').src = data[imagenId].src;
             document.getElementById('DescriptionText').textContent = data[imagenId].description;
             document.getElementById('Gameplay').load(); // Carga el nuevo video
         } else {
            /*
             document.getElementById('image-title').textContent = "Imagen no encontrada";
             document.getElementById('image-description').textContent = "No se pudo cargar la información de esta imagen.";
             */
         }
     })
     .catch(error => {
         console.error('Error al cargar la información:', error);
     });