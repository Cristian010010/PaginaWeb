// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, set, get, child } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCw6KAfcaGonLkRhuhAI-bisXyBf-GYois",
    authDomain: "commentsportfolio-b475c.firebaseapp.com",
    databaseURL: "https://commentsportfolio-b475c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "commentsportfolio-b475c",
    storageBucket: "commentsportfolio-b475c.firebasestorage.app",
    messagingSenderId: "467833048136",
    appId: "1:467833048136:web:52d150cc36d1192862dc7d"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const params = new URLSearchParams(window.location.search);
const CommentsSection = params.get('imagen');

// Función para mostrar los comentarios desde Firebase
function loadComments() {
  const commentsRef = ref(database, 'comments');
  get(commentsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const comments = snapshot.val();
        const commentsList = document.getElementById("comments-list");
        commentsList.innerHTML = '';  // Limpiar la lista antes de agregar los comentarios nuevos
        for (const id in comments) {
          if(comments[id].section != CommentsSection) continue;
          const comment = comments[id];
          const commentElement = document.createElement('div');
          commentElement.classList.add('comment');

          // Crear las estrellas de valoración
          const ratingElement = document.createElement('div');
          ratingElement.classList.add('rating');
          for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.innerHTML = '&#9733;';
            if (i < comment.rating) {
              star.style.color = 'gold';
            } else {
              star.style.color = '#ccc';
            }
            ratingElement.appendChild(star);
          }

          // Crear el texto del comentario
          const textElement = document.createElement('div');
          textElement.classList.add('text');
          textElement.textContent = comment.text;

          // Añadir el contenido al comentario
          commentElement.appendChild(ratingElement);
          commentElement.appendChild(textElement);

          commentsList.appendChild(commentElement);
        }
      } else {
        console.log("No hay comentarios aún.");
      }
    })
    .catch((error) => {
      console.error("Error al obtener los comentarios:", error);
    });
}

// Cargar los comentarios al cargar la página
loadComments();

// Función para guardar un comentario en Firebase
document.getElementById("comment-form").addEventListener("submit", function (e) {
  e.preventDefault();  // Evita que el formulario se envíe de forma predeterminada

  const rating = document.querySelector('input[name="rating"]:checked');
  const commentText = document.getElementById("comment-text").value;


  if (!rating || !commentText) {
    alert("Por favor, selecciona una valoración y escribe un comentario.");
    return;
  }

  // Referencia a la base de datos de Firebase
  const commentsRef = ref(database, 'comments');

  // Guardar el comentario
  const newCommentRef = push(commentsRef);
  set(newCommentRef, {
    rating: parseInt(rating.value), // Guardamos la valoración como número
    text: commentText,
    section: CommentsSection,
    timestamp: Date.now()
  }).then(() => {
    loadComments();  // Recargar los comentarios después de agregar uno nuevo

    // Desmarcar todas las estrellas
    const stars = document.querySelectorAll('.star-rating input[type="radio"]');
    stars.forEach(star => {
      star.checked = false;
    });

    // Vaciar la caja de comentario
    document.getElementById("comment-text").value = '';


  }).catch((error) => {
    console.error("Error al guardar el comentario:", error);
  });
});