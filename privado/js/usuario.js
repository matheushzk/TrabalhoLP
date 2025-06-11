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
        mostrarTabelaUsuarios();
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
        mostrarTabelaUsuarios();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

function mostrarTabelaUsuarios(){
    let divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";
    if(listaDeUsuarios.length === 0){
        divTabela.innerHTML = "<p class='alert alert-info text-center'>Não há produtos cadastrados!</p>";
    }
    else{
        let tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        let cabecalho = document.createElement("thead");
        let corpo = document.createElement("tbody");
        cabecalho.innerHTML = `
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
        `;
        tabela.appendChild(cabecalho);
        for(let i=0; i<listaDeUsuarios.length; i++){
            let linha = document.createElement("tr");
            linha.id = listaDeUsuarios[i].id;
            linha.innerHTML = `
                <td>${listaDeUsuarios[i].nome}</td>
                <td>${listaDeUsuarios[i].email}</td>
                <td><button type="button" onclick=excluirUsuario('${listaDeUsuarios[i].id}')>Excluir</button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
}

function excluirUsuario(id){
    if(confirm("Deseja realmente excluir o usuário?")){
        fetch(urlBase +"/"+id, {
            method: "DELETE"
        })
        .then((resposta) => {
            if(resposta.ok)
                return resposta.json();
        })
        .then((dados) => {
            alert("Usuário excluído!");
            listaDeUsuarios = listaDeUsuarios.filter((usuario) => {
                return usuario.id != id;
            });
            document.getElementById(id).remove();
            mostrarTabelaUsuarios();
        })
        .catch((erro) => {
            alert("Erro: "+erro);
        });
    }
}

obterDados();