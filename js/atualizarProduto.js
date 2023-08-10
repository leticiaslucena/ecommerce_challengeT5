// atualizarProduto.js
import { conectaApi } from "./conctaApi.js";



document.addEventListener("DOMContentLoaded", async () => {
  // Obter o ID do produto da URL
  const urlParams = new URLSearchParams(window.location.search);
  const idProduto = urlParams.get("id");

  // Preencher o campo escondido com o ID do produto
  const produtoIdInput = document.getElementById("editar");
  if (!produtoIdInput) {
    throw new Error("Elemento com atributo editar não encontrado.");
  }
  produtoIdInput.value = idProduto;

  // Buscar os dados do produto pelo ID na API
  async function buscarProdutoPorId(idProduto) {
    try {
      const produto = await conectaApi.buscarProduto(idProduto);
      document.getElementById('url').value = produto.url;
      document.getElementById('nome').value = produto.nome;
      document.getElementById('preco').value = produto.preco;
      document.getElementById('descricao').value = produto.descricao;
    } catch (error) {
      console.error("Erro ao buscar dados do produto:", error.mensagem);
      alert("Erro ao buscar dados do produto.");
      // Redirecionar para a página de produtos em destaque em caso de erro
      window.location.href = "produtos-destaques.html";
    }
  }

  // Chamar a função para buscar os dados do produto
  await buscarProdutoPorId(idProduto);

  // Adicionar evento de submit ao formulário
  const formularioAtualizacao = document.querySelector("[data-editar]");
  formularioAtualizacao.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Obter os novos dados do produto
    const novoUrl = document.getElementById("url").value;
    const novoNome = document.getElementById("nome").value;
    const novoPreco = document.getElementById("preco").value;
    const novaDescricao = document.getElementById("descricao").value;

    try {
      // Atualizar o produto na API com os novos dados usando o método PUT
      await conectaApi.atualizaProduto(idProduto, novoUrl, novoNome, novoPreco, novaDescricao);
      alert("Produto atualizado com sucesso!");

      // Redirecionar para a página de produtos em destaque após a atualização
      window.location.href = "produtos-destaques.html";
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error.mensagem);
      alert("Erro ao atualizar o produto.");
    }
  });
});
