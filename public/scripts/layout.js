const layoutID=document.querySelector('meta[name=layout]').content
const layoutCreator=new LayoutCreator(null,null,layoutID)
document.body.appendChild(layoutCreator.layoutContainer)
