const layoutContainer=document.querySelector('main')
const layoutID=document.querySelector('main').dataset.layout
const layoutCreator=new LayoutCreator(layoutContainer,layoutID)
document.body.appendChild(layoutCreator.layoutMenu)