class LayoutCreator {
    constructor(height,width,layoutID,modify){
        this.gen=0

        this.layoutMenu=document.createElement('div')
        this.layoutMenu.id="layoutMenu"

        this.levelButton=document.createElement('button')
        this.levelButton.classList.add("hidden")
        this.levelButton.id="levelButton"
        this.levelButton.innerText="Seleziona livello superiore"

        this.deleteButton=document.createElement('button')
        this.deleteButton.classList.add("hidden")
        this.deleteButton.id="deleteButton"
        this.deleteButton.innerText="Svuota sezione"

        this.saveButton=document.createElement('button')
        this.saveButton.classList.add("hidden")
        this.saveButton.id="saveButton"
        this.saveButton.innerText="Salva"

        this.addChildButton=document.createElement('button')
        this.addChildButton.classList.add("hidden")
        this.addChildButton.id="addChildButton"
        this.addChildButton.innerText="Aggiungi sezione"

        this.removeChildButton=document.createElement('button')
        this.removeChildButton.classList.add("hidden")
        this.removeChildButton.id="removeChildButton"
        this.removeChildButton.innerText="Rimuovi sezione"

        this.layoutMenu.appendChild(this.saveButton)
        this.layoutMenu.appendChild(this.levelButton)
        this.layoutMenu.appendChild(this.deleteButton)
        this.layoutMenu.appendChild(this.addChildButton)
        this.layoutMenu.appendChild(this.removeChildButton)

        this.formLayout=document.createElement('form')
        this.formLayout.name="layout"

        const textCounter=document.createElement('div')
        textCounter.id="textCounter"
        textCounter.innerText="Contatore: "
        this.counter=document.createElement('span')
        this.counter.id="count"
        this.counter.innerText=0
        textCounter.appendChild(this.counter)
        this.formLayout.appendChild(textCounter)

        this.sizeCommands=document.createElement('div')
        this.sizeCommands.id="sizeCommands"
        this.sizeCommands.classList.add("hidden")

        this.splitCommands=document.createElement('div')
        this.splitCommands.id="splitCommands"

        const labelsText=[
            "Modifica larghezza (%):",
            "Modifica altezza (%):",
            "Modifica margine sup (px):",
            "Modifica margine dx (px):",
            "Modifica margine inf (px):",
            "Modifica margine sx (px):",
            "Titolo: ",
            "Font (px): ",
            "Numero di suddivisioni: ",
            "Disponi in direzione"
        ]
        const inputsInfos=[
            {
                "min":0,
                "name":"width",
                "type":"number",
                "step":"any"
            },{
                "min":0,
                "name":"height",
                "type":"number",
                "step":"any"
            },{
                "name":"marginTop",
                "type":"number"
            },{
                "name":"marginRight",
                "type":"number"
            },{
                "name":"marginBottom",
                "type":"number"
            },{
                "name":"marginLeft",
                "type":"number"
            },{
                "name":"title"
            },{
                "name":"fontSize",
                "min":0,
                "type":"number"
            },{
                "min":2,
                "name":"numSplit",
                "type":"number",
                "value":2
            }
        ]
        for(let i=0;i<10;i++){
            const labels=document.createElement('label')
            labels.innerText=labelsText[i]
            if(i<9){
                const input=document.createElement('input')
                for(let key of Object.keys(inputsInfos[i])){
                    input[key]=inputsInfos[i][key]
                }
                labels.appendChild(input)
                if(i<6) this.sizeCommands.appendChild(labels)
                else if(i===6 || i===7) {
                    labels.classList.add("titleCommand","hidden")
                    this.splitCommands.appendChild(labels)
                } else {
                    this.splitCommands.appendChild(labels)
                }
            } else {
                const select=document.createElement('select')
                select.name="flexDirection"
                const option1=document.createElement('option')
                option1.value="row"
                option1.innerText="orizzontale"
                select.appendChild(option1)
                const option2=document.createElement('option')
                option2.value="column"
                option2.innerText="verticale"
                select.appendChild(option2)
                labels.appendChild(select)
                this.formLayout.appendChild(labels)
                const input=document.createElement('input')
                input.value="Dividi"
                input.type="submit"
                this.splitCommands.appendChild(input)
            }
        }

        this.formLayout.appendChild(this.sizeCommands)
        this.formLayout.appendChild(this.splitCommands)

        this.titleCommands=this.splitCommands.querySelectorAll('.titleCommand')
        this.layoutMenu.appendChild(this.formLayout)
        
        this.layoutContainer=document.createElement('div')
        this.layoutContainer.id='layoutContainer'
        this.layoutContainer.dataset.layout="new"
        this.layoutContainer.style.height=height
        this.layoutContainer.style.width=width
        this.layoutContainer.dataset.id=0
        this.layoutContainer.dataset.gen=0
        this.layoutContainer.style.flexShrink=0
        this.layoutContainer.style.overflow="auto"
        
        this.lastSelected=this.layoutContainer

        this.selectBinded=this.select.bind(this)

        this.splitBinded=this.split.bind(this)
        this.formLayout.addEventListener('submit',this.splitBinded)

        this.selectLevelBinded=this.selectLevel.bind(this)
        this.levelButton.addEventListener('click',this.selectLevelBinded)

        this.addChildBinded=this.addChild.bind(this)
        this.addChildButton.addEventListener('click',this.addChildBinded)

        this.removeChildBinded=this.removeChild.bind(this)
        this.removeChildButton.addEventListener('click',this.removeChildBinded)

        this.titleUpdateBinded=this.titleUpdate.bind(this)
        this.formLayout.title.addEventListener('change', this.titleUpdateBinded)

        this.fontUpdateBinded=this.fontUpdate.bind(this)
        this.formLayout.fontSize.addEventListener('change',this.fontUpdateBinded)

        this.sizeUpdateBinded=this.sizeUpdate.bind(this)
        this.formLayout.width.addEventListener('change',this.sizeUpdateBinded)
        this.formLayout.height.addEventListener('change',this.sizeUpdateBinded)

        this.marginUpdateBinded=this.marginUpdate.bind(this)
        this.formLayout.marginTop.addEventListener('change',this.marginUpdateBinded)
        this.formLayout.marginRight.addEventListener('change',this.marginUpdateBinded)
        this.formLayout.marginBottom.addEventListener('change',this.marginUpdateBinded)
        this.formLayout.marginLeft.addEventListener('change',this.marginUpdateBinded)

        this.flexDirectionUpdateBinded=this.flexDirectionUpdate.bind(this)
        this.formLayout.flexDirection.addEventListener('change',this.flexDirectionUpdateBinded)

        this.deleteChildsBinded=this.deleteChilds.bind(this)
        this.deleteButton.addEventListener('click',this.deleteChildsBinded)

        this.saveBinded=this.save.bind(this)
        this.saveButton.addEventListener('click',this.saveBinded)

        if(layoutID){
            fetch(app_url+"/layout/loadLayout/"+layoutID).then(function (response){
                return response.json()
            }).then((function (json){
                for(let property of Object.keys(json)){
                    if(property!=="id" && property!=="user_id" && property!=="childs"){
                        this.layoutContainer.style[property]=json[property]
                    }
                }
                this.layoutContainer.dataset.layout=layoutID
                this.layoutContainer.classList.add("hasChilds")
                let lastGen=json.childs[0].data_gen
                let color=this.getRandomColor()
                for(let child of json.childs){
                    const childNode=document.createElement('div')
                    childNode.classList.add('child')
                    childNode.style.overflow="auto"
                    childNode.style.flexShrink="0";
                    if(child.data_gen!==lastGen){
                        color=this.getRandomColor()
                    }
                    childNode.style.border="1px solid "+color
                    lastGen=child.data_gen
                    childNode.dataset.gen=child.data_gen
                    childNode.dataset.id=child.data_id
                    childNode.dataset.parent_gen=child.data_parent_gen
                    childNode.dataset.parent_id=child.data_parent_id
                    for(let i=9;i<Object.keys(child).length;i++){
                        childNode.style[Object.keys(child)[i]]=child[Object.keys(child)[i]]
                    }
                    if(child.hasChilds==1) {
                        childNode.classList.add("hasChilds")
                    } else {
                        if(child.title) this.setChild(childNode,child.title,child.fontSize.split('px')[0])
                        else this.setChild(childNode,child.title,24)
                        if(modify===true) childNode.addEventListener('click',this.selectBinded)
                        else if(!child.title) childNode.querySelector('h2').remove()
                    }
                    let parent
                    if(child.data_parent_gen===0 && child.data_parent_id===0) parent=layoutContainer
                    else parent=layoutContainer.querySelector("[data-gen=\'"+child.data_parent_gen+"\'][data-id=\'"+child.data_parent_id+"\']")
                    parent.appendChild(childNode)
                    if(modify===true){
                        this.counter.innerText++
                        this.gen=child.data_gen
                    }
                }
                if(modify===true){
                    const childs=layoutContainer.querySelectorAll('.child')
                    for(let child of childs){
                        if(!child.classList.contains("hasChilds")) {
                            const click = new Event('click')
                            child.dispatchEvent(click)
                            break
                        }
                    }
                }
            }).bind(this))
        }
    }
    
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    setSize(lastSelected, formLayout){//è una funzione che chiamo ogni qualvolta voglio mostrare i campi per l'inserimento
        //della larghezza, altezza e margini che mostreranno inizialmente le dimensioni attuali del div selezionato
    let lastSelectedFlexDirection=lastSelected.style.flexDirection
    formLayout.flexDirection.value=lastSelectedFlexDirection
    
    formLayout.querySelector('#sizeCommands').classList.remove("hidden")
    let lastSelectedWidth=lastSelected.style.width.substring(5,lastSelected.style.width.length)
    lastSelectedWidth=lastSelectedWidth.split("%")[0]
    formLayout.width.value=lastSelectedWidth
    
    let lastSelectedHeight=lastSelected.style.height.substring(5,lastSelected.style.height.length)
    lastSelectedHeight=lastSelectedHeight.split("%")[0]
    formLayout.height.value=lastSelectedHeight
    
    let lastSelectedMarginTop=parseInt(lastSelected.style.marginTop.split("%")[0])
    formLayout.marginTop.value=lastSelectedMarginTop
    
    let lastSelectedMarginRight=parseInt(lastSelected.style.marginRight.split("%")[0])
    formLayout.marginRight.value=lastSelectedMarginRight
    
    let lastSelectedMarginBottom=parseInt(lastSelected.style.marginBottom.split("%")[0])
    formLayout.marginBottom.value=lastSelectedMarginBottom
    
    let lastSelectedMarginLeft=parseInt(lastSelected.style.marginLeft.split("%")[0])
    formLayout.marginLeft.value=lastSelectedMarginLeft
    
    }
    
