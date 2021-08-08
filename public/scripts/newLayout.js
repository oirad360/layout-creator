const layoutContainer=document.querySelector('main')
let layoutCreator
if(layoutContainer.dataset.layout!=="new") layoutCreator = new LayoutCreator(layoutContainer,layoutContainer.dataset.layout,true)
else {
    layoutCreator = new LayoutCreator(layoutContainer)
}

document.body.appendChild(layoutCreator.layoutMenu)