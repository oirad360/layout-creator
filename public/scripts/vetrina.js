function onResponse(response){
    return response.json()
}

function onJson(json){
    let i=1
    for(item of json){
        const cols=[]
        for(key of Object.keys(item)){
            if(key.includes("col") && item[key]){
                cols.push(key)
            }
        }
        for(col of cols){
            const section=document.querySelector("section[data-row='"+i+"'][data-col='"+col[3]+"']")
            propertyJson=JSON.parse(item[col])
            properties=Object.keys(propertyJson)
            for(property of properties){
                if(property==="width"){
                    margin=propertyJson.margin.substring(0,propertyJson.margin.length-2)
                    section.style.width="calc("+propertyJson[property]+" - "+(2*margin).toString()+"px)"
                }else
                section.style.setProperty(property, propertyJson[property])
            }
        }
        i++
    }
}



const username=document.querySelector('main').dataset.username
fetch(app_url+"/vetrina/fetchLayouts/"+username).then(onResponse).then(onJson)