    setChild(child,titleText,titleSize){//è una funzione che chiamo ogni qualvolta voglio inserire titolo e sezione in un div
        child.style.display="flex"
        child.style.flexDirection="column"
        const title=document.createElement('h2')
        title.style.margin="10px"
        title.style.fontSize=titleSize+"px"
        title.innerText=titleText
        child.appendChild(title)
        const section=document.createElement('section')
        section.style.width="100%"
        section.style.overflow="auto"
        section.style.display="flex"
        section.style.flexDirection="row"
        section.style.flexWrap="wrap"
        child.appendChild(section)
    }
    
    select(event){//è la funzione che mi permette di selezionare il div che clicco
        this.addChildButton.classList.add("hidden")
        this.removeChildButton.classList.add("hidden")
        if(this.lastSelected!==this.layoutContainer)this.lastSelected.style.borderStyle="solid"
        else this.lastSelected.style.borderStyle=""
        this.lastSelected=event.currentTarget
        const gen=this.lastSelected.dataset.gen
        if(document.querySelectorAll("[data-gen=\'"+gen+"\']").length>2) this.removeChildButton.classList.remove("hidden")
        else this.removeChildButton.classList.add("hidden")
        this.lastSelected.style.borderStyle="dashed"
        this.setSize(this.lastSelected, this.formLayout)
        this.levelButton.classList.remove("hidden")
        this.titleCommands[0].classList.remove("hidden")
        this.titleCommands[1].classList.remove("hidden")
        const childs=this.lastSelected.querySelectorAll('.child')
        if(childs.length>0){
            this.splitCommands.classList.add("hidden")
            this.deleteButton.classList.remove("hidden")
        } else {
            this.splitCommands.classList.remove("hidden")
            this.deleteButton.classList.add("hidden")
            this.formLayout.title.value=this.lastSelected.childNodes[0].innerText
            this.formLayout.fontSize.value=this.lastSelected.childNodes[0].style.fontSize.split('px')[0]
        }
    }

