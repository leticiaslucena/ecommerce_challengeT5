import { conectaApi } from "./conctaApi.js";

//manipulando o DOM, para na pagina de produtos em destaque os cards dos produtos surgir
export default function construindoCard(url, nome, preco, descricao, id) {
  const produto = document.createElement("li");
  produto.className = "produto__lista";
  produto.innerHTML = `<div class="produto__imagem-container">
    <img src="${url}" alt="roupa feminina" class="produto__img">
      <div class="produto__icones"> 
      <i class="produto__icone-editar" data-id="${id}"></i>
      <i class="produto__icone-excluir" data-id="${id}"></i>
      </div>
      </div>
      <h3>${nome}</h3>
      <p>R$ ${preco}</p>
      <p>${descricao}</p>`;


  // Adiciona evento para ícone de edição

  function irParaAtualizarProduto(id) {
    window.location.href = `editar-produto.html?id=${id}`;
  }
  const iconesEditar = produto.querySelectorAll(".produto__icone-editar");
  iconesEditar.forEach((iconeEditar) => {
    iconeEditar.addEventListener("click", async () => {
      const idProduto = iconeEditar.getAttribute("data-id");
      try {
        // Chama a função atualizaProduto passando o ID do produto
        await conectaApi.atualizaProduto(idProduto);
        // Redireciona para a página de edição do produto após atualização
        irParaAtualizarProduto(idProduto);
      } catch (error) {
        console.error("Erro ao atualizar o produto:", error);
      }
    });
  });
    // Adiciona event listener para ícone de exclusão
    const iconesExcluir = produto.querySelectorAll(".produto__icone-excluir");
    iconesExcluir.forEach((iconeExcluir) => {
      iconeExcluir.addEventListener("click", () => {
        const idProduto = iconeExcluir.getAttribute("data-id");
        // Chama a função deletaProduto passando o ID do produto
        conectaApi.deletaProduto(idProduto).then(() => {
          produto.remove();
        }).catch((error) => {
          console.error("Erro ao excluir o produto:", error);
        });
      });
    });
    return produto;
}



//essa função vai concectar com o conectaApi do outro arquivo
async function listaProdutos() {
  try {
    const lista = document.querySelector("[data-produto]");
    if (!lista) {
      throw new Error("Elemento com atributo não encontrado.");
    }

    const listaApi = await conectaApi.listaProdutos();
    listaApi.forEach(elemento => lista.appendChild(
      construindoCard(elemento.url, elemento.nome, elemento.preco, elemento.descricao, elemento.id)))
  } catch (error) {
    console.error("Erro ao carregar lista de produtos:", error.message);
    const lista = document.querySelector("[data-produto]");
    if (lista) {
      lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de produtos.</h2>`;
    }
  }
}

listaProdutos();