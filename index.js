
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
        const response = await axios.post('https://crudcrud.com/api/2ff5984360804e96a09bbd4586c6ad01/products', productData);

        // Display the added product on the screen
        displayProduct(response.data);
    } catch (error) {
        console.error(error);
    }

    // Clear the form fields
    productForm.reset();
});

function displayProduct(product) {
    const catElectronic = document.getElementById('catElectronic');
    const productListByCat = document.getElementById('productListByCat').style.display='block';
    const catFood = document.getElementById('catFood');
    const catSkinCare = document.getElementById('catSkinCare');
    const listItem = document.createElement('li');
    listItem.setAttribute('id', product._id); 
    listItem.innerHTML = `<strong>${product.category}-item</strong> -${product.name}-Price: ${product.price} Rupees <button onclick="deleteProduct('${product._id}')">Delete</button>`;
    productList.appendChild(listItem);
    
    if(product.category == 'electronic'){
        catElectronic.appendChild(listItem);
    }else if(product.category == 'food'){
        catFood.appendChild(listItem);
    }else if(product.category == 'skincare'){
        catSkinCare.appendChild(listItem);
    }
}

// Function to load products from the backend API
async function loadProducts() {
    try {
        const response = await axios.get('https://crudcrud.com/api/2ff5984360804e96a09bbd4586c6ad01/products');
        response.data.forEach(product => displayProduct(product));
    } catch (error) {
        console.error(error);
    }
}


async function deleteProduct(productId) {
    try {
        await axios.delete(`https://crudcrud.com/api/2ff5984360804e96a09bbd4586c6ad01/products/${productId}`);
  
        document.getElementById(productId).remove();
    } catch (error) {
        console.error(error);
    }
}

// Load existing products on page load
window.addEventListener('load', loadProducts);
