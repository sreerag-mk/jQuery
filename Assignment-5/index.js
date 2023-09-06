$(document).ready(function () {
  let cartItems = [];
  let productArray = [];
  let filterItem = [];
  let category = "All";
  let shownItem = 1;
  let itemScroll = 70;
  function hideElements() {
    $(".mainDiv").slice(shownItem, shownItem + 3).show();
    shownItem += 3;
  }
  hideElements();
  $(window).scroll(function () {
    const scrollz = window.scroll
    const element = $(".mainDiv")
    console.log(scrollz)
    const scroll = $(this).scrollTop();
    console.log(scroll)
    if (scroll > itemScroll) {
      hideElements();
      itemScroll += 650;
    }
  });
  let productId = 1;
  $("#cart").hide();
  $("#cartId").click(function () {
    if ($("#cart").css("display") === "none") {
      $("#cart").show();
    } else {
      $("#cart").hide();
    }
  });
  let html_content = "";
  function getImg(images) {
    return images
      .map((img) => `
<div class="itemimg">
<img src="${img}" alt="check your internet connection">
</div>
`)
      .join('');
  }
  function setItems(products) {
    products.forEach((products) => {
      if (productId >= products.length - 1) {
        productId = 0
      }
      productData[productId] = {
        id: products.id,
        title: products.title,
        price: products.price,
        thumbnail: products.thumbnail,
        stock: products.stock,
        quantity: 1,
      };
      const imgHtml = getImg(products.images);
      html_content =
        html_content +
        ` 
          <div class="mainDiv" id="${products.id}" data-product-id="${products.id}" data-category="${products.category}">
          <div class="item1">
              <img src="${products.thumbnail}" alt="">
          </div>
          <div class="item2">
              <h2>${products.title}</h2>
              <P>$${products.price}</P>
              <p>${products.rating}/5</p>
              <p>${products.description}</p>
              <button class="btnCart" paraBtnId="para${products.id}">Add to cart</button>

          </div>
          <div class="item3">
          ${imgHtml}

          </div>
          </div>
          <p class="line"></p>
           `
      productId += 1;
      addToCartBtnId += 1;
    });
  }
  let productData = {}
  let addToCartBtnId = 1;
  jQuery.ajax({
    url: "https://dummyjson.com/products",
    type: "GET",
    success: function (result) {
      let products = result.products;
      productArray = result.products;
      console.log(products)
      setItems(products)

      let filter_content_2 = `<option value="All">All Categories</option>`;
      products.forEach(product => {
        if (filter_content_2.includes(`${product.category}`)) {
          console.log(product.category);

        } else {

          filter_content_2 = filter_content_2 + `<option value="${product.category}">${product.category}</option>`
        }
      })
      document.getElementById("category").innerHTML = filter_content_2
      filterItem = productArray;
      function filteredItems(valueCat, value) {
        filterItem = productArray.filter((product) => {
          if (valueCat === 'All') {
            return product
          } else if (product.category === valueCat) {
            return product
          }
        });
        if (value === 'HTL') {
          html_content = ""
          let HTLProduct = filterItem
          HTLProduct.sort((a, b) => b.price - a.price);
          setItems(HTLProduct)
          document.getElementById("main").innerHTML = html_content;
        } else if (value === 'LTH') {
          html_content = ""
          let LTHProduct = filterItem
          LTHProduct.sort((a, b) => a.price - b.price);
          setItems(LTHProduct)
          document.getElementById("main").innerHTML = html_content;
        } else if (value === "rating") {
          html_content = ""
          let RATProduct = filterItem
          RATProduct.sort((a, b) => b.rating - a.rating);
          setItems(RATProduct)
          document.getElementById("main").innerHTML = html_content;
        }
        html_content = "";
        console.log(filterItem)
        setItems(filterItem)
        document.getElementById("main").innerHTML = html_content;
      }
      let dropDown = $("#category")
      dropDown.change(function () {
        category = this.value;
        console.log(category)
        filteredItems(category, "")
      })
      let sortDrop = $("#sort")
      sortDrop.click(function () {
        let value = this.value
        filteredItems(category, value)
      })
      $("#searchbtn").click(function () {
        const searchval = $("#search").val();
        console.log(searchval);
        const element = $(".mainDiv")
        element.show();
        $(".line").show();
        let temp = 0;
        const searchValLower = searchval.toLowerCase();
        console.log(searchval);
        if (searchValLower === "") {
          alert("You have to enter something to search in RAG store");
        } else {
          let elementNumber = 0;
          products.forEach((product) => {
            let searchTitle = product.title
            // console.log(searchTitle)
            searchTitle = searchTitle.trim();
            searchTitle = searchTitle.toLowerCase();
            if (searchTitle.includes(searchValLower.trim())) {
              console.log(elementNumber)
              console.log(searchTitle)
              elementNumber += 1;
              temp = 1;
            } else if (searchTitle !== searchValLower.trim()) {
              console.log(elementNumber)
              element[elementNumber].style.display = "none";
              $(".line")[elementNumber].style.display = "none";
              elementNumber += 1;
            }
          })
        }
        if (temp === 0) {
          alert("Enterd product is not available in RAG store");
          $(".mainDiv   ").show();
        }
      })
      document.getElementById("main").innerHTML = html_content;
      let priceId = 1
      let cart_content = ""
      function cartUpdate() {

        cart_content = "";
        console.log(cartItems)
        cartItems.forEach((product) => {
          cart_content = cart_content + `
          <div class="mainCart" id="cartId${product.id}">
              <div class="cartimg">
                  <img src="${product.thumbnail}" alt="">
              </div>
              <div class="cartItem">
                  <h2 class="cartTitle">${product.title}</h2>
                  <p class="cartPrice" id="priceId${priceId}">${(product.price) * (product.quantity)}</p>
                  <div class="cartbtn">
                      <button class="minus" id="${product.id}">-</button>
                      <p class="quantity" id="para${product.id}">${product.quantity}</p>
                      <button class="plus" id="${product.id}">+</button>
                  </div>
              </div>
          </div>
          `
        })
      }
      $(document).on('click', '.btnCart', function () {
        console.log("you have clicked the button");
        let proId = $(this).closest('.mainDiv').data('product-id')
        console.log(proId);
        let selectedProduct = productData[proId];
        console.log(selectedProduct);
        console.log(productData)
        if (cart_content.includes(`${selectedProduct.title}`)) {
          selectedProduct.quantity += 1
          cartUpdate()
        } else {
          cartItems.push(selectedProduct);
          cartUpdate()
        }
        console.log(cart_content)
        $("#cart").html(cart_content);
      })
      $(document).on("click", ".plus", function () {
        let proId = $(this).attr('id')
        console.log(proId);
        let selectedProduct = productData[proId];
        selectedProduct.quantity += 1
        cartUpdate()
        $("#cart").html(cart_content);
      });
      $(document).on("click", ".minus", function () {
        let proId = $(this).attr('id')
        console.log(proId);
        let selectedProduct = productData[proId];
        selectedProduct.quantity -= 1
        if (selectedProduct.quantity <= 0) {
          let cartIndex = cartItems.indexOf(selectedProduct)
          console.log(`cartIndex: ${cartIndex}`)
          cartItems.splice(cartIndex, 1);
        }
        cartUpdate()
        $("#cart").html(cart_content);
      });
      $(".mainDiv").hide()
      $(".mainDiv").slice(0, 3).show();
    }
  });
});










