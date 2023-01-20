const menuMobile = document.querySelector('#menu-mobile');
const overlay = document.querySelector('#overlay');
const showMenu = document.querySelector('#show-menu');
const hideMenu = document.querySelector('#hide-menu');


const classList = {
    visible = 'visible',
    hidden = 'hidden',
    block = 'block',
    none = 'none'
}

const toggleElement =(element, classAdded, classRemoved) => {
    element.classList.add(classAdded);
    element.classList.remove(classRemoved);
}

showMenu.addEventListener('click', () => {
    toggleElement(overlay, classList.visible, classList.hidden);
    toggleElement(menuMobile, classList.visible, classList.hidden);
    toggleElement(hideMenu, classList.block, classList.none);
    toggleElement(showMenu, classList.none, classList.block);
})

hideMenu.addEventListener('click', () => {
    toggleElement(overlay, classList.hidden, classList.visible);
    toggleElement(menuMobile, classList.hidden, classList.visible);
    toggleElement(hideMenu, classList.none, classList.block);
    toggleElement(showMenu, classList.block, classList.none);
})