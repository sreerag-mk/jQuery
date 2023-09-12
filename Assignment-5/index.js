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
      for (let i = startItem; i < product.length; i++) {
        shownItems.push(product[i])
      }
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
    console.log(product)
    // console.log("first printing product")
    // console.log("endItem" + endItem)
    // console.log("startitem" + startItem)
    // console.log("itemscroll old" + itemScroll)
    $(window).scroll(function () {
      // const scrollz = window.scroll
      const element = $(".mainDiv").height()
      // console.log(scrollz)
      // console.log(`element height: ${itemScroll}`)
      const scroll = $(this).scrollTop();
      // console.log(scroll)
      console.log("itemscroll new" + itemScroll)
      if (scroll > itemScroll) {
        loadItems(product, startItem, endItem)
        itemScroll += (element * 3)
        startItem += 3
        endItem += 3
        // console.log("second printing product")
        // console.log("endItem" + endItem)
        // console.log("startitem" + startItem)
        // console.log("itemscroll" + itemScroll)
      }
    })
    loadItems(product, startItem, endItem)
    startItem += 3
    endItem += 3
    // console.log("third printing product")
    // console.log("endItem" + endItem)
    // console.log("startitem" + startItem)
    // console.log("itemscroll" + itemScroll)
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
  let temp = 0
  function setItems(products) {
    products.forEach((products) => {
      console.log(temp)
      temp += 1;
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
      console.log(products)
      loadingItem(products)
      // setItems(products)
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
        shownItems = []
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
        // setItems(filterItem)
        loadingItem(filterItem)
        document.getElementById("main").innerHTML = html_content;
      }
      function sortedItems(value) {
        shownItems = []
        if (value === 'HTL') {
          html_content = ""
          let HTLProduct = filterItem
          HTLProduct.sort((a, b) => b.price - a.price);
          // setItems(HTLProduct)
          loadingItem(HTLProduct)
          document.getElementById("main").innerHTML = html_content;
        } else if (value === 'LTH') {
          html_content = ""
          let LTHProduct = filterItem
          LTHProduct.sort((a, b) => a.price - b.price);
          // setItems(LTHProduct)
          loadingItem(LTHProduct)
          document.getElementById("main").innerHTML = html_content;
        } else if (value === "rating") {
          html_content = ""
          let RATProduct = filterItem
          RATProduct.sort((a, b) => b.rating - a.rating);
          // setItems(RATProduct)
          loadingItem(RATProduct)
          document.getElementById("main").innerHTML = html_content;
        }
      }
      let dropDown = $("#category")
      dropDown.change(function () {
        shownItems = []
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        console.log(shownItems)
        category = this.value;
        console.log(category)
        filteredItems(category)
      })
      let sortDrop = $("#sort")
      sortDrop.change(function () {
        shownItems = []
        $('html, body').animate({ scrollTop: 0 }, 'slow');
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
      let itemMinus = 0
      let itemAmount = 0
      let itemProducts = 0;
      let itemQuantity = 0
      function cartUpdate(proId, temp) {
        cart_content = "";
        console.log(`the rpo id is equal to ${proId}`)
        console.log("emp is equal to "+temp)
        cartItems.forEach((product) => {
          itemMinus = temp
          itemAmount = (product.price)
          itemQuantity = (product.quantity)
          itemProducts = itemAmount * itemQuantity
          console.log(`the entery way to the cart templates ${product.price}`)
          
          if (product.quantity === -1) {
            product.quantity = 0
          }
          cart_content = cart_content + `
          <div class="mainCart" id="cartId${product.id}">
              <div class="cartimg">
                  <img src="${product.thumbnail}" alt="">
              </div>
              <div class="cartItem">
                  <h2 class="cartTitle">${product.title}</h2>
                  <p class="cartPrice" id="priceId${product.id}">${itemProducts}</p>
                  <div class="cartbtn">
                      <button class="minus" id="${product.id}">-</button>
                      <p class="quantity" id="para${product.id}">${product.quantity}</p>
                      <button class="plus" id="${product.id}">+</button>
                  </div>
              </div>
          </div>
          `

          // console.log($(this).text())
          // finalAmount += finalAmount + itemAmount - (itemAmount * itemQuantity-1))
          // totalAmount = (itemAmount * itemQuantity)
          
        },
        )

        // console.log($(`#cartId${proId}`))
        // console.log($(`#cartId${proId}`))

        // console.log("the amount is = "+$("#totalAmount").text())
        // if (itemMinus === 0) {
        //   finalAmount -= itemAmount * itemQuantity - (itemAmount * (itemQuantity - 1))
        //   itemQuantity -= 1
        //   console.log("one part")
        //   console.log($(this).id)
        //   console.log(itemAmount)
        //   console.log(itemQuantity)
        //   console.log("hello world this is minus btn clicked")

        //   // finalAmount = finalAmount - itemAmount
        // }
        // else if (itemQuantity >=2){
        //   console.log("two part")
        //   finalAmount += itemAmount
        //   console.log($(this).id)
        //   console.log(itemAmount)
        //   console.log(itemQuantity)
        //   // console.log("inside the btn")
        //   // finalAmount = finalAmount + itemAmount
        //   // totalAmount = 0
        //   // finalAmount = itemAmount * itemQuantity
        //   itemQuantity += 1
        // }else {
        //   finalAmount += itemAmount * itemQuantity - (itemAmount * (itemQuantity - 1))
        //   console.log("three part")
        //   console.log($(this).id)
        //   itemQuantity += 1
        //   console.log(itemAmount)
        //   console.log(itemQuantity)
        //   // finalAmount = finalAmount + itemProducts
        //   // finalAmount = finalAmount + (itemQuantity * itemAmount)
        // }
        // if (itemQuantity === -1) {
        //   itemQuantity = 0;
        // }
        // cart_content = cart_content + `Total Amount : ${finalAmount.toFixed(2)}`
        // console.log(itemAmount)
        // console.log("total amount = ")
        // console.log(totalAmount)

        console.log(cartItems)
        let finalAmount = 0

        cartItems.forEach((product) => {
          console.log(product.price)
          console.log(product.quantity)
          finalAmount += product.price * product.quantity 
        })
        cart_content = cart_content + `Total Amount : ${finalAmount.toFixed(2)}`

        
        
      }
      let selectedProduct = []
      $(document).on('click', '.btnCart', function () {
        console.log("you have clicked the button");
        let proId = $(this).closest('.mainDiv').data('product-id')
        console.log("proId = " + proId);
        for (const key in productData) {
          if (productData[key].id === proId) {
            console.log(productData[key]);
            selectedProduct = productData[key];
            break;
          }
        }
        console.log("selected product = " + selectedProduct);
        console.log(selectedProduct)
        console.log("productDAta = " + productData)
        console.log(productData)
        // const newProductData = [...new Set(pro)]
        // console.log(newProductData)
        if (cart_content.includes(`${selectedProduct.title}`)) {
          selectedProduct.quantity += 1
          cartUpdate(proId)
        } else {
          cartItems.push(selectedProduct);
          cartUpdate(proId)
        }
        // console.log("cart content = " + cart_content)
        $("#cart").html(cart_content);
      })
      $(document).on("click", ".plus", function () {
        let proId = $(this).attr('id')
        console.log(proId);
        console.log('productData')
        console.log(productData)
        console.log('selected data')
        console.log(selectedProduct)


        // let selectedProduct = []
        for (const key in productData) {
          // console.log("for key is enterred")
          // console.log(productData[key])
          // console.log("productdataid =====")
          // console.log(productData[key].id)
          // console.log("proId = ")
          // console.log(proId)
          if (productData[key].id == proId) {
            console.log("product key is shown here")
            console.log(selectedProduct[key]);
            selectedProduct = productData[key]
            selectedProduct.quantity += 1
            cartUpdate(proId)
            break;
          }
        }
        $("#cart").html(cart_content);
      });
      $(document).on("click", ".minus", function () {
        let proId = $(this).attr('id')
        let temp = 0
        console.log(proId);
        for (const key in productData) {
          if (productData[key].id == proId) {
            console.log("product key is shown here")
            console.log(selectedProduct[key]);
            selectedProduct = productData[key]
            selectedProduct.quantity -= 1
            if (selectedProduct.quantity <= 0) {
              let cartIndex = cartItems.indexOf(selectedProduct)
              console.log(`cartIndex: ${cartIndex}`)
              cartItems.splice(cartIndex, 1);
            }
            cartUpdate(proId, temp)
            $("#cart").html(cart_content);

            break;
          }
        }

      });
    },
    error: function () {
      alert("Failed to load products. Please check your internet connection.");
    }
  });
});
