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

function setChild(child,titleText,titleSize){//è una funzione che chiamo ogni qualvolta voglio inserire titolo e sezione in un div
    child.style.display="flex"
    child.style.flexDirection="column"
    child.style.flexWrap="nowrap"
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

function loadLayout(layoutID, modify){
    fetch(app_url+"/layout/loadLayout/"+layoutID).then(function (response){
        return response.json()
    }).then(function (json){
        console.log(json)
        const main=document.querySelector('#layoutContainer')
        main.innerHTML=""
        main.style.overflow="auto"
        main.dataset.gen=0
        main.dataset.id=0
        for(property of Object.keys(json)){
            if(property!=="id" && property!=="user_id" && property!=="childs"){
                main.style[property]=json[property]
            }
        }
        for(child of json.childs){
            const childNode=document.createElement('div')
            childNode.classList.add('child')
            childNode.style.overflow="auto"
            childNode.style.flexShrink="0";
            const color=getRandomColor()
            childNode.style.border="1px solid "+color
            childNode.dataset.gen=child.data_gen
            childNode.dataset.id=child.data_id
            childNode.dataset.parent_gen=child.data_parent_gen
            childNode.dataset.parent_id=child.data_parent_id
            for(i=9;i<Object.keys(child).length;i++){
                childNode.style[Object.keys(child)[i]]=child[Object.keys(child)[i]]
            }
            if(child.hasChilds==1) {
                childNode.classList.add("hasChilds")
            }else {
                setChild(childNode,child.title,child.fontSize)
                if(modify===true) childNode.addEventListener('click',select)
            }
            
            const parent=document.querySelector("[data-gen=\'"+child.data_parent_gen+"\'][data-id=\'"+child.data_parent_id+"\']")
            parent.appendChild(childNode)
            if(modify===true){
                counter++
                gen=child.data_gen
            }
        }
        if(modify===true){
            textCount.innerText=counter;
            const childs=main.querySelectorAll('.child')
            for(child of childs){
                if(!child.classList.contains("hasChilds")) {
                    const click = new Event('click')
                    lastSelected=child.parentNode
                    child.dispatchEvent(click)
                    break
                }
            }
        }
    })
}