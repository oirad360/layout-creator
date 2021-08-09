const layoutID=document.querySelector('meta[name=layout]').content
let layoutCreator
if(layoutID!=="new") layoutCreator = new LayoutCreator(null,null,layoutID,true)
else {
    layoutCreator = new LayoutCreator("600px","100%")
}
document.body.appendChild(layoutCreator.layoutMenu)
document.body.appendChild(layoutCreator.layoutContainer)
