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

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('product-search-form');
  const searchInput = document.getElementById('product-search');
  const searchResultsContainer = document.getElementById('product-container');
  const cartSection = document.querySelector('.product-add-section');

  // Function to save the cart to local storage
  function saveCartToLocalStorage(cartData) {
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  // Function to retrieve the cart from local storage
  function getCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return JSON.parse(cartData) || []; // Return an empty array if no data is found
  }

  // Initialize the cart by retrieving data from local storage
  const cart = getCartFromLocalStorage();

  // Function to update the cart display
  function updateCartDisplay() {
    const productDisplaySection = document.querySelector('.product-display-section');
    productDisplaySection.innerHTML = ''; // Clear the current display

    cart.forEach((product) => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-add-section');
      productItem.dataset.productId = product.id; // Assuming 'product' has an 'id' property

      // Assuming 'product' has properties like 'productName' and 'productPrice'
      productItem.innerHTML = `
        <div class="product-in-cart">
          <p class="product-name">${product.productName}</p>
          <h4 class="product-price">$${product.productPrice.toFixed(2)}</h4>
        </div>

        <div class="input-group">
          <i class="bi bi-dash decrement"></i>
          <span class="input-number form-control quantity">${product.quantity}</span>
          <i class="bi bi-plus increment"></i>
        </div>
      `;

      productDisplaySection.appendChild(productItem);
    });
  }

  // Function to add a product to the cart
  function addToCart(product) {
    cart.push(product);
    updateCartDisplay();
    saveCartToLocalStorage(cart); // Save the updated cart to local storage
  }

  // Event listener for the "Add" buttons
  const addCartButtons = document.querySelectorAll('.addCart');
  addCartButtons.forEach((addCartButton) => {
    addCartButton.addEventListener('click', (event) => {
      const productData = JSON.parse(event.target.getAttribute('data-product'));
      addToCart(productData);
    });
  });

  // Function to fetch search results and display them
  const fetchSearchResults = (searchTerm) => {
    // Make an AJAX request to the server to fetch search results
    fetch(`/search/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Clear previous search results
        searchResultsContainer.innerHTML = '';

        // Display search results
        if (data.length > 0) {
          data.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.classList.add('card', 'product', 'col-lg-3', 'col-md-3');
            productCard.innerHTML = `
              <h5 class="card-title product-name">${product.productName}</h5>
              <div class="priceAddCart row">
                <p class="col-8 product-quantity">${product.quantity}</p>
                <p class="card-text product-price col-8">$${product.productPrice}</p>
                <button class="btn addCart bi bi-plus col-4" data-product='${JSON.stringify(product)}' value="Add"></button>
              </div>
            `;
            productCard.dataset.productId = product.id; // Assuming 'product' has an 'id' property

            searchResultsContainer.appendChild(productCard);

            // Add click event listener to "Add" button
            const addCartButtons = productCard.querySelectorAll('.addCart');
            addCartButtons.forEach((addCartButton) => {
              addCartButton.addEventListener('click', (event) => {
                const productData = JSON.parse(event.target.getAttribute('data-product'));
                addToCart(productData);
              });
            });
          });
        } else {
          // No results found
          searchResultsContainer.innerHTML = '<p>No results found.</p>';
        }
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  // Event listener for the search input field
  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim();

    if (searchTerm.length >= 3) {
      // Fetch and display search results when the search term is at least 3 characters long
      fetchSearchResults(searchTerm);
    } else {
      // Clear search results if the search term is too short
      searchResultsContainer.innerHTML = '';
    }
  });

  // Prevent the form from submitting
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });
});
