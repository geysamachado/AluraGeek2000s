// Função para carregar os produtos do db.json
async function carregarProdutos() {
    const response = await fetch('http://localhost:3000/Produtos');
    const produtos = await response.json();
    return produtos;
}
// Função de guardar produto
async function btnGuardar() {
    const nome = document.getElementById("produto").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (!nome || isNaN(valor) || isNaN(quantidade)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Carregar os produtos atuais para checar a quantidade
    const produtos = await carregarProdutos();
    const produtoExistente = produtos.find(produto => produto.nome.toLowerCase() === nome.toLowerCase());

    if (produtoExistente) {
        // Verificar se a quantidade desejada é maior que a disponível
        if (quantidade > produtoExistente.quantidade) {
            alert(`A quantidade solicitada excede o limite disponível. Temos apenas ${produtoExistente.quantidade} unidades disponíveis.`);
            return;
        }
    }

    // Criar o novo produto
    const novoProduto = {
        nome,
        valor,
        quantidade,
    };

    // Enviar o novo produto para o servidor
    fetch('http://localhost:3000/Produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto),
    })
    .then(response => response.json())
    .then(data => {
        alert("Produto adicionado com sucesso!");
        console.log("Produto adicionado:", data);
        btnLimpar(); // Limpa o formulário
    })
    .catch(error => console.error('Erro ao adicionar produto:', error));
}

// Função para limpar os campos
function btnLimpar() {
    document.getElementById("produto").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("quantidade").value = "";
}