    split(event){//è la funzione che mi permette di generare gli N figli dentro il div attualmente selezionato
        event.preventDefault()
        this.gen++
        this.lastSelected.innerHTML="" //lastSelected è il div "padre" che è stato selezionato per essere suddiviso
        this.lastSelected.classList.add("hasChilds")
        this.lastSelected.removeEventListener('click',this.selectBinded)
        this.lastSelected.style.display="flex"
        this.lastSelected.style.flexDirection=this.formLayout.flexDirection.value
        const color=this.getRandomColor()
        const N=this.formLayout.numSplit.value
        for(let i=1; i<=N;i++){//generazione degli N figli
            const child=document.createElement('div')
            child.classList.add("child")
            child.dataset.gen=this.gen
            child.dataset.id=i
            child.dataset.parent_gen=this.lastSelected.dataset.gen
            child.dataset.parent_id=this.lastSelected.dataset.id
            child.style.margin="1px"
            child.style.border="1px solid "+color
            child.style.flexShrink="0"
            child.style.overflow="auto"
            const size1="calc("+100/N+"% - 4px)"//sottraggo dalla percentuale la quantità 2*(larghezzaMargine+larghezzaBordo)
            const size2="calc("+100+"% - 4px)"
            if(this.formLayout.flexDirection.value==="row"){
                child.style.width=size1
                child.style.height=size2
            } else {
                child.style.height=size1
                child.style.width=size2
            }
            this.setChild(child,"Inserisci un titolo",24)//imposto il titolo e la section nel figlio appena creato
            child.addEventListener('click',this.selectBinded) //lo rendo selezionabile
            this.lastSelected.appendChild(child) //lo inserisco nel padre
            this.counter.innerText++
            this.saveButton.classList.remove("hidden")
            this.titleCommands[0].classList.remove("hidden")
            this.titleCommands[1].classList.remove("hidden")
        }
        const click= new Event('click') //adesso seleziono il primo figlio, come se, dopo aver generato tutti i figli, facessi click sul primo
        this.lastSelected.querySelector('.child[data-id=\'1\']').dispatchEvent(click)//dunque dopo questa istruzione lastSelected diventerà il primo figlio che è stato generato dentro il padre (l'ex lastSelected, vedi il funzionamento di select())
    }
    
