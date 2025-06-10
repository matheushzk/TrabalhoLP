function carregarProdutos(){
    fetch("http://localhost:4000/produtos", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((listaDeProdutos) => {
        const divVitrine = document.getElementById("vitrine");
        for(const produto of listaDeProdutos){
            let card = document.createElement('div');
            card.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h3 class="card-title">"${produto.nome}"</h3>
                        <p class="card-text">"Descrição: ${produto.descricao}"</p>
                        <p class="card-text">"R$: ${produto.preco}"</p>
                        <p class="card-text">"Quantidade: ${produto.quantidade}"</p>
                    </div>
                </div>
            `;
            divVitrine.appendChild(card);
        }
    })
    .catch((erro) => {
        alert("Erro: "+ erro);
    });
}

carregarProdutos();