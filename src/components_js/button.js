function button(target,idnum){
    let btn = document.createElement("button");
    btn.id = "source"+idnum;
    
    btn.setAttribute("draggable","true");
    btn.style.width = target.clientWidth + "px";
    btn.textContent = "按钮"+idnum;
    target.appendChild(btn)

}

export {button}