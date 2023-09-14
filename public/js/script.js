
// Cache out buttons container, and all of the panels
const buttons = document.querySelector('.setting-buttons');
const panels = document.querySelectorAll('.panel');

// Add an event listener to the buttons container
buttons?.addEventListener('click', handleClick);

// When a child element of `buttons` is clicked
function handleClick(e) {
  if (e.target.matches('button')) {
    // Hide all panels by removing the 'show' class
    panels.forEach(panel => panel.classList.remove('show'));

    // Extract the 'id' attribute from the clicked button's dataset
    const { id } = e.target.dataset;

    // Construct a CSS selector to select the corresponding panel
    const selector = `.panel[id="${id}"]`;

    // Add the 'show' class to the selected panel to make it visible
    document.querySelector(selector).classList.add('show');
  }
}
const subTotalEle = document.querySelector(".subtotal");
const taxEle = document.querySelector(".tax");
const totalEle = document.querySelector(".total");

function increment(event) {
  const id = event.target.getAttribute("data-id");
  // Send an AJAX POST request to add the product to the server's shopping cart
  fetch(`/cart/increment/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server if needed
      // Optionally, you can update the cart display or perform other actions here
      updateCartDisplay(data.cart, data.subTotal,data.tax,data.total);
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
    });
}
function decrement(productData) {
  // Send an AJAX POST request to add the product to the server's shopping cart
  const id = event.target.getAttribute("data-id");
  fetch(`/cart/decrement/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server if needed
      // Optionally, you can update the cart display or perform other actions here
      updateCartDisplay(data.cart,  data.subTotal,data.tax,data.total);
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
    });
}

