function modifica(){
    const newLayout=new LayoutCreator(null,null,layoutID,true)
    document.querySelector('#layoutContainer').remove()
    document.body.appendChild(newLayout.layoutMenu)
    document.body.appendChild(newLayout.layoutContainer)
    bottoneModifica.removeEventListener('click',modifica)
}


const layoutID=document.querySelector('meta[name=layout]').content
const layoutCreator=new LayoutCreator(null,null,layoutID)
document.body.appendChild(layoutCreator.layoutContainer)
const bottoneModifica=document.querySelector('#modifica')
bottoneModifica.addEventListener('click',modifica)