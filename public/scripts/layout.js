function modifica(){
    layoutCreator.modify()
    document.body.insertBefore(layoutCreator.layoutMenu,layoutCreator.layoutContainer)
    bottoneSalva.addEventListener('click',salva)
}

function salva(){
    bottoneSalva.removeEventListener('click',salva)
    bottoneSalva.innerText=""
    const loading=document.createElement('img')
    loading.height=17
    loading.width=17
    loading.src="/provaTesi/public/loading.gif"
    bottoneSalva.appendChild(loading)
    layoutCreator.save().then(function(){
        bottoneSalva.querySelector('img').remove()
        bottoneSalva.innerText="Salvataggio effettuato"
        bottoneSalva.addEventListener('click',salva)
    })
}

const layoutID=document.querySelector('meta[name=layout]').content
const bottoneSalva=document.createElement('button')
bottoneSalva.innerText="Salva"
const layoutCreator=new LayoutCreator(bottoneSalva)
layoutCreator.loadLayout(layoutID)
document.body.appendChild(layoutCreator.layoutContainer)
const bottoneModifica=document.querySelector('#modifica')
bottoneModifica.addEventListener('click',modifica)