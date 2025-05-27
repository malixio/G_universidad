// Mostrar Departamento

let nombreDepartamento = "Ingeniería de Sistemas";

function mostrar(event){
  if(event){
    event.preventDefault();
  }
  document.getElementById("NomDep").value = nombreDepartamento;

}
  // Modificar Departamento
function Modify(event) {
    event.preventDefault();
    const nuevoNombre = document.getElementById("NewDep").value.trim();

    if(nuevoNombre.length < 4 || nuevoNombre.length >50){
      alert("El nuevo nombre debe tener entre 4 y 50 carácteres");
      return;
    }
    nombreDepartamento = nuevoNombre;
    document.getElementById("NewDep").value = "";

   
}
//   const myHeaders = new Headers();