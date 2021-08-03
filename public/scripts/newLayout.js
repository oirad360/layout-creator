function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function setSize(lastSelected){//è una funzione che chiamo ogni qualvolta voglio mostrare i campi per l'inserimento
                            //della larghezza, altezza e margini che mostreranno inizialmente le dimensioni attuali del div selezionato
    sizeCommands.classList.remove("hidden")
    lastSelectedWidth=lastSelected.style.width.substring(5,lastSelected.style.width.length)
    lastSelectedWidth=lastSelectedWidth.split("%")[0]
    formLayout.width.value=lastSelectedWidth

    lastSelectedHeight=lastSelected.style.height.substring(5,lastSelected.style.height.length)
    lastSelectedHeight=lastSelectedHeight.split("%")[0]
    formLayout.height.value=lastSelectedHeight

    lastSelectedMarginTop=parseInt(lastSelected.style.marginTop.split("%")[0])
    formLayout.marginTop.value=lastSelectedMarginTop

    lastSelectedMarginRight=parseInt(lastSelected.style.marginRight.split("%")[0])
    formLayout.marginRight.value=lastSelectedMarginRight

    lastSelectedMarginBottom=parseInt(lastSelected.style.marginBottom.split("%")[0])
    formLayout.marginBottom.value=lastSelectedMarginBottom

    lastSelectedMarginLeft=parseInt(lastSelected.style.marginLeft.split("%")[0])
    formLayout.marginLeft.value=lastSelectedMarginLeft

}

function setChild(child){
    const title=document.createElement('h2')
    title.style.margin="10px"
    title.innerText="Inserisci un titolo"//
    formLayout.title.value=""
    child.appendChild(title)
    const section=document.createElement('section')
    section.style.width="100%"
    section.style.overflow="auto"
    section.style.display="flex"
    section.style.flexDirection="row"
    section.style.flexWrap="wrap"
    child.appendChild(section)
}
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
        child.style.display="flex"
        child.style.flexDirection="column"
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
        setChild(child)
        child.addEventListener('click',select)
        lastSelected.appendChild(child)
        counter++
        saveButton.classList.remove("hidden")
        textCount.innerText=counter;
    }
    if(lastSelected!==layoutContainer) lastSelected.style.borderStyle="solid"
    lastSelected=lastSelected.querySelector('.child[data-id=\'1\']')
    lastSelected.style.borderStyle="dashed"
    setSize(lastSelected)
    level.classList.remove("hidden")

}

function select(event){//è la funzione che mi permette di selezionare il div che clicco
    lastSelected.style.borderStyle="solid"
    lastSelected=event.currentTarget
    lastSelected.style.borderStyle="dashed"
    setSize(lastSelected)
    level.classList.remove("hidden")
    const childs=lastSelected.querySelectorAll('.child')
    if(childs.length>0){
        splitCommands.classList.add("hidden")
        deleteButton.classList.remove("hidden")
    } else {
        splitCommands.classList.remove("hidden")
        formLayout.title.value=lastSelected.childNodes[0].innerText
        deleteButton.classList.add("hidden")
    }
}

function selectLevel(){//è la funzione che mi permette di selezionare il padre del div attualmente selezionato
    deleteButton.classList.remove("hidden")
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
}

function sizeUpdate(){//aggiorna le dimensioni del div selezionato, impostandole al valore che metto in input nel form
    border=parseInt(lastSelected.style.borderWidth.split("px")[0])
    lastSelected.style.width="calc("+formLayout.width.value+"% - "+(parseInt(formLayout.marginRight.value)+parseInt(formLayout.marginLeft.value)+2*border)+"px)"
    lastSelected.style.height="calc("+formLayout.height.value+"% - "+(parseInt(formLayout.marginBottom.value)+parseInt(formLayout.marginTop.value)+2*border)+"px)"
}

function marginUpdate(){
    border=parseInt(lastSelected.style.borderWidth.split("px")[0])
    lastSelected.style.margin=formLayout.marginTop.value+"px "+formLayout.marginRight.value+"px "+formLayout.marginBottom.value+"px "+formLayout.marginLeft.value+"px "
    lastSelected.style.width="calc("+formLayout.width.value+"% - "+(parseInt(formLayout.marginRight.value)+parseInt(formLayout.marginLeft.value)+2*border)+"px)"
    lastSelected.style.height="calc("+formLayout.height.value+"% - "+(parseInt(formLayout.marginBottom.value)+parseInt(formLayout.marginTop.value)+2*border)+"px)"
}

function deleteChilds(){//rimuove tutti i figli di un div (comprendendo anche i figli dei figli)
    childs=lastSelected.querySelectorAll(".child")
    lastSelected.classList.remove("hasChilds")
    for(child of childs){
        child.remove()
        counter--
        textCount.innerText=counter;
    }
    if(counter===0){
        saveButton.classList.add("hidden")
    }
    lastSelected.style.flexWrap="wrap"
    lastSelected.style.flexDirection="row"
    deleteButton.classList.add("hidden")
    setChild(lastSelected)
    splitCommands.classList.remove("hidden")
    if(lastSelected!==layoutContainer) setSize(lastSelected)
}

function onResponse(response){
    return response.text()
}

function onText(text){
    if(text==1){
        window.location.replace('home')
    } else {
        saveButton.innerText="Effettua il login per salvere"
    }
}

function save(){
    const layoutContainer=document.querySelector('#layoutContainer')
    const data={
        "layout": {
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
        for(child of childs){
            data.childs.push({
                "gen": child.dataset.gen,
                "id": child.dataset.id,
                "parent_gen": child.dataset.parent_gen,
                "parent_id": child.dataset.parent_id,
                "hasChilds": child.classList.contains("hasChilds"),
                "title": child.childNodes[0].innerText,
                "display": child.style.display,
                "flexDirection": child.style.flexDirection,
                "flexWrap": child.style.flexWrap,
                "height": child.style.height,
                "width": child.style.width,
                "margin": child.style.margin
            })
        }
    }
    fetch(app_url+"/newLayout/saveLayout",{
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
let counter=0; //contatore di figli totali
const layoutContainer=document.querySelector('#layoutContainer')
layoutContainer.dataset.id=0
layoutContainer.dataset.gen=0
layoutContainer.style.flexShrink=0
layoutContainer.style.overflow="auto"
let lastSelected=layoutContainer;
const textCount=document.querySelector('#counter')
textCount.innerText=counter;
const formLayout=document.forms['layout']
const level=document.querySelector('#level')
const deleteButton=document.querySelector('#delete')
const sizeCommands=document.querySelector('#size')
const splitCommands=document.querySelector('#split')
const saveButton=document.querySelector("#save")
formLayout.addEventListener('submit',split)
level.addEventListener('click',selectLevel)
formLayout.title.addEventListener('change', titleUpdate)
formLayout.width.addEventListener('change',sizeUpdate)
formLayout.height.addEventListener('change',sizeUpdate)
formLayout.marginTop.addEventListener('change',marginUpdate)
formLayout.marginRight.addEventListener('change',marginUpdate)
formLayout.marginBottom.addEventListener('change',marginUpdate)
formLayout.marginLeft.addEventListener('change',marginUpdate)
deleteButton.addEventListener('click',deleteChilds)
saveButton.addEventListener('click',save)

