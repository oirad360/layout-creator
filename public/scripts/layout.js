function modifica(){
    const newLayout=new LayoutCreator(null,null,layoutID,true)
    document.querySelector('#layoutContainer').remove()
    document.body.appendChild(newLayout.layoutMenu)
    document.body.appendChild(newLayout.layoutContainer)
    document.querySelector('#modifica').removeEventListener('click',modifica)
}

const layoutID=document.querySelector('meta[name=layout]').content
const layoutCreator=new LayoutCreator(null,null,layoutID)
document.body.appendChild(layoutCreator.layoutContainer)
document.querySelector('#modifica').addEventListener('click',modifica)