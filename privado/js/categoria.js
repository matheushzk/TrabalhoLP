let listaDeCategorias = [];

const urlBase = "http://localhost:4000/categorias";

const formulario = document.getElementById("cadastroCategorias");

formulario.onsubmit = manipularSubmissao;

function manipularSubmissao(evento){
    if(formulario.checkValidity()){
        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const codigo = document.getElementById("codigo").value;
        const categoria = {nome, descricao, codigo};
        cadastrarCategoria(categoria);
        formulario.reset();
    }
    
    evento.preventDefault();
    evento.stopPropagation();
}

function cadastrarCategoria(categoria){
    fetch(urlBase, {
        method: "POST",
        body: JSON.stringify(categoria)
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((categoria) => {
        alert(`Categoria cadastrada! ID: ${categoria.id}`);
        listaDeCategorias.push(categoria);
        mostrarTabelaCategoria();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

function mostrarTabelaCategoria(){
    let divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";
    if(listaDeCategorias.length === 0){
        divTabela.innerHTML = "<p class='alert alert-info text-center'>Não há categorias cadastradas!</p>";
    }
    else{
        let tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        let cabecalho = document.createElement("thead");
        let corpo = document.createElement("tbody");
        cabecalho.innerHTML = `
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Código</th>
            <th scope="col">Ações</th>
        `;
        tabela.appendChild(cabecalho);
        for(let i=0; i<listaDeCategorias.length; i++){
            let linha = document.createElement("tr");
            linha.id = listaDeCategorias[i].id;
            linha.innerHTML = `
                <td>${listaDeCategorias[i].nome}</td>
                <td>${listaDeCategorias[i].descricao}</td>
                <td>${listaDeCategorias[i].codigo}</td>
                <td><button type='button' onclick=excluirCategoria('${listaDeCategorias[i].id}')>Excluir</button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
}

function excluirCategoria(id){
    if(confirm("Deseja realmente excluir a categoria?")){
        fetch(urlBase + "/" + id, {
            method: "DELETE"
        })
        .then((resposta) => {
            if(resposta.ok)
                return resposta.json();
        })
        .then((dados) => {
            alert("Categoria excluída!");
            listaDeCategorias = listaDeCategorias.filter((categoria) => {
                return categoria.id != id;
            });
            mostrarTabelaCategoria();
        })
        .catch((erro) => {
            alert("Erro: "+erro);
        });
    }
}

function obterDados(){
    fetch(urlBase, {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((categorias) => {
        listaDeCategorias = categorias;
        mostrarTabelaCategoria();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

obterDados();