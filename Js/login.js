const USER = "admin";
const PASSWORD ="123";

const form = document.getElementById("login");
const usuarioLogin = document.getElementById("usuario");
const contraseñaLogin = document.getElementById("contraseña");
const error = document.getElementById("error");

form.addEventListener("submit", getLogin);
function getLogin(event){
    event.preventDefault() 
    const usuario = usuarioLogin.value;
    const contraseña = contraseñaLogin.value;
    if (usuario === USER && contraseña === PASSWORD){
        window.location.href = "#";
        } 
    else {
        error.textContent="Usuario o contraseña incorrecta"
    }    
    }   