const items = document.querySelectorAll('.items')
items.forEach(item => {
    const btn = item.querySelector('button')
    btn.addEventListener('click', ()=>{
        item.remove()
    })
})