    selectLevel(){//è la funzione che mi permette di selezionare il padre del div attualmente selezionato
        this.addChildButton.classList.remove("hidden")
        this.deleteButton.classList.remove("hidden")
        this.lastSelected.style.borderStyle="solid"
        this.lastSelected=this.lastSelected.parentNode
        const gen=this.lastSelected.dataset.gen
        if(document.querySelectorAll("[data-gen=\'"+gen+"\']").length>2) this.removeChildButton.classList.remove("hidden")
        else this.removeChildButton.classList.add("hidden")
        if(this.lastSelected!==this.layoutContainer) {
            this.setSize(this.lastSelected, this.formLayout)
        }else{
            const lastSelectedFlexDirection=this.lastSelected.style.flexDirection
            this.formLayout.flexDirection.value=lastSelectedFlexDirection
            this.levelButton.classList.add("hidden")
            this.sizeCommands.classList.add("hidden")
        }
        this.lastSelected.style.borderStyle="dashed"
        this.splitCommands.classList.add("hidden")
    }
    
    sizeUpdate(){//aggiorna le dimensioni del div selezionato, impostandole al valore che metto in input nel form, stessa cosa per marginUpdate,titleUpdate,fontUpdate
        const border=parseInt(this.lastSelected.style.borderWidth.split("px")[0])
        this.lastSelected.style.width="calc("+this.formLayout.width.value+"% - "+(parseInt(this.formLayout.marginRight.value)+parseInt(this.formLayout.marginLeft.value)+2*border)+"px)"
        this.lastSelected.style.height="calc("+this.formLayout.height.value+"% - "+(parseInt(this.formLayout.marginBottom.value)+parseInt(this.formLayout.marginTop.value)+2*border)+"px)"
        this.saveButton.classList.remove("hidden")
    }
    
