import { conectaApi } from "./conctaApi.js";

const formulario = document.querySelector("[data-formulario]");

async function criarProduto(evento) {
    evento.preventDefault();

    const url = document.querySelector("[data-url]").value;
    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-preco]").value;
    const descricao = document.querySelector("[data-descricao]").value;

    try {
        await conectaApi.criaProdutos(url, nome, preco, descricao);
        //apos criar produto, sera direcionado a pagina de todos os produtos
        window.location.href = "../pages/produtos-destaques.html";
    } catch (e) {
        alert(e);
    }
}

formulario.addEventListener("submit", evento => criarProduto(evento));