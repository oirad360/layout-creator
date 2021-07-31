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

function onJson(json){
    const main=document.querySelector('main')
    main.style.overflow="auto"
    main.style.border="2px solid black"
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
        for(property of Object.keys(child)){
            if(property!=="id" && property!=="layout_id" && property!=="data_gen" && property!=="data_id" && property!=="data_parent_gen" && property!=="data_parent_id"){
                childNode.style[property]=child[property]
            }
        }
        const parent=document.querySelector("[data-gen=\'"+child.data_parent_gen+"\'][data-id=\'"+child.data_parent_id+"\']")
        parent.appendChild(childNode)
    }

}

const username=document.body.dataset.username
const layoutID=document.body.dataset.layout
fetch(app_url+"/layout/loadLayout/"+username+"/"+layoutID).then(onResponse).then(onJson)