    marginUpdate(){//aggiorna le dimensioni dei margini del div selezionato
        const border=parseInt(this.lastSelected.style.borderWidth.split("px")[0])
        this.lastSelected.style.margin=this.formLayout.marginTop.value+"px "+this.formLayout.marginRight.value+"px "+this.formLayout.marginBottom.value+"px "+this.formLayout.marginLeft.value+"px "
        this.lastSelected.style.width="calc("+this.formLayout.width.value+"% - "+(parseInt(this.formLayout.marginRight.value)+parseInt(this.formLayout.marginLeft.value)+2*border)+"px)"
        this.lastSelected.style.height="calc("+this.formLayout.height.value+"% - "+(parseInt(this.formLayout.marginBottom.value)+parseInt(this.formLayout.marginTop.value)+2*border)+"px)"
        this.saveButton.classList.remove("hidden")
    }
    
    titleUpdate(){//aggiorna il titolo del div selezionato
        this.lastSelected.childNodes[0].innerText=this.formLayout.title.value
        this.saveButton.classList.remove("hidden")
    }
    
    fontUpdate(){//aggiorna le dimensioni del font del titolo
        this.lastSelected.childNodes[0].style.fontSize=this.formLayout.fontSize.value+"px"
        this.saveButton.classList.remove("hidden")
    }
    
    flexDirectionUpdate(){//cambia la flex-direction del div selezionato
        if(this.lastSelected.classList.contains('hasChilds') && this.formLayout.flexDirection.value!==this.lastSelected.style.flexDirection){
            this.saveButton.classList.remove("hidden")
            this.lastSelected.style.flexDirection=this.formLayout.flexDirection.value
            const gen=this.lastSelected.childNodes[1].dataset.gen
            const childs = this.lastSelected.querySelectorAll(".child")
            for(const child of childs){
                const height=child.style.height
                child.style.height=child.style.width
                child.style.width=height
                if(child.classList.contains('hasChilds')){
                    if(child.style.flexDirection==="row") child.style.flexDirection="column"
                    else child.style.flexDirection="row"
                }
            }
        }
    }

