function salva(){
    if(document.querySelector('meta[name=logged][content=true]')){
        if(!layoutCreator.saved){
            bottoneSalva.removeEventListener('click',salva)
            bottoneSalva.innerText=""
            const loading=document.createElement('img')
            loading.height=17
            loading.width=17
            loading.src="/provaTesi/public/loading.gif"
            bottoneSalva.appendChild(loading)
            layoutCreator.save().then(function(layoutID){
                fetch(app_url+"/newLayout/saveUsersLayout/"+layoutID).then(function(response){
                    if(response.ok){
                        bottoneSalva.querySelector('img').remove()
                        bottoneSalva.innerText="Salvataggio effettuato"
                        bottoneSalva.addEventListener('click',salva)
                    }
                })
            })
        }
    } else {
        bottoneSalva.innerText="Effettua l'accesso per salvare"
    }
}
function onResponse(response){
    return response.json()
}
function onJson(json){
    for(item of json){
        const prodotto=document.createElement('div')
        prodotto.classList.add("prodotto")
        const titolo=document.createElement('h3')
        titolo.innerText=item.nome
        const img=document.createElement('img')
        img.src=item.immagine
        const prezzo = document.createElement('span')
        prezzo.innerText=item.prezzo+"€"
        prodotto.appendChild(titolo)
        prodotto.appendChild(img)
        prodotto.appendChild(prezzo)
        sectionProdotti.appendChild(prodotto)
        prodotto.addEventListener('click', select)
    }
    
}

function addContent(){
    if(lastSelected){
        const nome=lastSelected.querySelector('h3').innerText
        const immagine=lastSelected.querySelector('img').src
        const prezzo=parseInt(lastSelected.querySelector('span').innerText.split("€")[0])
        const data={
            "nome":nome,
            "immagine":immagine,
            "prezzo":prezzo
        }
        layoutCreator.addContent(data)
    } else {
        console.log("scegli un prodotto")
    }
    
}

function select(event){
    if(lastSelected)lastSelected.style.borderStyle=""
    lastSelected=event.currentTarget
    lastSelected.style.borderStyle="dashed"
}

const bottoneContent=document.querySelector('#content')
const bottoneSalva = document.createElement('button')
bottoneSalva.innerText="Salva"
const layoutCreator = new LayoutCreator(bottoneSalva,"600px","100%")
const sectionLayout=document.querySelector('#layout')
const sectionProdotti=document.querySelector('#products')
sectionLayout.appendChild(layoutCreator.layoutMenu)
sectionLayout.appendChild(layoutCreator.layoutContainer)
bottoneSalva.addEventListener('click',salva)
bottoneContent.addEventListener('click',addContent)
let lastSelected=null;

fetch(app_url+"/fetchProdotti").then(onResponse).then(onJson)
