$(document).ready(function(){
    const arrayImg = ["img_1.jpg", "img_2.jpg", "img_3.jpg", "img_4.jpg", "img_5.jpg"]
    let startingIndex = 0;
    function sliderChecker() {
        if (startingIndex === 0){
            $("#img1").removeClass("normal")
            $("#img2").addClass("normal")
            $("#img3").addClass("normal")
            $("#img4").addClass("normal")
            $("#img5").addClass("normal")
        }
        if (startingIndex === 1){
            $("#img2").removeClass("normal")
            $("#img1").addClass("normal")
            $("#img3").addClass("normal")
            $("#img4").addClass("normal")
            $("#img5").addClass("normal")
        }
        if (startingIndex === 2){
            $("#img3").removeClass("normal")
            $("#img2").addClass("normal")
            $("#img1").addClass("normal")
            $("#img4").addClass("normal")
            $("#img5").addClass("normal")
        }
        if (startingIndex === 3){
            $("#img4").removeClass("normal")
            $("#img1").addClass("normal")
            $("#img2").addClass("normal")
            $("#img3").addClass("normal")
            $("#img5").addClass("normal")
        }
        if (startingIndex === 4){
            $("#img5").removeClass("normal")
            $("#img2").addClass("normal")
            $("#img3").addClass("normal")
            $("#img4").addClass("normal")
            $("#img1").addClass("normal")
        }
    }
    setInterval(function silderShow() {
        $("#img1").click(function(){
            startingIndex = 0;
            $("#image").attr("src", `images/${arrayImg[startingIndex]}`);
            sliderChecker()
        })
        $("#img2").click(function(){
            startingIndex = 1;
            $("#image").attr("src", `images/${arrayImg[startingIndex]}`);
            sliderChecker()
        })
        $("#img3").click(function(){
            startingIndex = 2;
            $("#image").attr("src", `images/${arrayImg[startingIndex]}`);
            sliderChecker()
        })
        $("#img4").click(function(){
            startingIndex = 3;
            $("#image").attr("src", `images/${arrayImg[startingIndex]}`);
            sliderChecker()
        })
        $("#img5").click(function(){
            startingIndex = 4;
            $("#image").attr("src", `images/${arrayImg[startingIndex]}`);
            sliderChecker()
        })
        if (startingIndex >= arrayImg.length) {
            startingIndex = 0;
        }

        sliderChecker();
        
       
        // $("#image").attr("src", `images/${arrayImg[startingIndex]}`);
        $("#image").attr("src", `images/${arrayImg[startingIndex]}`).animate({
            opacity : 1,
        },1000)
        $("#image").attr("src", `images/${arrayImg[startingIndex]}`).animate({
            opacity : 0,
        },2000)
        startingIndex += 1
    }, 3000)
})