const productDisplaySection = document.querySelector(
  ".product-display-section"
);
const updateCartDisplay = (cartItems, subTotal ,tax,total) => {
  // Clear previous cart display
  productDisplaySection.innerHTML = "";

  // Display cart contents
  cartItems.forEach((cartItem) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-add-section");

    // Assuming 'cartItem' has properties like 'productName' and 'productPrice'
    productItem.innerHTML = `
          <div class="product-in-cart">
            <p class="product-name">${cartItem.productName}</p>
            <h4 class="product-price">$${cartItem.productPrice.toFixed(2)}</h4>
          </div>

          <div class="input-group">
            <i class="bi bi-dash decrement" data-id="${cartItem._id}"></i>
            <span class="input-number form-control quantity">${
              cartItem.noItems
            }</span>
            <i class="bi bi-plus increment" data-id="${cartItem._id}"></i>
          </div>
        `;

    productDisplaySection.appendChild(productItem);
   
    // Attach a click event listener to the "Add increment " buttons
    const incrementButton = document.querySelectorAll(".increment");
    incrementButton.forEach((addItem) => {
      addItem.addEventListener("click", increment);
    });

    // Attach a click event listener to the "Decrement" buttons
    const decrementButton = document.querySelectorAll(".decrement");
    decrementButton.forEach((minusItem) => {
      minusItem.addEventListener("click", decrement);
    });

    subTotalEle.innerHTML = `$ ${parseFloat(subTotal).toFixed(2)}`
    taxEle.innerHTML = `$ ${parseFloat(tax).toFixed(2)}`
    totalEle.innerHTML=`$ ${parseFloat(total).toFixed(2)}`
   
  });
};
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("product-search-form");
  const searchInput = document.getElementById("product-search");
  const searchResultsContainer = document.getElementById("product-container");

  // Function to fetch search results and display them
  const fetchSearchResults = (searchTerm) => {
    // Make an AJAX request to the server to fetch search results
    fetch(`/search/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Clear previous search results
        searchResultsContainer.innerHTML = "";

        // Display search results
        if (data.length > 0) {
          data.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add(
              "card",
              "product",
              "col-lg-3",
              "col-md-3"
            );
            productCard.innerHTML = `
              <h5 class="card-title product-name">${product.productName}</h5>
              <div class="priceAddCart row">
                <p class="col-8 product-quantity">${product.quantity}</p>
                <p class="card-text product-price col-8">$${
                  product.productPrice
                }</p>
                <button class="btn addCart bi bi-plus col-4" data-product='${JSON.stringify(
                  product
                )}' value="Add"></button>
              </div>
            `;
            searchResultsContainer.appendChild(productCard);

            // Add click event listener to "Add" button
            const addCartButtons = document.querySelectorAll(".addCart");
            addCartButtons.forEach((addCartButton) => {
              addCartButton.addEventListener("click", (event) => {
                const productData = JSON.parse(
                  event.target.getAttribute("data-product")
                );
                addToCart(productData);
              });
            });
          });
        } else {
          // No results found
          searchResultsContainer.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  // Event listener for the search input field
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim();

    if (searchTerm.length >= 3) {
      // Fetch and display search results when the search term is at least 3 characters long
      fetchSearchResults(searchTerm);
    } else {
      // Clear search results if the search term is too short
      searchResultsContainer.innerHTML = "";
    }
  });

  // Prevent the form from submitting
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  //add To cart
  // Attach a click event listener to the "Add" buttons
  const addCartButtons = document.querySelectorAll(".addCart");
  addCartButtons.forEach((addCartButton) => {
    addCartButton.addEventListener("click", (event) => {
      const productData = JSON.parse(event.target.getAttribute("data-product"));
      addToCart(productData);
    });
  });

  function addToCart(productData) {
    // Send an AJAX POST request to add the product to the server's shopping cart
    fetch("/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log();
        // Optionally, you can update the cart display or perform other actions here
        updateCartDisplay(data.cart,  data.subTotal,data.tax,data.total);
        fetchAndDisplayCart();
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  }

// const voucherCodeInput = document.getElementById("voucher-code");
// const applyVoucherButton = document.getElementById("apply-voucher");

// applyVoucherButton.addEventListener("click", applyVoucher);

// function applyVoucher() {
//   const voucherCode = voucherCodeInput.value;
//   fetch("/cart/discount", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
   
//   })
//     .then((response) => response.json())
//     .then((data) => {
//           //voucher code is "DISCOUNT10", apply a 10% discount:
//       if (voucherCode === "DISCOUNT10") {
//         const discountPercentage = 0.1; // 10% discount
//         const discountedTotal = total - total * discountPercentage;
//         totalEle.innerHTML = `$ ${parseFloat(discountedTotal).toFixed(2)}`;
//         alert("Voucher applied successfully!");
//       } else {
//         alert("Invalid voucher code");
//       }
//       // Handle the response from the server if needed
//       console.log();
//       // Optionally, you can update the cart display or perform other actions here
//       updateCartDisplay(data.cart,  data.subTotal,data.tax,data.total,data.discount);
//       fetchAndDisplayCart();
//     })
//     .catch((error) => {
//       console.error("Error adding product to cart:", error);
//     });


 
 
//    }




  function fetchAndDisplayCart() {
    fetch('/cart/contents', {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.cart)
        if (data.cart) {
          updateCartDisplay(data.cart, data.subTotal, data.tax, data.total);
        }
      })
      .catch((error) => {
        console.error("Error fetching user's cart:", error);
      });
  }

//Fetch data from cart
function fetchCheckout() {
  fetch('/cart/contents', {
    method: "GET",
  })
    .then((response) => response.json())
    .then((cartItems) => {
      const tableBody = document.querySelector('#checkout-table tbody');
      tableBody.innerHTML = '';



      cartItems.shoppingCart.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.productName}</td>
          <td>${item.noItems}</td>
          <td>$${(item.noItems * item.productPrice).toFixed(2)}</td>
        `;


      });

      const subTotalCheck = document.querySelector(".checkout-subtotal")
      const taxCheck =document.querySelector(".checkout-tax ")
      const totalCheck = document.querySelector(".checkout-total ")
      const amountTotal =document.querySelector(".amount-total ")
             subTotalCheck.innerHTML =` $ ${parseFloat(cartItems.subTotal).toFixed(2)}`
             taxCheck.innerHTML = `$ ${parseFloat(cartItems.tax).toFixed(2)}`
             totalCheck.innerHTML=`$ ${parseFloat(cartItems.total).toFixed(2)}`
             amountTotal.innerHTML=`$ ${parseFloat(cartItems.total).toFixed(2)}`

    })
    .catch((error) => {
      console.error('Error fetching cart contents:', error);
    });
}
  //checkout popup 
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutPopup = document.getElementById("checkout-popup");
  const close = document.querySelector(".close");

  
  checkoutBtn?.addEventListener("click", function(){
  
  
    checkoutPopup.style.display = "block";
    
    fetchCheckout();


  })
  close?.addEventListener("click", function(){
    checkoutPopup.style.display = "none";
  })



});