    addChild(){//aggiunge un div figlio dentro il div selezionato (che contiene almeno 2 figli)
        const child=document.createElement('div')
        child.classList.add("child")
        child.dataset.gen=this.lastSelected.childNodes[1].dataset.gen
        child.dataset.id=parseInt(this.lastSelected.childNodes[this.lastSelected.childNodes.length-1].dataset.id)+1
        child.dataset.parent_gen=this.lastSelected.dataset.gen
        child.dataset.parent_id=this.lastSelected.dataset.id
        child.style.margin="1px"
        child.style.border="1px solid "+this.lastSelected.childNodes[1].style.borderColor
        child.style.flexShrink="0"
        child.style.overflow="auto"
        const N=this.lastSelected.childNodes.length+1
        const size1="calc("+100/N+"% - 4px)"//sottraggo dalla percentuale la quantità 2*(larghezzaMargine+larghezzaBordo)
        const size2="calc("+100+"% - 4px)"
        if(this.lastSelected.style.flexDirection==="row"){
            child.style.width=size1
            child.style.height=size2
        } else {
            child.style.height=size1
            child.style.width=size2
        }
        this.setChild(child,"Inserisci un titolo",24)//imposto il titolo e la section nel figlio appena creato
        child.addEventListener('click',this.selectBinded) //lo rendo selezionabile
        this.lastSelected.appendChild(child) //lo inserisco nel padre
        this.counter.innerText++
        this.saveButton.classList.remove("hidden")
    }

    removeChild(){//rimuove un div figlio dal div selezionato (solo se contiene più di 2 figli)
        const parent=this.lastSelected.parentNode
        const length=this.lastSelected.querySelectorAll('.child').length+1
        this.lastSelected.remove()
        this.counter.innerText-=length
        const click=new Event('click')
        parent.querySelector('.child').dispatchEvent(click)

    }

    deleteChilds(){//rimuove tutti i figli del div selezionato (comprendendo anche i figli dei figli)
        const childs=this.lastSelected.querySelectorAll(".child")
        this.addChildButton.classList.add("hidden")
        this.removeChildButton.classList.add("hidden")
        for(let child of childs){
            child.remove()
            this.counter.innerText--
        }
        this.lastSelected.classList.remove("hasChilds")
        if(this.counter.innerText==0){
            this.saveButton.classList.add("hidden")
            this.titleCommands[0].classList.add("hidden")
            this.titleCommands[1].classList.add("hidden")
        }
        else {
            this.saveButton.classList.remove("hidden")
            this.lastSelected.addEventListener('click',this.selectBinded)
            this.setChild(this.lastSelected,"Inserisci un titolo",24)
            this.formLayout.title.value="Inserisci un titolo"
            this.formLayout.fontSize.value=24
            this.titleCommands[0].classList.remove("hidden")
            this.titleCommands[1].classList.remove("hidden")
            this.setSize(this.lastSelected, this.formLayout)
        }
        this.deleteButton.classList.add("hidden")
        this.splitCommands.classList.remove("hidden")
    }
    
    save(){//salva il layout
        const data={
            "layout": {
                "id": this.layoutContainer.dataset.layout,
                "display": this.layoutContainer.style.display,
                "flexDirection": this.layoutContainer.style.flexDirection,
                "height": this.layoutContainer.style.height,
                "width": this.layoutContainer.style.width
            },
            "childs": []
        }
        for(let i=1;i<=this.gen;i++){
            const childs=this.layoutContainer.querySelectorAll(".child[data-gen=\'"+i+"\']")
            let fontSize,title
            for(let child of childs){
                if(child.classList.contains("hasChilds")){
                    title=null
                    fontSize=null
                } else {
                    title=child.childNodes[0].innerText
                    if(title) fontSize=child.childNodes[0].style.fontSize
                    else fontSize=null
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
        }).then(function(response){
            return response.text()
        }).then((function(layoutID){
            if(layoutID) this.layoutContainer.dataset.layout=layoutID
            //if(text==="1") window.location.replace(app_url+"/home") 
            else this.saveButton.innerText="Effettua il login per salvere"
        }).bind(this))
    }
}

