console.log("hello world")
btn = document.createElement('button');
btn.innerHTML = 'click here';
document.body.appendChild(btn);
let temp = 0;

$(document).ready(function(){ 
    $(btn).click(function (){
        if (temp === 0){
            para = document.createElement('p')
            para.innerHTML = 'hello world'
            document.body.appendChild(para);
            console.log("reached")
            temp += 1
        }else if (temp != 0){
            img = document.createElement('img')
            console.log("asasasasas")
            img.setAttribute('src', 'images/img_1.jpg');
            btn2 = document.createElement('button');
            btn2.innerHTML = "next image"
            document.body.appendChild(img)
            document.body.appendChild(btn2)
            const arrayImg = ['img_1.jpg', 'img_2.jpg', 'img_3.jpg', 'img_4.jpg', 'img_5.jpg'];
            let indexselected = 0;
            $(btn2).click(function(){
                indexselected += 1
                if (indexselected >=  arrayImg.length) {
                    indexselected = 0
                }
                img.setAttribute('src', `images/${arrayImg[indexselected]}`);

            })

        }
    });
});



