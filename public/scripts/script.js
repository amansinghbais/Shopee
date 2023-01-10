
function catFunction(cat){
    var catLinks = document.querySelectorAll('.catLink')
    var products = document.querySelectorAll('.prod-card')
    products.forEach((prod)=>{
        prod.style.display = 'flex'
        
    })
    if(cat === 'all'){
        products.forEach((prod)=>{
            prod.style.display = 'flex'
        })
    }else{
        products.forEach((prod)=>{
            if(prod.getAttribute("value") != cat){
                prod.style.display = 'none'
            }
            
        })
    }
    catLinks.forEach((link)=>{
        if(link.getAttribute('value') == cat){
            link.classList.add('activeCat')
        }else{
            link.classList.remove('activeCat')
        }
    })
}