function onResponse(response){
    return response.json()
}

function onJson(json){
    console.log(json)
    for(item of json){
        const link=document.createElement('a');
        link.href=app_url+"/vetrina/"+item.username
        link.innerText=item.username+" "
        document.body.appendChild(link)
    }
}


fetch(app_url+"/home/fetchUtenti").then(onResponse).then(onJson)