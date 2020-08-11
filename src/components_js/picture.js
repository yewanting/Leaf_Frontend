function pic(target,idnum,img,height){
   
    var pic = document.createElement("img");
    pic.src = img;
    pic.setAttribute("draggable","true");
    pic.id = "source"+idnum;
    pic.style.width = target.clientWidth + "px";
    pic.style.height = height+"px";



    target.appendChild(pic)

   
}

export {pic}