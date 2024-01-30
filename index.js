const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

productForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;

    const productData = {
        name: productName,
        price: productPrice,
        category: productCategory
    };

    try {
        // Add product to the backend API
        const response = await axios.post('https://crudcrud.com/api/8406b6da9729467aa61e3bbdd913eb3b/products', productData);

        // Display the added product on the screen
        displayProduct(response.data);
    } catch (error) {
        console.error(error);
    }

    // Clear the form fields
    productForm.reset();
});

function displayProduct(product) {
    
    const listItem = document.createElement('li');
    listItem.setAttribute('id', product._id); 
    listItem.innerHTML = `<strong>${product.name}</strong> - Price: ${product.price} Rupees, Category: ${product.category} <button onclick="deleteProduct('${product._id}')">Delete</button>`;
    productList.appendChild(listItem);
}

// Function to load products from the backend API
async function loadProducts() {
    try {
        const response = await axios.get('https://crudcrud.com/api/8406b6da9729467aa61e3bbdd913eb3b/products');
        response.data.forEach(product => displayProduct(product));
    } catch (error) {
        console.error(error);
    }
}


async function deleteProduct(productId) {
    try {
        await axios.delete(`https://crudcrud.com/api/8406b6da9729467aa61e3bbdd913eb3b/products/${productId}`);
  
        document.getElementById(productId).remove();
    } catch (error) {
        console.error(error);
    }
}

// Load existing products on page load
window.addEventListener('load', loadProducts);

