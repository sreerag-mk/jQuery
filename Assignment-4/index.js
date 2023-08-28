$(document).ready(function () {
  $("#cart").hide();
  $("#cartId").click(function () {
    if ($("#cart").css("display") === "none") {
      $("#cart").show();
    } else {
      $("#cart").hide();
    }
  });
  const product_1 = {
    heading: "Audi r8",
    discription:
      "This article is about the road-going sports car. For other Audi cars bearing the R8 name",
    image: "images/car1.jpg",
    price: "500",
  };
  const product_2 = {
    heading: "Mercedes-Benz AMG GT",
    discription:
      "The combination of AMG GTs rapid performance, involving handling, racy exterior and fighter jet cockpit makes it every enthusiasts dream.",
    image: "images/car2.jpg",
    price: "500",
  };
  const product_3 = {
    heading: "Lamborghini Huracan Evo",
    discription:
      "Lamborghinis of old have always had a reputation of just looking good and having a vocal engine to thrill you in a straight-line, not much else.",
    image: "images/car11.jpg",
    price: "500",
  };
  const product_4 = {
    heading: "Audi Q7",
    discription:
      "The Audi Q7 has been lauded not only for its size and space but also for its on- and off-road performance",
    image: "images/car4.jpg",
    price: "500",
  };
  const product_5 = {
    heading: "Ferrari Roma",
    discription:
      "The Ferrari Roma is an impressive car that offers an exhilarating driving experience, a stunning design, and a powerful engine.",
    image: "images/car5.jpg",
    price: "500",
  };
  const product_6 = {
    heading: "McLaren P1",
    discription:
      "The P1 is a superhero among supercars: supermodel shapely, heroically powerful, stratospherically expensive, and—heres the one drawback—unavailable.",
    image: "images/car6.jpg",
    price: "500",
  };
  const product_7 = {
    heading: "McLaren 720S",
    discription:
      "Not only is the McLaren 720S simply gorgeous to look at, but its also just as entertaining behind the wheel.",
    image: "images/car9.jpg",
    price: "500",
  };
  const product_8 = {
    heading: "McLaren F1",
    discription:
      "The McLaren F1 debuted in 1992. It was the cost-no-object approach to building a car and was such a leap ahead in almost every imaginable way that it changed way we think about supercars forever.",
    image: "images/car8.jpg",
    price: "500",
  };
  const product_9 = {
    heading: "McLaren 675LT SPIDER",
    discription:
      "he 675LT Spider takes the outstanding DNA of the 675LT and adds a retractable folding hard top for the thrill of open top driving. Our fastest convertible indulges you in a rush of exhilaration and pulse-quickening sensations that are pure McLaren.",
    image: "images/car7.jpg",
    price: "500",
  };
  const product_10 = {
    heading: "Ford Mustang",
    discription:
      "So the Mustang is a sports car with very few flaws of one. Sure it is not perfect, but with that price tag, you get a lot of American muscle for your money.",
    image: "images/car10.jpg",
    price: "500",
  };
  function showElement(product) {
    const title = product.heading;
    const dis = product.discription;
    const imag = product.image;
    const price = product.price;
    const div1 = document.createElement("div");
    div1.classList.add("item");
    const main1 = document.getElementById("main");
    main1.appendChild(div1);
    const div2 = document.createElement("div");
    div2.classList.add("img");
    const img = document.createElement("img");
    div1.appendChild(div2);
    div2.appendChild(img);
    img.setAttribute("id", `imgid${idimg}`);
    idimg += 1;
    const div3 = document.createElement("div");
    div3.classList.add("details");
    const headingh2 = document.createElement("h2");
    const headingh3 = document.createElement("h3");
    const para = document.createElement("p");
    para.classList.add("para");
    headingh2.classList.add("headh2");
    headingh3.classList.add("headh3");
    headingh2.setAttribute("id", `head${titles}`);
    titles += 1;
    headingh3.setAttribute("id", `headh3${prices}`);
    prices += 1;
    const button = document.createElement("button");
    button.classList.add("btn1");
    button.setAttribute("id", `btnid${ids}`);
    ids += 1;
    button.value = "Add to cart";
    div1.appendChild(div3);
    div3.appendChild(headingh2);
    div3.appendChild(headingh3);
    div3.appendChild(para);
    div3.appendChild(button);
    img.setAttribute("src", imag);
    $(headingh2).text(title);
    $(headingh3).text(`$${price}`);
    $(para).text(dis);
    $(button).text("Add to cart");
    return button;
  }
  $("#searchbtn").click(function () {
    const searchval = $("#search").val();
    searchval.toLowerCase();
    flag = 0;
    $(".item").remove();
    products.forEach((product) => {
      let searchTitle = product.heading;
      searchTitle = searchTitle.trim();
      searchTitle = searchTitle.toLowerCase();
      if (searchTitle.includes(searchval.trim())) {
        showElement(product);
        flag = 1;
      }
    });
    if (flag === 0) {
      alert("the entered item is not a product");
    }
  });
  const products = [
    product_1,
    product_2,
    product_3,
    product_4,
    product_5,
    product_6,
    product_7,
    product_8,
    product_9,
    product_10,
  ];
  let ids = 1;
  let titles = 1;
  let prices = 1;
  let idimg = 1;
  products.forEach((product) => {
    showElement(product);
  });
  let imgdiv1 = 1;
  let divCart = 1;
  let itemcount = 1;
  let minusbtn = 1;
  let cartp = 1;
  let plusbtn = 1;
  function buttonClick(img, h2, h3, count) {
    const cartDiv1 = document.createElement("div");
    cartDiv1.classList.add("cartImg");
    cartDiv1.setAttribute("id", `cartimgdiv${imgdiv1}`);
    imgdiv1 += 1;
    const cart = document.getElementById("cart");
    const cartImage1 = document.createElement("img");
    cartDiv1.appendChild(cartImage1);
    const cartDiv2 = document.createElement("div");
    cartDiv2.classList.add("cartDetails");
    cartDiv2.setAttribute("id", `cartmaindiv${divCart}`);
    divCart += 1;
    cart.prepend(cartDiv1);
    cart.prepend(cartDiv2);
    const carth2 = document.createElement("h2");
    cartDiv2.appendChild(carth2);
    const carth3 = document.createElement("h3");
    carth3.setAttribute("id", `itemcount${itemcount}`);
    itemcount += 1;
    cartDiv2.appendChild(carth3);
    const cartDiv3 = document.createElement("div");
    cartDiv3.classList.add("cartBtn");
    cartDiv2.appendChild(cartDiv3);
    const minusBtn = document.createElement("button");
    minusBtn.classList.add("minus");
    minusBtn.setAttribute("id", `minusbtn${minusbtn}`);
    minusbtn += 1;
    cartDiv3.appendChild(minusBtn);
    $(".minus").text("-");
    const cartpara = document.createElement("p");
    cartpara.setAttribute("id", `cartp${cartp}`);
    cartp += 1;
    cartpara.classList.add("cartCount");
    cartDiv3.appendChild(cartpara);
    const plusBtn = document.createElement("button");
    plusBtn.classList.add("plus");
    plusBtn.setAttribute("id", `plusbtn${plusbtn}`);
    plusbtn += 1;
    cartDiv3.appendChild(plusBtn);
    $(".plus").text("+");
    const imgValue = $(`#${img}`).attr("src");
    const h2Value = $(`#${h2}`).text();
    const h3Value = $(`#${h3}`).text();
    $(cartImage1).attr("src", imgValue);
    $(carth2).text(h2Value);
    $(carth3).text(h3Value);
    $(cartpara).text(count);
  }
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let count5 = 0;
  let count6 = 0;
  let count7 = 0;
  let count8 = 0;
  let count9 = 0;
  let count10 = 0;
  buttonClick("imgid1", "head1", "headh31", count1);
  const cart = document.getElementById("cart");
  const cartone1 = $("#cartmaindiv1");
  const carttwo1 = $("#cartimgdiv1");
  cartone1.hide();
  carttwo1.hide();
  buttonClick("imgid2", "head2", "headh32", count2);
  const cartone2 = $("#cartmaindiv2");
  const carttwo2 = $("#cartimgdiv2");
  cartone2.hide();
  carttwo2.hide();
  buttonClick("imgid3", "head3", "headh33", count3);
  const cartone3 = $("#cartmaindiv3");
  const carttwo3 = $("#cartimgdiv3");
  cartone3.hide();
  carttwo3.hide();
  buttonClick("imgid4", "head4", "headh34", count4);
  const cartone4 = $("#cartmaindiv4");
  const carttwo4 = $("#cartimgdiv4");
  cartone4.hide();
  carttwo4.hide();
  buttonClick("imgid5", "head5", "headh35", count5);
  const cartone5 = $("#cartmaindiv5");
  const carttwo5 = $("#cartimgdiv5");
  cartone5.hide();
  carttwo5.hide();
  buttonClick("imgid6", "head6", "headh36", count6);
  const cartone6 = $("#cartmaindiv6");
  const carttwo6 = $("#cartimgdiv6");
  cartone6.hide();
  carttwo6.hide();
  buttonClick("imgid7", "head7", "headh37", count7);
  const cartone7 = $("#cartmaindiv7");
  const carttwo7 = $("#cartimgdiv7");
  cartone7.hide();
  carttwo7.hide();
  buttonClick("imgid8", "head8", "headh38", count8);
  const cartone8 = $("#cartmaindiv8");
  const carttwo8 = $("#cartimgdiv8");
  cartone8.hide();
  carttwo8.hide();
  buttonClick("imgid9", "head9", "headh39", count9);
  const cartone9 = $("#cartmaindiv9");
  const carttwo9 = $("#cartimgdiv9");
  cartone9.hide();
  carttwo9.hide();
  buttonClick("imgid10", "head10", "headh310", count10);
  const cartone10 = $("#cartmaindiv10");
  const carttwo10 = $("#cartimgdiv10");
  cartone10.hide();
  carttwo10.hide();
  $(document).on("click", "#minusbtn1", function () {
    count1 -= 1;
    $("#cartp1").html(count1);
    if (count1 === 0) {
      cartone1.hide();
      carttwo1.hide();
    }
  });
  $(document).on("click", "#minusbtn2", function () {
    count2 -= 1;
    $("#cartp2").html(count2);
    if (count2 === 0) {
      cartone2.hide();
      carttwo2.hide();
    }
  });
  $(document).on("click", "#minusbtn3", function () {
    count3 -= 1;
    $("#cartp3").html(count3);
    if (count3 === 0) {
      cartone3.hide();
      carttwo3.hide();
    }
  });
  $(document).on("click", "#minusbtn4", function () {
    count4 -= 1;
    $("#cartp4").html(count4);
    if (count4 === 0) {
      cartone4.hide();
      carttwo4.hide();
    }
  });
  $(document).on("click", "#minusbtn5", function () {
    count5 -= 1;
    $("#cartp5").html(count5);
    if (count5 === 0) {
      cartone5.hide();
      carttwo5.hide();
    }
  });
  $(document).on("click", "#minusbtn6", function () {
    count6 -= 1;
    $("#cartp6").html(count6);
    if (count6 === 0) {
      cartone6.hide();
      carttwo6.hide();
    }
  });
  $(document).on("click", "#minusbtn7", function () {
    count7 -= 1;
    $("#cartp7").html(count7);
    if (count7 === 0) {
      cartone7.hide();
      carttwo7.hide();
    }
  });
  $(document).on("click", "#minusbtn8", function () {
    count8 -= 1;
    $("#cartp8").html(count8);
    if (count8 === 0) {
      cartone8.hide();
      carttwo8.hide();
    }
  });
  $(document).on("click", "#minusbtn9", function () {
    count9 -= 1;
    $("#cartp9").html(count9);
    if (count9 === 0) {
      cartone9.hide();
      carttwo9.hide();
    }
  });
  $(document).on("click", "#minusbtn10", function () {
    count10 -= 1;
    $("#cartp10").html(count10);
    if (count10 === 0) {
      cartone10.hide();
      carttwo10.hide();
    }
  });
  $(document).on("click", "#plusbtn1", function () {
    count1 += 1;
    $("#cartp1").html(count1);
  });
  $(document).on("click", "#plusbtn2", function () {
    count2 += 1;
    $("#cartp2").html(count2);
  });
  $(document).on("click", "#plusbtn3", function () {
    count3 += 1;
    $("#cartp3").html(count3);
  });
  $(document).on("click", "#plusbtn4", function () {
    count4 += 1;
    $("#cartp4").html(count4);
  });
  $(document).on("click", "#plusbtn5", function () {
    count5 += 1;
    $("#cartp5").html(count5);
  });
  $(document).on("click", "#plusbtn6", function () {
    count6 += 1;
    $("#cartp6").html(count6);
  });
  $(document).on("click", "#plusbtn7", function () {
    count7 += 1;
    $("#cartp7").html(count7);
  });
  $(document).on("click", "#plusbtn8", function () {
    count8 += 1;
    $("#cartp8").html(count8);
  });
  $(document).on("click", "#plusbtn9", function () {
    count9 += 1;
    $("#cartp9").html(count9);
  });
  $(document).on("click", "#plusbtn10", function () {
    count10 += 1;
    $("#cartp10").html(count10);
  });
  $("#btnid1").click(function () {
    count1 += 1;
    if (count1 === 1) {
      cartone1.show();
      carttwo1.show();
      $("#cartp1").html(count1);
    } else {
      $("#cartp1").html(count1);
    }
  });
  $("#btnid2").click(function () {
    count2 += 1;
    if (count2 === 1) {
      cartone2.show();
      carttwo2.show();
      $("#cartp2").html(count2);
    } else {
      $("#cartp2").html(count2);
    }
  });
  $("#btnid3").click(function () {
    count3 += 1;
    if (count3 === 1) {
      cartone3.show();
      carttwo3.show();
      $("#cartp3").html(count3);
    } else {
      $("#cartp3").html(count3);
    }
  });
  $("#btnid4").click(function () {
    count4 += 1;
    if (count4 === 1) {
      cartone4.show();
      carttwo4.show();
      $("#cartp4").html(count4);
    } else {
      $("#cartp4").html(count4);
    }
  });
  $("#btnid5").click(function () {
    count5 += 1;
    if (count5 === 1) {
      cartone5.show();
      carttwo5.show();
      $("#cartp5").html(count5);
    } else {
      $("#cartp5").html(count5);
    }
  });
  $("#btnid6").click(function () {
    count6 += 1;
    if (count6 === 1) {
      cartone6.show();
      carttwo6.show();
      $("#cartp6").html(count6);
    } else {
      $("#cartp6").html(count6);
    }
  });
  $("#btnid7").click(function () {
    count7 += 1;
    if (count7 === 1) {
      cartone7.show();
      carttwo7.show();
      $("#cartp7").html(count7);
    } else {
      $("#cartp7").html(count7);
    }
  });
  $("#btnid8").click(function () {
    count8 += 1;
    if (count8 === 1) {
      cartone8.show();
      carttwo8.show();
      $("#cartp8").html(count8);
    } else {
      $("#cartp8").html(count8);
    }
  });
  $("#btnid9").click(function () {
    count9 += 1;
    if (count9 === 1) {
      cartone9.show();
      carttwo9.show();
      $("#cartp9").html(count9);
    } else {
      $("#cartp9").html(count9);
    }
  });
  $("#btnid10").click(function () {
    count10 += 1;
    if (count10 === 1) {
      cartone10.show();
      carttwo10.show();
      $("#cartp10").html(count10);
    } else {
      $("#cartp10").html(count10);
    }
  });
});
