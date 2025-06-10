let listaDeUsuarios = [];

const urlBase = "http://localhost:4000/usuarios";

const formulario = document.getElementById("cadastroUsuarios");

formulario.onsubmit = manipularSubmissao;

function manipularSubmissao(evento){
    if(formulario.checkValidity()){
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const usuario = {nome, email, senha};
        cadastrarUsuario(usuario);
        formulario.reset();
    }

    evento.stopPropagation();
    evento.preventDefault();
}

function cadastrarUsuario(usuario){
    fetch(urlBase, {
        method: "POST",
        body: JSON.stringify(usuario)
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((usuario) => {
        alert(`Usuario cadastrado!`);
        listaDeUsuarios.push(usuario);
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

function obterDados(){
    fetch(urlBase, {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((usuarios) => {
        listaDeUsuarios = usuarios;
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

obterDados();