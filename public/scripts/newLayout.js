function salva(){
    if(document.querySelector('meta[name=logged][content=true]')){
        bottoneSalva.innerText=""
        const loading=document.createElement('img')
        loading.height=17
        loading.width=17
        loading.src="/provaTesi/public/loading.gif"
        bottoneSalva.appendChild(loading)
        layoutCreator.save().then(function(layoutID){
            fetch(app_url+"/newLayout/saveUsersLayout/"+layoutID).then(function(response){
                if(response.ok){
                    bottoneSalva.querySelector('img').remove()
                    bottoneSalva.innerText="Salvataggio effettuato"
                }
            })
        })
    } else {
        bottoneSalva.innerText="Effettua l'accesso per salvare"
    }
}

const bottoneSalva = document.createElement('button')
bottoneSalva.innerText="Salva"
const layoutCreator = new LayoutCreator(bottoneSalva,"600px","100%")
document.body.appendChild(layoutCreator.layoutMenu)
document.body.appendChild(layoutCreator.layoutContainer)
bottoneSalva.addEventListener('click',salva)
