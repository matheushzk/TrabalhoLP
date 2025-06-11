let listaDeProdutos = [];

const urlBase = "http://localhost:4000/produtos";

const formulario = document.getElementById("cadastroProdutos");

formulario.onsubmit = manipularSubmissao;

function manipularSubmissao(evento){
    if(formulario.checkValidity()){
        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const preco = document.getElementById("preco").value;
        const quantidade = document.getElementById("quantidade").value;
        const produto = {nome, descricao, preco, quantidade};
        cadastrarProduto(produto);
        formulario.reset();
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function cadastrarProduto(produto){
    fetch(urlBase, {
        method: "POST",
        body: JSON.stringify(produto)
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((produto) => {
        alert(`Produto cadastrado! ID: ${produto.id}`);
        listaDeProdutos.push(produto);
        mostrarTabelaProduto();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

function mostrarTabelaProduto(){
    let divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";
    if(listaDeProdutos.length === 0){
        divTabela.innerHTML = "<p class='alert alert-info text-center'>Não há produtos cadastrados!</p>";
    }
    else{
        let tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        let cabecalho = document.createElement("thead");
        let corpo = document.createElement("tbody");
        cabecalho.innerHTML = `
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
        `;
        tabela.appendChild(cabecalho);
        for(let i=0; i<listaDeProdutos.length; i++){
            let linha = document.createElement("tr");
            linha.id = listaDeProdutos[i].id;
            linha.innerHTML = `
                <td>${listaDeProdutos[i].nome}</td>
                <td>${listaDeProdutos[i].descricao}</td>
                <td>${listaDeProdutos[i].preco}</td>
                <td>${listaDeProdutos[i].quantidade}</td>
                <td><button type="button" onclick=excluirProduto('${listaDeProdutos[i].id}')>Excluir</button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
}

function excluirProduto(id){
    if(confirm("Deseja realmente excluir o produto?")){
        fetch(urlBase +"/"+id, {
            method: "DELETE"
        })
        .then((resposta) => {
            if(resposta.ok)
                return resposta.json();
        })
        .then((dados) => {
            alert("Produto excluído!");
            listaDeProdutos = listaDeProdutos.filter((produto) => {
                return produto.id != id;
            });
            document.getElementById(id).remove();
            mostrarTabelaProduto();
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
    .then((produtos) => {
        listaDeProdutos = produtos;
        mostrarTabelaProduto();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

obterDados();