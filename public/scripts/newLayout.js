function split(event){//è la funzione che mi permette di generare gli N figli dentro il div attualmente selezionato
    event.preventDefault()
    gen++
    lastSelected.innerHTML=""
    lastSelected.classList.add("hasChilds")
    lastSelected.removeEventListener('click',select)
    lastSelected.style.display="flex"
    lastSelected.style.flexWrap="nowrap" //di default il div è un flex-wrap, direzione row
    lastSelected.style.flexDirection=formLayout.flexDirection.value //siccome voglio che il div generi N figli disposti in un certo modo
                                                //allora tolgo il wrap e setto la flex-direction desiderata
    color=getRandomColor()
    const N=formLayout.numSplit.value
    for(i=1; i<=N;i++){//generazione degli N figli (saranno tutti dei flex-wrap, row)
        const child=document.createElement('div')
        child.classList.add("child")
        child.dataset.gen=gen//
        child.dataset.id=i//
        child.dataset.parent_gen=lastSelected.dataset.gen//
        child.dataset.parent_id=lastSelected.dataset.id//
        child.style.margin="1px"//
        child.style.border="1px solid "+color
        child.style.flexShrink="0"
        child.style.overflow="auto"
        const size1="calc("+100/N+"% - 4px)"//sottraggo dalla percentuale la quantità 2*(larghezzaMargine+larghezzaBordo)
        const size2="calc("+100+"% - 4px)"
        if(formLayout.flexDirection.value==="row"){
            child.style.width=size1//
            child.style.height=size2//
        } else {
            child.style.height=size1
            child.style.width=size2
        }
        setChild(child,"Inserisci un titolo",24)
        child.addEventListener('click',select)
        lastSelected.appendChild(child)
        counter++
        saveButton.classList.remove("hidden")
        titleSettings[0].classList.remove("hidden")
        titleSettings[1].classList.remove("hidden")
        textCount.innerText=counter;
    }
    if(lastSelected!==layoutContainer) lastSelected.style.borderStyle="solid"
    lastSelected=lastSelected.querySelector('.child[data-id=\'1\']')
    lastSelected.style.borderStyle="dashed"
    setSize(lastSelected)
    formLayout.fontSize.value=lastSelected.childNodes[0].style.fontSize.split('px')[0]
    level.classList.remove("hidden")

}

function select(event){//è la funzione che mi permette di selezionare il div che clicco
    if(lastSelected!==layoutContainer)lastSelected.style.borderStyle="solid"
    lastSelected=event.currentTarget
    lastSelected.style.borderStyle="dashed"
    setSize(lastSelected)
    level.classList.remove("hidden")
    titleSettings[0].classList.remove("hidden")
    titleSettings[1].classList.remove("hidden")
    const childs=lastSelected.querySelectorAll('.child')
    if(childs.length>0){
        splitCommands.classList.add("hidden")
        deleteButton.classList.remove("hidden")
    } else {
        splitCommands.classList.remove("hidden")
        formLayout.title.value=lastSelected.childNodes[0].innerText
        formLayout.fontSize.value=lastSelected.childNodes[0].style.fontSize.split('px')[0]
        deleteButton.classList.add("hidden")
    }
}

function selectLevel(){//è la funzione che mi permette di selezionare il padre del div attualmente selezionato
    deleteButton.classList.remove("hidden")
    titleSettings[0].classList.add("hidden")
    titleSettings[1].classList.add("hidden")
    lastSelected.style.borderStyle="solid"
    lastSelected=lastSelected.parentNode
    if(lastSelected!==layoutContainer) lastSelected.style.borderStyle="dashed"
    if(lastSelected===layoutContainer) {
        level.classList.add("hidden")
        sizeCommands.classList.add("hidden")
    }else{
        setSize(lastSelected)
    }
    splitCommands.classList.add("hidden")
}

function titleUpdate(){
    lastSelected.childNodes[0].innerText=formLayout.title.value
    saveButton.classList.remove("hidden")
}

function fontUpdate(){
    lastSelected.childNodes[0].style.fontSize=formLayout.fontSize.value+"px"
    console.log(lastSelected.childNodes[0].style)
    saveButton.classList.remove("hidden")
}

function sizeUpdate(){//aggiorna le dimensioni del div selezionato, impostandole al valore che metto in input nel form
    border=parseInt(lastSelected.style.borderWidth.split("px")[0])
    lastSelected.style.width="calc("+formLayout.width.value+"% - "+(parseInt(formLayout.marginRight.value)+parseInt(formLayout.marginLeft.value)+2*border)+"px)"
    lastSelected.style.height="calc("+formLayout.height.value+"% - "+(parseInt(formLayout.marginBottom.value)+parseInt(formLayout.marginTop.value)+2*border)+"px)"
    saveButton.classList.remove("hidden")
}

