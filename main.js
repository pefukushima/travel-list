const form = document.getElementById("novoItem")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((element) => {
    criarElemento(element)    
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]
    
    const itemAtual = {
            "nome": nome.value,
            "quantidade": quantidade.value
    }

    const existe = itens.find(element => element.nome === nome.value)
    
    if (existe) {
        itemAtual.codigo = existe.codigo
        
        atualizarElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.codigo === existe.codigo)] = itemAtual
    } else {
        itemAtual.codigo = itens[itens.length - 1] ? (itens[itens.length - 1].codigo + 1) : 0; 
        
        criarElemento(itemAtual)

        itens.push(itemAtual)
    }
    
    localStorage.setItem("itens", JSON.stringify(itens))
    
    nome.value = ""
    quantidade.value = ""
})

function criarElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const quantidadeItem = document.createElement("strong")
    quantidadeItem.innerHTML = item.quantidade
    quantidadeItem.dataset.codigo = item.codigo

    novoItem.appendChild(quantidadeItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.codigo))
    const lista = document.getElementById("lista")
    lista.appendChild(novoItem)
}

function atualizarElemento(item) {
    document.querySelector("[data-codigo='"+item.codigo+"']").innerHTML = item.quantidade

}

function botaoDeleta(codigo) {
    const deletar = document.createElement("button")
    deletar.innerHTML = "X"

    deletar.addEventListener("click", function() {
        deletaElemento(this.parentNode, codigo)        
    })
    return deletar
}

function deletaElemento(element, codigo) {
    element.remove()

    itens.splice(itens.findIndex(elemento => elemento.codigo === codigo),1)

    localStorage.setItem("itens", JSON.stringify(itens))   
}