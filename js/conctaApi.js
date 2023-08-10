// conexão com a API db.json
//GET
async function listaProdutos() {
  try {
    const produtos = await fetch("http://localhost:3000/produtos");
    const produtosConvertidos = await produtos.json();
    return produtosConvertidos;
  } catch (error) {
    console.error("Erro ao obter a lista de produtos:", error);
    throw error;
  }
};

//POST - criar 
async function criaProdutos(url, nome, preco, descricao) {
  const conexao = await fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      url: url,
      nome: nome,
      preco: preco,
      descricao: descricao
    }),
  });
  if (!conexao.ok) {
    throw new Error("Erro ao criar produto.");
  }
  const conexaoconvertida = await conexao.json();
  return conexaoconvertida;
};

// PUT - ATUALIZAR
async function atualizaProduto(id, url, nome, preco, descricao) {
  const atualizar = await fetch(`http://localhost:3000/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
      nome: nome,
      preco: preco,
      descricao: descricao,
    }),
  });
  if (!atualizar.ok) {
    throw new Error("Erro ao atualizar o produto.");
  }
  const atualizarConvertido = await atualizar.json();
  return atualizarConvertido;
}


// DELETE
async function deletaProduto(id) {
 
    const deleta = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!deleta.ok) {
      throw new Error("Erro ao excluir o produto.");
    }

    const deletaConvertido = await deleta.json();
    return deletaConvertido;
}
async function buscarProduto(id) {
  const atualizar = await fetch(`http://localhost:3000/produtos?q=${id}`)
  const atualizarConvertido = await atualizar.json();
  return atualizarConvertido;
}
//Buscar no input da pagina dos produtos
async function buscaProdutos(termoDeBusca) {
  const conexao = await fetch(`http://localhost:3000/produtos?q=${termoDeBusca}`)
  const conexaoconvertida = await conexao.json();

  return conexaoconvertida;
}

export const conectaApi = {
  listaProdutos,
  criaProdutos,
  atualizaProduto,
  deletaProduto,
  buscarProduto,
  buscaProdutos //para o input
}
