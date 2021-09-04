const items = document.querySelectorAll('.acordeon .item .header button');



items.forEach(item => {
    item.addEventListener('click', event =>{
        const content = event.target.parentElement.nextElementSibling;
        console.log(content)
        content.classList.toggle('show');
    })
})