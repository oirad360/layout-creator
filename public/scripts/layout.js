function modifica(){
    layoutCreator.modify()
    document.body.appendChild(layoutCreator.layoutMenu)
}

const layoutID=document.querySelector('meta[name=layout]').content
const layoutCreator=new LayoutCreator()
layoutCreator.loadLayout(layoutID)
document.body.appendChild(layoutCreator.layoutContainer)
const bottoneModifica=document.querySelector('#modifica')
bottoneModifica.addEventListener('click',modifica)