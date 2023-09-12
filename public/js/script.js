

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

  // Function to add a product to the cart display
  const addToCart = (product) => {
    console.log('Adding to cart:', product);

    if (product && product.productName && product.productPrice) {
      const productAddSection = document.createElement('div');
      productAddSection.classList.add('product-add-section');

      productAddSection.innerHTML = `
        <div class="product-in-cart">
          <p class="product-name">${product.productName}</p>
          <h4 class="product-price">$${product.productPrice.toFixed(2)}</h4>
        </div>
        
        <!-- Plus minus cart add section starts-->
        <div class="input-group">
          <i class="bi bi-dash"></i>
          <input type="number" class="input-number form-control" value="1" min="1" max="100">
          <i class="bi bi-plus"></i>
        </div>   
        <!-- Plus minus cart add section starts-->
      `;

      // Append the product-add-section to the product-display-section
      const productDisplaySection = document.querySelector('.product-display-section');
      productDisplaySection.appendChild(productAddSection);
    } else {
      console.log('Invalid product data:', product);
    }
  };

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
            searchResultsContainer.appendChild(productCard);

            // Add click event listener to "Add" button
            const addCartButtons = document.querySelectorAll('.addCart');
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
