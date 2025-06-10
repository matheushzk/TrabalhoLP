let listaDeEntregadores = [];

const urlBase = "http://localhost:4000/entregadores";

const formulario = document.getElementById("cadastroEntregadores");

formulario.onsubmit = manipularSubmissao;

function manipularSubmissao(evento){
    if(formulario.checkValidity()){
        const nome = document.getElementById("nome").value;
        const cpf = document.getElementById("cpf").value;
        const placa = document.getElementById("placa").value;
        const veiculo = document.getElementById("veiculo").value;
        const telefone = document.getElementById("telefone").value;
        const entregador = {nome, cpf, placa, veiculo, telefone};
        cadastrarEntregador(entregador);
        formulario.reset();
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function cadastrarEntregador(entregador){
    fetch(urlBase, {
        method: "POST",
        body: JSON.stringify(entregador)
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((entregador) => {
        alert(`Entregador cadastrado! ID: ${entregador.id}`);
        listaDeEntregadores.push(entregador);
        mostrarTabelaEntregador();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

function mostrarTabelaEntregador(){
    let divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";
    if(listaDeEntregadores.length === 0){
        divTabela.innerHTML = "<p class='alert alert-info text-center'>Não há entregadores cadastrados!</p>";
    }
    else{
        let tabela = document.createElement("table");
        tabela.className = "table table-striped table-hover";
        let cabecalho = document.createElement("thead");
        let corpo = document.createElement("tbody");
        cabecalho.innerHTML = `
            <th>Nome</th>
            <th>CPF</th>
            <th>Placa</th>
            <th>Veículo</th>
            <th>Telefone</th>
            <th>Ações</th>
        `;
        tabela.appendChild(cabecalho);
        for(let i=0; i<listaDeEntregadores.length; i++){
            let linha = document.createElement("tr");
            linha.id = listaDeEntregadores[i].id;
            linha.innerHTML = `
                <td>${listaDeEntregadores[i].nome}</td>
                <td>${listaDeEntregadores[i].cpf}</td>
                <td>${listaDeEntregadores[i].placa}</td>
                <td>${listaDeEntregadores[i].veiculo}</td>
                <td>${listaDeEntregadores[i].telefone}</td>
                <td><button type="button" onclick=excluirEntregador('${listaDeEntregadores[i].id}')>Excluir</button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
}

function excluirEntregador(id){
    if(confirm("Deseja realmente excluir o entregador?")){
        fetch(urlBase +"/"+id, {
            method: "DELETE"
        })
        .then((resposta) => {
            if(resposta.ok)
                return resposta.json();
        })
        .then((dados) => {
            alert("Entregador excluído!");
            listaDeEntregadores = listaDeEntregadores.filter((entregador) => {
                return entregador.id != id;
            });
            document.getElementById(id).remove();
            mostrarTabelaEntregador();
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
    .then((entregadores) => {
        listaDeEntregadores = entregadores;
        mostrarTabelaEntregador();
    })
    .catch((erro) => {
        alert("Erro: "+erro);
    });
}

obterDados();