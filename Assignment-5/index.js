$(document).ready(function () {
  let cartItems = [];
  let productArray = [];
  let filterItem = [];
  let searchItem = [];
  let shownItems = [];
  let category = "All";
  function loadItems(product, startItem, endItem) {
    // console.log(product);
    // console.log("inside the code");
    if (endItem <= product.length) {
      for (let i = startItem; i < endItem; i++) {
        shownItems.push(product[i])
      }
    } else {
      console.log("thhe array is finished")
    }


    html_content = "";
    console.log("inside the code");
    console.log(shownItems)

    setItems(shownItems)
    document.getElementById("main").innerHTML = html_content;
  }

  function loadingItem(product) {
    let endItem = 3;
    let startItem = 0;
    let itemScroll = 90;

    console.log("first printing product")
    console.log("endItem" + endItem)
    console.log("startitem" + startItem)
    console.log("itemscroll" + itemScroll)

    $(window).scroll(function () {
      // const scrollz = window.scroll
      const element = $(".mainDiv").height()
      // console.log(scrollz)
      // console.log(`element height: ${itemScroll}`)
      const scroll = $(this).scrollTop();
      console.log(scroll)
      console.log(itemScroll)
      if (endItem === 3) {
        itemScroll = 70;
      }
      if (scroll > itemScroll) {
        loadItems(product, startItem, endItem)
        itemScroll += (element * 3) + 100
        startItem += 3
        endItem += 3
        console.log("first printing product")
        console.log("endItem" + endItem)
        console.log("startitem" + startItem)
        console.log("itemscroll" + itemScroll)
      }

    })
    loadItems(product, startItem, endItem)
    startItem += 3
    endItem += 3
    console.log("first printing product")
    console.log("endItem" + endItem)
    console.log("startitem" + startItem)
    console.log("itemscroll" + itemScroll)
  }


  ;
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
      let discountAmount = products.price - (products.price * (products.discountPercentage / 100))
      productData[productId] = {
        id: products.id,
        title: products.title,
        price: discountAmount,
        thumbnail: products.thumbnail,
        stock: products.stock,
        quantity: 1,
        originalPrice: products.price,
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
              <P>Discount amount : $${discountAmount}</P>
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
      // console.log(products)
      loadingItem(products)
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
      function filteredItems(valueCat) {

        console.log(shownItems)
        filterItem = productArray.filter((product) => {
          if (valueCat === 'All') {
            return product
          } else if (product.category === valueCat) {
            return product
          }
        });
        html_content = "";
        console.log(filterItem)
        setItems(filterItem)
        document.getElementById("main").innerHTML = html_content;
      }

      function sortedItems(value) {
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
      }
      let dropDown = $("#category")
      dropDown.change(function () {
        shownItems = []
        console.log(shownItems)
        category = this.value;
        console.log(category)
        filteredItems(category)
      })
      let sortDrop = $("#sort")
      sortDrop.change(function () {
        shownItems = []
        console.log(shownItems)
        let value = this.value
        sortedItems(value)
      })

      $("#searchbtn").click(function () {
        console.log(productArray)
        shownItems = []
        const searchval = $("#search").val();
        const searchValLower = searchval.toLowerCase();
        if (searchValLower === "") {
          alert("You have to enter something to search in RAG store");
        } else {
          searchItem = filterItem.filter((product) => {
            console.log(product)
            console.log("got inside this code")
            let searchTitle = product.title
            searchTitle = searchTitle.trim();
            searchTitle = searchTitle.toLowerCase();
            if (searchTitle.includes(searchValLower.trim())) {
              return product
            }
          })
        }
        if (searchItem.length === 0 && searchValLower !== "") {
          alert("Enterd product is not available in RAG store");
          console.log("Enterd product is not available in RAG store");

        } else if (searchValLower !== "") {
          console.log(searchItem)
          html_content = "";

          setItems(searchItem)
          document.getElementById("main").innerHTML = html_content;
        }

      })
      document.getElementById("main").innerHTML = html_content;
      let priceId = 1
      let cart_content = ""
      let totalAmount = 0
      let itemAmount = 0
      function cartUpdate() {

        cart_content = "";
        console.log(cartItems)
        cartItems.forEach((product) => {
          itemAmount = (product.price)
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
          $("#totalAmount").val(totalAmount)
        })
        console.log(itemAmount)
        totalAmount = totalAmount + itemAmount
        console.log(totalAmount)
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
