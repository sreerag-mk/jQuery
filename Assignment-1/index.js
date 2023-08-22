$(document).ready(function() {

  $("#form").submit(function(e){
    e.preventDefault();
    const name = $("#name").val();
    const address = $("#address").val();
    const dob = $("#DOB").val();
    const age = $("#age").val();
    // const gender = $(".gender").val();
    // const agree = $("#agree").val();
    console.log(`button clicked`);
    if (name === ""){
      $("#forName").text("please enter the name")
    }else if($.isNumeric(name)){
      $("#forName").text("need to contain characters")
    }
    else{
      $("#forName").text("")
    }
    if (address === ""){
      $("#forAddress").text("please enter the address")
    }else{
      $("#forAddress").text("")
    }
    if (dob === ""){
      $("#forDob").text("please select the DOB")
    }else{
      $("#forDob").text("")
    }
    if (age === null){
      $("#forAge").text("please select the age")
    }else{
      $("#forAge").text("")
    }
    if ($("#male").is(':checked')){
      $("#forGender").text("")
    }else if ($("#female").is(':checked')){
      $("#forGender").text("")
    }
    else{
      $("#forGender").text("Please select your gender")
    }
    if ($('#agree').is(':checked')){
      $("#forAgree").text("")
    }else{
      $("#forAgree").text("tick the above box for registering")
    }
  })
});
