function onResponse(response){
    return response.json()
}

function onJson(json){
    const container=document.querySelector('#layouts')
    const users = Object.keys(json)
    for(user of users){
        const div=document.createElement('div')
        const text=document.createElement('span')
        text.innerText="layouts di "+user+": "
        div.appendChild(text)
        for(layout of json[user]){
            const link=document.createElement('a');
            link.href=app_url+"/layout/"+user+"/"+layout
            link.innerText=layout+" "
            div.appendChild(link)
        }
        
        container.appendChild(div)
    }
}


fetch(app_url+"/home/fetchLayouts").then(onResponse).then(onJson)