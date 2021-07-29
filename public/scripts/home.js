function onResponse(response){
    return response.json()
}

function onJson(json){
    console.log(json)
    const div=document.querySelector('#layouts')
    for(item of json){
        const link=document.createElement('a');
        link.href=app_url+"/layout/"+item.id
        link.innerText=item.id+" "
        div.appendChild(link)
    }
}


fetch(app_url+"/home/fetchLayouts").then(onResponse).then(onJson)