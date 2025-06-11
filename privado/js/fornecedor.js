let listaDeFornecedores = [];

const urlBase = "http://localhost:4000/fornecedores";

const formulario = document.getElementById("cadastroFornecedores");

formulario.onsubmit = manipularSubmissao;

function manipularSubmissao(evento){
    if(formulario.checkValidity()){
        const nome = document.getElementById("nome").value;
        const cnpj = document.getElementById("cnpj").value;
        const telefone = document.getElementById("telefone").value;
        const cidade = document.getElementById("cidade").value;
        const email = document.getElementById("email").value;
        const fornecedor = {nome, cnpj, telefone, cidade, email};
        cadastrarFornecedor(fornecedor);
        formulario.reset();
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function cadastrarFornecedor(fornecedor){
    fetch(urlBase, {
        method: "POST",
        body: JSON.stringify(fornecedor)
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((fornecedor) => {
        alert(`Fornecedor cadastrado! ID: ${fornecedor.id}`);
        listaDeFornecedores.push(fornecedor);
        mostrarTabelaFornecedor();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

function mostrarTabelaFornecedor(){
    let divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";
    if(listaDeFornecedores.length === 0){
        divTabela.innerHTML = "<p class='alert alert-info text-center'>Não há fornecedores cadastrados!</p>";
    }
    else{
        let tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        let cabecalho = document.createElement("thead");
        let corpo = document.createElement("tbody");
        cabecalho.innerHTML = `
            <th>Nome</th>
            <th>CNPJ</th>
            <th>E-Mail</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>Ações</th>
        `;
        tabela.appendChild(cabecalho);
        for(let i=0; i<listaDeFornecedores.length; i++){
            let linha = document.createElement("tr");
            linha.id = listaDeFornecedores[i].id;
            linha.innerHTML = `
                <td>${listaDeFornecedores[i].nome}</td>
                <td>${listaDeFornecedores[i].cnpj}</td>
                <td>${listaDeFornecedores[i].email}</td>
                <td>${listaDeFornecedores[i].telefone}</td>
                <td>${listaDeFornecedores[i].cidade}</td>
                <td><button type="button" onclick=excluirFornecedor('${listaDeFornecedores[i].id}')>Excluir</button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
}

function excluirFornecedor(id){
    if(confirm("Deseja realmente excluir o fornecedor?")){
        fetch(urlBase +"/"+id, {
            method: "DELETE"
        })
        .then((resposta) => {
            if(resposta.ok)
                return resposta.json();
        })
        .then((dados) => {
            alert("Fornecedor excluído!");
            listaDeFornecedores = listaDeFornecedores.filter((fornecedor) => {
                return fornecedor.id != id;
            });
            document.getElementById(id).remove();
            mostrarTabelaFornecedor();
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
    .then((fornecedores) => {
        listaDeFornecedores = fornecedores;
        mostrarTabelaFornecedor();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

obterDados();