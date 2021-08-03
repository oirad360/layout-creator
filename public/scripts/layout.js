function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function onResponse(response){
    return response.json()
}
function setChild(child,titleText){
    const title=document.createElement('h2')
    title.style.margin="10px"
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
function onJson(json){
    const main=document.querySelector('#layoutContainer')
    main.style.overflow="auto"
    main.dataset.gen=0
    main.dataset.id=0
    for(property of Object.keys(json)){
        if(property!=="id" && property!=="user_id" && property!=="childs"){
            main.style[property]=json[property]
        }
    }
    const childs=json.childs
    for(child of childs){
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
        if(child.hasChilds==1) childNode.classList.add("hasChilds")
        else setChild(childNode,child.title)
        let i=1
        for(property of Object.keys(child)){
            if(i>8){
                childNode.style[property]=child[property]
            }
            i++;
        }
        const parent=document.querySelector("[data-gen=\'"+child.data_parent_gen+"\'][data-id=\'"+child.data_parent_id+"\']")
        parent.appendChild(childNode)
    }

}


const layoutID=document.body.dataset.layout
fetch(app_url+"/layout/loadLayout/"+layoutID).then(onResponse).then(onJson)