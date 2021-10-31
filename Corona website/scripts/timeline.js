function isElementInViewport(el) {     
    var rect = el.getBoundingClientRect();     
    return (       
        rect.top >= 0 &&       
        rect.left >= 0 &&       
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&       
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)     
    );   
}

let elements= document.querySelectorAll(".timeline li");

function callbackFunc(){
   for(let i= 0; i<elements.length; i++){
       let element= elements[i];
       if(isElementInViewport(element)){
           element.classList.add("in-view")
       }
   }
}

window.addEventListener("scroll", callbackFunc)