function modifica(){
    layoutCreator.modify()
    sectionLayout.insertBefore(layoutCreator.getLayoutMenu(),bottoneRimuovi)
    
    bottoneTermina.classList.remove('hidden')
    bottoneContent.classList.remove("hidden")
    sectionProdotti.classList.remove("hidden")
    bottoneRimuovi.classList.remove("hidden")
    bottoneModifica.classList.add("hidden")
    modify=true
}

function termina(){
    layoutCreator.quit()
    modify=false
    bottoneTermina.classList.add('hidden')
    bottoneContent.classList.add("hidden")
    sectionProdotti.classList.add("hidden")
    bottoneRimuovi.classList.add("hidden")
    bottoneModifica.classList.remove("hidden")
}

function salva(){
    if(!layoutCreator.isSaved()){
        bottoneSalva.removeEventListener('click',salva)
        bottoneSalva.innerText=""
        const loading=document.createElement('img')
        loading.height=17
        loading.width=17
        loading.src="/layoutCreator/public/loading.gif"
        bottoneSalva.appendChild(loading)
        layoutCreator.save().then(function(){
            bottoneSalva.querySelector('img').remove()
            bottoneSalva.innerText="Salvataggio effettuato"
            bottoneSalva.addEventListener('click',salva)
        })
    }
}

function onResponse(response){
    return response.json()
}

function onJsonProdotti(prodotti){
    for(const item of prodotti){
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
    layoutCreator.loadLayout(layoutID).then(onJsonLayout)
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

function onJsonLayout(json){
    for(const gen of Object.keys(json)){
        for(const id of Object.keys(json[gen])){
            const childSection=layoutCreator.getLayoutContainer().querySelector('.child'+gen+id).querySelector('section')
            for(const productID of json[gen][id]){
                const product=sectionProdotti.querySelector(".prodotto[data-product_id=\'"+productID+"\']")
                const cloneProduct=document.createElement('div')
                cloneProduct.dataset.product_id=productID
                cloneProduct.classList.add('prodotto')
                const nome=document.createElement('h3')
                nome.innerText=product.childNodes[0].innerText
                const immagine=document.createElement('img')
                immagine.src=product.childNodes[1].src
                const prezzo = document.createElement('span')
                prezzo.innerText=product.childNodes[2].innerText
                cloneProduct.appendChild(nome)
                cloneProduct.appendChild(immagine)
                cloneProduct.appendChild(prezzo)
                cloneProduct.addEventListener('click',select)
                childSection.appendChild(cloneProduct)
            }
        }
    }
}

function select(event){
    if(modify){
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
}

const bottoneSalva=document.createElement('button')
bottoneSalva.innerText="Salva"
const layoutCreator=new LayoutCreator(bottoneSalva)
const bottoneModifica=document.querySelector('#modifica')
if(bottoneModifica)bottoneModifica.addEventListener('click',modifica)
const bottoneRimuovi=document.querySelector('#remove')
const bottoneTermina=document.querySelector('#quit')
const bottoneContent=document.querySelector('#content')
const layoutID=document.querySelector('meta[name=layout]').content
const sectionLayout=document.querySelector('#layout')
const sectionProdotti=document.querySelector('#products')
sectionLayout.appendChild(layoutCreator.getLayoutContainer())
bottoneSalva.addEventListener('click',salva)
bottoneContent.addEventListener('click',addContent)
bottoneTermina.addEventListener('click',termina)
bottoneRimuovi.addEventListener('click',removeContent)
let productsToInsert=[]
let productsToRemove=[]
let modify=false

fetch(app_url+"/fetchProdotti").then(onResponse).then(onJsonProdotti)
