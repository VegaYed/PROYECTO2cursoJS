//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
//listners

const cargarEventListener = () => {
  cursos.addEventListener('click', comprarCurso);
  carrito.addEventListener('click', eliminarCurso);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}
cargarEventListener();
//funciones
function comprarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id    : curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>
              <img src="${curso.imagen}" width=100>
          </td>
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td>
              <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLS(curso);
}

function eliminarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains("borrar-curso")){
      let curso = e.target.parentElement.parentElement;
      curso.remove();
      eliminarCursoLS(curso.querySelector('a').getAttribute('data-id'));
    }
}

function vaciarCarrito() {
    //Forma lenta
    //listaCursos.innerHTML='';
    //Forma rapida
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    eliminarLocalStorage();
    return false;
}

function guardarCursoLS(curso) {
    let cursos
    cursos = obtenerCursosLS();
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLS() {
    let cursosLS;
    if(localStorage.getItem('cursos') === null ){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLS;
}

//Pinta los datos desde LS al carrito
function leerLocalStorage() {
    let cursosLS
    cursosLS = obtenerCursosLS();

    cursosLS.forEach((curso) => {
      const row = document.createElement('tr');
      row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
      `;
      listaCursos.appendChild(row);

    });
}

//Eliminar CURSO del LS por ID
function eliminarCursoLS(cursoID) {
    let cursosLS;
    cursosLS = obtenerCursosLS();
    cursosLS.forEach((curso, index) => {
        if(curso.id === cursoID){
            cursosLS.splice(index,1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS))

}

function eliminarLocalStorage() {
    localStorage.clear();
}