function marginUpdate(){
    border=parseInt(lastSelected.style.borderWidth.split("px")[0])
    lastSelected.style.margin=formLayout.marginTop.value+"px "+formLayout.marginRight.value+"px "+formLayout.marginBottom.value+"px "+formLayout.marginLeft.value+"px "
    lastSelected.style.width="calc("+formLayout.width.value+"% - "+(parseInt(formLayout.marginRight.value)+parseInt(formLayout.marginLeft.value)+2*border)+"px)"
    lastSelected.style.height="calc("+formLayout.height.value+"% - "+(parseInt(formLayout.marginBottom.value)+parseInt(formLayout.marginTop.value)+2*border)+"px)"
    saveButton.classList.remove("hidden")
}

function deleteChilds(){//rimuove tutti i figli di un div (comprendendo anche i figli dei figli)
    childs=lastSelected.querySelectorAll(".child")
    for(child of childs){
        child.remove()
        counter--
        textCount.innerText=counter;
    }
    lastSelected.classList.remove("hasChilds")
    if(counter===0){
        saveButton.classList.add("hidden")
    }
    deleteButton.classList.add("hidden")
    splitCommands.classList.remove("hidden")
    if(lastSelected!==layoutContainer){
        lastSelected.addEventListener('click',select)
        setChild(lastSelected,"Inserisci un titolo",24)
        titleSettings[0].classList.remove("hidden")
        titleSettings[1].classList.remove("hidden")
        setSize(lastSelected)
    }
    saveButton.classList.remove("hidden")
}

function onResponse(response){
    return response.text()
}

function onText(text){
    if(text==1){
        window.location.replace(app_url+"/home")
    } else {
        saveButton.innerText="Effettua il login per salvere"
    }
}

function save(){
    const layoutContainer=document.querySelector('#layoutContainer')
    const data={
        "layout": {
            "id": layoutContainer.dataset.layout,
            "display": layoutContainer.style.display,
            "flexDirection": layoutContainer.style.flexDirection,
            "flexWrap": layoutContainer.style.flexWrap,
            "height": "600px",
            "width": "1100px"
        },
        "childs": []
    }
    for(i=1;i<=gen;i++){
        const childs=document.querySelectorAll(".child[data-gen=\'"+i+"\']")
        let fontSize,title
        for(child of childs){
            if(child.classList.contains("hasChilds")){
                title=null
                fontSize=null
            } else {
                title=child.childNodes[0].innerText
                fontSize=child.childNodes[0].style.fontSize
            }
            data.childs.push({
                "gen": child.dataset.gen,
                "id": child.dataset.id,
                "parent_gen": child.dataset.parent_gen,
                "parent_id": child.dataset.parent_id,
                "hasChilds": child.classList.contains("hasChilds"),
                "title": title,
                "fontSize": fontSize,
                "display": child.style.display,
                "flexDirection": child.style.flexDirection,
                "flexWrap": child.style.flexWrap,
                "height": child.style.height,
                "width": child.style.width,
                "margin": child.style.margin
            })
        }
    }
    fetch(app_url+"/saveLayout",{
        method: 'POST',
        body: JSON.stringify(data),
        headers:
        {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name=\'csrf-token\']').content
        }
    }).then(onResponse).then(onText)
}


let gen=0; /*sta per "generazione", tiene conto del numero di suddivisioni effettuate in totale
es: la prima volta che clicco "Dividi", i figli che otterrò avranno data-gen=1, la seconda volte avrò dei figli con data-gen=2 ecc...
facciamo finta che i figli con stesso data-gen siano "fratelli"
ogni figlio ha un data-id (un numero) univoco, che lo contraddistingue dagli altri "fratelli"
dunque grazie a questi 2 valori riesco a identificare univocamente un div*/
let counter=0 //contatore di figli totali
let lastSelected
const layoutContainer=document.querySelector('#layoutContainer')
const textCount=document.querySelector('#counter')
if(layoutContainer.dataset.layout!=="new"){
    loadLayout(layoutContainer.dataset.layout,true)
} else {
    layoutContainer.dataset.id=0
    layoutContainer.dataset.gen=0
    layoutContainer.style.flexShrink=0
    layoutContainer.style.overflow="auto"
    lastSelected=layoutContainer
    textCount.innerText=counter
}
const formLayout=document.forms['layout']
const level=document.querySelector('#level')
const deleteButton=document.querySelector('#delete')
const sizeCommands=document.querySelector('#size')
const splitCommands=document.querySelector('#split')
const saveButton=document.querySelector("#save")
const titleSettings=document.querySelectorAll('.titleSetting')
formLayout.addEventListener('submit',split)
level.addEventListener('click',selectLevel)
formLayout.title.addEventListener('change', titleUpdate)
formLayout.fontSize.addEventListener('change',fontUpdate)
formLayout.width.addEventListener('change',sizeUpdate)
formLayout.height.addEventListener('change',sizeUpdate)
formLayout.marginTop.addEventListener('change',marginUpdate)
formLayout.marginRight.addEventListener('change',marginUpdate)
formLayout.marginBottom.addEventListener('change',marginUpdate)
formLayout.marginLeft.addEventListener('change',marginUpdate)
deleteButton.addEventListener('click',deleteChilds)
saveButton.addEventListener('click',save)

