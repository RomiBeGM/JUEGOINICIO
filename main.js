const btn = document.querySelector('#btn');
const img = document.querySelector('#imagen');
const informacion = document.querySelector('#informacion');
const contador = document.querySelector('#contador');
const guardar = document.querySelector('#guardar');
const resetear = document.querySelector('#resetear');
const imagenes = [
  { name: "Piche" ,  imagen: './IMG/piche.jpg', dato: 'Resiliente, voluntad de hierro, empatico/a, tenaz y con mucho aguante' },
  { name: "Choique" ,   imagen: './IMG/CHOIQUE.jpg', dato: 'Decidido, amistoso/a, de muchos vinculos, comunicativo/a, bailarín y gracioso/a ' },
  { name: "Guanaco" ,  imagen: './IMG/guanaco.jpg', dato: 'Agradable, alegre, simpatico/a, adaptativo, juicioso y bien parecido' },
  { name: "Mara" ,  imagen: './IMG/MARA.jpg', dato: 'Autonomo/a, Habil, Ágil, Linda/o, Tierna/o e inteligente' },
  { name: "Chiva Andina" ,  imagen: './IMG/chivas.jpg', dato: 'Paciente, tranquila/o, despreocupado/a, deportista, buena forma física y sencible' },
];

let indice = 0;
let contadorImagenes = {};

const mostrarMensaje = () => {
  informacion.innerHTML = '<div class="infoContainer"> <h2> Estamos buscando tu personalidad...</h2> <div>';
} 

const indiceGuardado = localStorage.getItem('indice');
if (indiceGuardado) {
  indice = parseInt(indiceGuardado);
}

imagenes.forEach(imagen => contadorImagenes[imagen.name] = 0);

btn.addEventListener('click', () => {
  const imagenActual = imagenes[indice];
  mostrarMensaje();
  setTimeout(() => {
    img.src = imagenActual.imagen;
    informacion.innerHTML = `<div class= "main__infoContainer">
      <h2> ${imagenActual.name} </h2>
    
      <span> Caracteristícas: ${imagenActual.dato} </span>
      <button class="sisoy_button" id="btnSiSoy">¡Sí, soy!</button>
    </div>`;
    const btnSiSoy = document.querySelector('#btnSiSoy');
    btnSiSoy.addEventListener('click', () => {
      contadorImagenes[imagenActual.name]++;
      localStorage.setItem('contadorImagenes', JSON.stringify(contadorImagenes));
      renderizarContador();
    });
    indice = (indice + 1) % imagenes.length;
  }, 2000);
});

guardar.addEventListener('click', () => {
  localStorage.setItem('contadorImagenes', JSON.stringify(contadorImagenes));
  alert('Estás por unirte a un grupo');
  renderizarContador();
});

resetear.addEventListener('click', () => {
  contadorImagenes = {};
  imagenes.forEach(imagen => contadorImagenes[imagen.name] = 0);
  localStorage.setItem('contadorImagenes', JSON.stringify(contadorImagenes)); // Guardar en localStorage
  renderizarContador();
});

function renderizarContador() {
  let htmlContador = '';
  for (const [nombreImagen, contadorImagen] of Object.entries(contadorImagenes)) {
    htmlContador += `
      ${nombreImagen}: <p class="contador_num"> ${contadorImagen} </p> `;
  }
  contador.innerHTML = htmlContador;
}

const contadorGuardado = localStorage.getItem('contadorImagenes');
if (contadorGuardado) {
  contadorImagenes = JSON.parse(contadorGuardado);
}

renderizarContador();