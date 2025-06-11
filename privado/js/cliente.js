let listaDeClientes = [];

const urlBase = "http://localhost:4000/clientes";

const formulario = document.getElementById("cadastroClientes");

formulario.onsubmit = manipularSubmissao;

function manipularSubmissao(evento){
    if(formulario.checkValidity()){
        const nome = document.getElementById("nome").value;
        const cpf = document.getElementById("cpf").value;
        const telefone = document.getElementById("telefone").value;
        const cidade = document.getElementById("cidade").value;
        const uf = document.getElementById("uf").value;
        const cep = document.getElementById("cep").value;
        const cliente = {nome, cpf, telefone, cidade, uf, cep};
        cadastrarCliente(cliente);
        formulario.reset();
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function cadastrarCliente(cliente){
    fetch(urlBase, {
        method: "POST",
        body: JSON.stringify(cliente)
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((cliente) => {
        alert(`Cliente cadastrado! ID: ${cliente.id}`);
        listaDeClientes.push(cliente);
        mostrarTabelaCliente();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

function mostrarTabelaCliente(){
    let divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";
    if(listaDeClientes.length === 0){
        divTabela.innerHTML = "<p class='alert alert-info text-center'>Não há clientes cadastrados!</p>";
    }
    else{
        let tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        let cabecalho = document.createElement("thead");
        let corpo = document.createElement("tbody");
        cabecalho.innerHTML = `
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>CEP</th>
            <th>Ações</th>
        `;
        tabela.appendChild(cabecalho);
        for(let i=0; i<listaDeClientes.length; i++){
            let linha = document.createElement("tr");
            linha.id = listaDeClientes[i].id;
            linha.innerHTML = `
                <td>${listaDeClientes[i].nome}</td>
                <td>${listaDeClientes[i].cpf}</td>
                <td>${listaDeClientes[i].telefone}</td>
                <td>${listaDeClientes[i].cidade}</td>
                <td>${listaDeClientes[i].uf}</td>
                <td>${listaDeClientes[i].cep}</td>
                <td><button type="button" onclick=excluirCliente('${listaDeClientes[i].id}')>Excluir</button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
}

function excluirCliente(id){
    if(confirm("Deseja realmente excluir o cliente?")){
        fetch(urlBase +"/"+id, {
            method: "DELETE"
        })
        .then((resposta) => {
            if(resposta.ok)
                return resposta.json();
        })
        .then((dados) => {
            alert("Cliente excluído!");
            listaDeClientes = listaDeClientes.filter((cliente) => {
                return cliente.id != id;
            });
            document.getElementById(id).remove();
            mostrarTabelaCliente();
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
    .then((clientes) => {
        listaDeClientes = clientes;
        mostrarTabelaCliente();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

obterDados();