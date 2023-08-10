import { conectaApi } from "./conctaApi.js";
import construindoCard from "./criaProdutoController.js";

async function buscarProduto(evento) {
    evento.preventDefault();

    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
    const busca = await conectaApi.buscaProdutos(dadosDePesquisa);

    const lista = document.querySelector("[data-produto]");
   
    //lista de produto filtrada, só para mostar o produto da pesquisa, ele remove o primeiro filho da ul e mostar a sua pesquisa
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    //para cada filho da lista vai acontecer alguma coisa
    //criamos um card para cada elemento da lista
    busca.forEach(elemento => lista.appendChild(
        construindoCard(elemento.url, elemento.nome, elemento.preco, elemento.descricao)))
    
        if(busca.length == 0) {
            lista.innerHTML = `<h2 class="mensagem__titulo">não existe produto com esse termo</h2>`
        }
}

const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");
botaoDePesquisa.addEventListener("click", evento => buscarProduto(evento))
