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
    lastSelectedWidth=parseInt(lastSelectedWidth.split("%")[0])
    form.width.value=lastSelectedWidth

    lastSelectedHeight=lastSelected.style.height.substring(5,lastSelected.style.height.length)
    lastSelectedHeight=parseInt(lastSelectedHeight.split("%")[0])
    form.height.value=lastSelectedHeight

    lastSelectedMarginTop=parseInt(lastSelected.style.marginTop.split("%")[0])
    form.marginTop.value=lastSelectedMarginTop

    lastSelectedMarginRight=parseInt(lastSelected.style.marginRight.split("%")[0])
    form.marginRight.value=lastSelectedMarginRight

    lastSelectedMarginBottom=parseInt(lastSelected.style.marginBottom.split("%")[0])
    form.marginBottom.value=lastSelectedMarginBottom

    lastSelectedMarginLeft=parseInt(lastSelected.style.marginLeft.split("%")[0])
    form.marginLeft.value=lastSelectedMarginLeft

}
function split(event){//è la funzione che mi permette di generare gli N figli dentro il div attualmente selezionato
    event.preventDefault()
    lastSelected.style.flexWrap="nowrap" //di default il div è un flex-wrap, direzione row
    lastSelected.style.flexDirection=form.flexDirection.value //siccome voglio che il div generi N figli disposti in un certo modo
                                                //allora tolgo il wrap e setto la flex-direction desiderata
    color=getRandomColor()
    const N=form.numSplit.value
    for(i=1; i<=N;i++){//generazione degli N figli (saranno tutti dei flex-wrap, row)
        const child=document.createElement('div')
        child.classList.add("child")
        child.dataset.gen=gen
        child.dataset.id=i
        child.style.display="flex"
        child.style.flexWrap="wrap"
        child.style.margin="1px"
        child.style.border="1px solid "+color
        child.style.flexShrink="0"
        const size1="calc("+100/N+"% - 4px)"//sottraggo dalla percentuale la quantità 2*(larghezzaMargine+larghezzaBordo)
        const size2="calc("+100+"% - 4px)"
        if(form.flexDirection.value==="row"){
            child.style.width=size1
            child.style.height=size2
        } else {
            child.style.height=size1
            child.style.width=size2
        }
        child.addEventListener('click',select)
        lastSelected.appendChild(child)
        counter++
        saveButton.classList.remove("hidden")
        textCount.innerText=counter;
    }
    lastSelected.style.borderStyle="solid"
    lastSelected=lastSelected.querySelector('.child[data-id=\'1\']')
    lastSelected.style.borderStyle="dashed"
    setSize(lastSelected)
    level.classList.remove("hidden")
    gen++
}

function select(event){//è la funzione che mi permette di selezionare il div che clicco
    lastSelected.style.borderStyle="solid"
    lastSelected=event.target
    lastSelected.style.borderStyle="dashed"
    setSize(lastSelected)
    level.classList.remove("hidden")
    const childs=lastSelected.querySelectorAll('.child')
    if(childs.length>0){
        splitCommands.classList.add("hidden")
        deleteButton.classList.remove("hidden")
    } else {
        splitCommands.classList.remove("hidden")
        deleteButton.classList.add("hidden")
    }
}

function selectLevel(){//è la funzione che mi permette di selezionare il padre del div attualmente selezionato
    deleteButton.classList.remove("hidden")
    lastSelected.style.borderStyle="solid"
    lastSelected.parentNode.style.borderStyle="dashed"
    lastSelected=lastSelected.parentNode
    if(lastSelected===main) {
        level.classList.add("hidden")
        sizeCommands.classList.add("hidden")
    }else{
        setSize(lastSelected)
    }
    splitCommands.classList.add("hidden")
}

function sizeUpdate(){//aggiorna le dimensioni del div selezionato, impostandole al valore che metto in input nel form
    marginTop=parseInt(lastSelected.style.marginTop.split("px")[0])
    marginRight=parseInt(lastSelected.style.marginRight.split("px")[0])
    marginBottom=parseInt(lastSelected.style.marginBottom.split("px")[0])
    marginLeft=parseInt(lastSelected.style.marginLeft.split("px")[0])
    border=parseInt(lastSelected.style.borderWidth.split("px")[0])
    lastSelected.style.width="calc("+form.width.value+"%)"
    lastSelected.style.height="calc("+form.height.value+"%)"
    console.log(lastSelected.style.width)
}

function marginUpdate(){
    lastSelected.style.margin=form.marginTop.value+"px "+form.marginRight.value+"px "+form.marginBottom.value+"px "+form.marginLeft.value+"px "
}

function deleteChilds(){//rimuove tutti i figli di un div (comprendendo anche i figli dei figli)
    childs=lastSelected.querySelectorAll(".child")
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
    splitCommands.classList.remove("hidden")
    if(lastSelected!==main) setSize(lastSelected)
    else lastSelected.style.borderStyle="solid"
}

function save(){
    //spedisci i dati dei div in formato json
}

let gen=1; //sta per "generazione", tiene conto del numero di suddivisioni effettuate in totale
//es: la prima volta che clicco "Dividi", i figli che otterrò avranno data-gen=1, la seconda volte avrò dei figli con data-gen=2 ecc...
//facciamo finta che i figli con stesso data-gen siano "fratelli"
//ogni figlio ha un data-id (un numero) univoco, che lo contraddistingue dagli altri "fratelli"
//dunque grazie a questi 2 valori riesco a identificare univocamente un div
let counter=0; //contatore di figli totali
const main=document.querySelector('main')
let lastSelected=main;
let lastSelectedColor=lastSelected.style.borderColor
const textCount=document.querySelector('#counter')
textCount.innerText=counter;
const form=document.forms['layout']
const level=document.querySelector('#level')
const deleteButton=document.querySelector('#delete')
const sizeCommands=document.querySelector('#size')
const error1=document.querySelector('#error1')
const error2=document.querySelector('#error2')
const splitCommands=document.querySelector('#split')
const saveButton=document.querySelector(" #save")
form.addEventListener('submit',split)
level.addEventListener('click',selectLevel)
form.width.addEventListener('change',sizeUpdate)
form.height.addEventListener('change',sizeUpdate)
form.marginTop.addEventListener('change',marginUpdate)
form.marginRight.addEventListener('change',marginUpdate)
form.marginBottom.addEventListener('change',marginUpdate)
form.marginLeft.addEventListener('change',marginUpdate)
deleteButton.addEventListener('click',deleteChilds)
saveButton.addEventListener('click',save)

