const burgerMenu = document.querySelector('.navbar .hamburgerMenu');
const background = document.querySelector('.navbar .background');
const burgerMenuItems = document.querySelectorAll('.navbar .hamburgerMenu ul li');
// const burgerMenuButton = document.querySelector('.navbar .hamburgerMenu button').classList;

function openMenu(){
    burgerMenu.classList.add('open')
    background.classList.add('open')
}

function closeMenu(){
    burgerMenu.classList = 'hamburgerMenu';
    background.classList = 'background'
}

burgerMenuItems.forEach(item =>{
    item.addEventListener('click', ()=>closeMenu())
})

