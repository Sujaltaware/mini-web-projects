let btn = document.querySelector("button");



btn.addEventListener("click", function(){
    let random = getrandom();
    let para = document.querySelector("p");
    para.innerText=random;
    let div = document.querySelector("div");
    div.style.backgroundColor= random ;

   
});







function getrandom(){
    let red = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);

    let color = `rgb(${red},${blue},${green})`;
    return color;
}