function banner(target,idnum,imgs,height){
    let ul = document.createElement("ul");
    // ul.id = "source"+idnum;
    // ul.setAttribute("draggable","true");
    ul.style.listStyle = "none";
    ul.style.padding = 0;
    console.log(imgs);
    for(let i = 0 ; i < imgs.length;i++)
    {

        let li_item = document.createElement("li");
        let img_item = document.createElement("img");

        li_item.id = "source"+idnum;
        li_item.setAttribute("draggable","true");
        img_item.src = imgs[i];
        img_item.style.width = target.clientWidth + "px";
        img_item.style.height = height + "px";

        li_item.appendChild(img_item);

        ul.appendChild(li_item);
    }


    target.appendChild(ul)

    return idnum;
}

export {banner}