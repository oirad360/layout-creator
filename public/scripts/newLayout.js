function salva(){
    if(document.querySelector('meta[name=logged][content=true]')){
        if(!layoutCreator.isSaved()){
            bottoneSalva.removeEventListener('click',salva)
            bottoneSalva.innerText=""
            const loading=document.createElement('img')
            loading.height=17
            loading.width=17
            loading.src="/layoutCreator/public/loading.gif"
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
    for(const item of json){
        const prodotto=document.createElement('div')
        prodotto.classList.add("prodotto")
        prodotto.dataset.product_id=item.id
        const nome=document.createElement('h3')
        nome.innerText=item.nome
        const immagine=document.createElement('img')
        immagine.src=item.immagine
        const prezzo = document.createElement('span')
        prezzo.innerText=item.prezzo+"€"
        prodotto.appendChild(nome)
        prodotto.appendChild(immagine)
        prodotto.appendChild(prezzo)
        sectionProdotti.appendChild(prodotto)
        prodotto.addEventListener('click', select)
    }
}

function addContent(){
    if(productsToInsert.length>0){
        for(const product of productsToInsert){
            const id=parseInt(product.dataset.product_id)
            layoutCreator.addContent(id)
            const prodotto=document.createElement('div')
            prodotto.classList.add("prodotto")
            prodotto.dataset.product_id=product.dataset.product_id
            const nome=document.createElement('h3')
            nome.innerText=product.childNodes[0].innerText
            const immagine=document.createElement('img')
            immagine.src=product.childNodes[1].src
            const prezzo = document.createElement('span')
            prezzo.innerText=product.childNodes[2].innerText
            prodotto.appendChild(nome)
            prodotto.appendChild(immagine)
            prodotto.appendChild(prezzo)
            prodotto.addEventListener('click',select)
            layoutCreator.getLastSelected().querySelector('section').appendChild(prodotto)
        }
    } else {
        console.log("scegli un prodotto")
    }
}

function removeContent(){
    if(productsToRemove.length>0){
        for(const product of productsToRemove){
            const child=product.parentNode.parentNode
            const gen=child.dataset.gen
            const id=child.dataset.id
            const content=layoutCreator.getContent(gen,id)
            let i=0
            for(const item of content){
                if(item===parseInt(product.dataset.product_id)) break
                i++
            }
            layoutCreator.removeContent(i,gen,id)
            child.querySelector(".prodotto[data-product_id=\'"+product.dataset.product_id+"\']").remove()
        }
        productsToRemove=[]
    } else console.log("scegli un prodotto")
}

function select(event){
        let list
        if(event.currentTarget.parentNode===sectionProdotti) list=productsToInsert
        else list=productsToRemove
        if(!list.includes(event.currentTarget)){
            event.currentTarget.style.borderStyle="dashed"
            list.push(event.currentTarget)
        } else {
            event.currentTarget.style.borderStyle=""
            let i=0
            for(const product of list){
                if(product===event.currentTarget) break
                i++
            }
            list.splice(i,1)
        }
        if(event.currentTarget.parentNode===sectionProdotti) productsToInsert=list
        else productsToRemove=list
}

const bottoneContent=document.querySelector('#content')
const bottoneSalva = document.createElement('button')
const bottoneRimuovi=document.querySelector('#remove')
bottoneSalva.innerText="Salva"
const layoutCreator = new LayoutCreator(bottoneSalva,"600px","100%")
const sectionLayout=document.querySelector('#layout')
const sectionProdotti=document.querySelector('#products')
sectionLayout.insertBefore(layoutCreator.getLayoutMenu(),bottoneRimuovi)
sectionLayout.appendChild(layoutCreator.getLayoutContainer())
bottoneSalva.addEventListener('click',salva)
bottoneContent.addEventListener('click',addContent)
bottoneRimuovi.addEventListener('click',removeContent)
let productsToInsert=[]
let productsToRemove=[]

fetch(app_url+"/fetchProdotti").then(onResponse).then(onJson)
