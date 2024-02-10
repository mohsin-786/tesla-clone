const sections = document.querySelectorAll('section')


window.addEventListener('scroll', ()=>{
    const windowPosition = Math.floor(window.pageYOffset);
    sections.forEach(section =>{
    const sectionPosition = section.offsetTop;
        if(sectionPosition === windowPosition || sectionPosition-windowPosition <= 120 && sectionPosition-windowPosition >= -120){
            section.classList.add('open')
        }else{
            section.classList = '';
        }
    })
})

