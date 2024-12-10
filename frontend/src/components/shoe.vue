<template>
  <div class="container">
    <div class="logo">
      <a href="/"><img src="/image/logo-transparent-frontend.png" width="125px" alt="Logo"></a>
    </div>
    <h2 class="page-title">Shoe Shop</h2>
    <div v-if="isAdmin" class="admin-controls">
      <button @click="showAddProduct = !showAddProduct" class="toggle-button">Add New Product</button>
      <div v-if="showAddProduct" class="add-product-form">
        <form @submit.prevent="addProduct">
          <input v-model="newProduct.name" placeholder="Shoe Name" />
          <input v-model="newProduct.brand" placeholder="Brand" />
          <input v-model="newProduct.price" placeholder="Price" type="number" />
          <input v-model="newProduct.size" placeholder="Size" type="number" />
          <input v-model="newProduct.quantityInStock" placeholder="Stock" type="number" />
          <input v-model="newProduct.id" placeholder="ID" type="number" />
          <input v-model="newProduct.rating" placeholder="Rating" type="number" />
          <input v-model="newProduct.releaseDate" placeholder="Release Date" type="date" />
          <input v-model="newProduct.category" placeholder="Category" type="text" />
          <input v-model="newProduct.color" placeholder="Color" type="text" />
          <input v-model="newProduct.imgUrl" placeholder="Image URL" type="text" />
          <button type="submit" class="submit-button">Add Product</button>
        </form>
      </div>
    </div>
    <div>
      <h1>Product Details</h1>
    </div>

    <ul class="product-list">
      <li v-for="shoe in shoes" :key="shoe._id" class="product-card">
        <div class="product-image">
          <img :src="shoe.imgUrl" alt="Shoe Image" />
        </div>
        <div class="product-info">
          <h3>{{ shoe.name }}</h3>
          <p>Brand: {{ shoe.brand }}</p>
          <p>Size: {{ shoe.size }}</p>
          <p class="price">Price: ${{ shoe.price }}</p>
          <p class="stock">Stock: {{ shoe.quantityInStock }}</p>
          <p class="rating">Rating: {{ shoe.rating }}</p>
          <p>Category: {{ shoe.category }}</p>
          <p>Color: {{ shoe.color }}</p>
        </div>
        <span v-if="isAdmin" class="admin-actions">
          <button @click="deleteProduct(shoe._id)" class="delete-button">Delete</button>
        </span>
      </li>
    </ul>
  </div>
</template>



<script>
import axios from 'axios';


export default {
  name: 'ShoeItem',
  data() {
    return {
      shoes: [],
      showAddProduct: false,
      newProduct: {
        name: '',
        brand: '',
        price: 'prize',
        size: 'size',
        quantityInStock: 'quantity',
        id: 'id',
        rating: 'rating',
        releaseDate: 'releaseDate',
        category: '',
        color: '',
        imgUrl: ''
      },
      isAdmin: false,
    };
  },
  async created() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      this.isAdmin = true;
      console.log('isAdmin:', this.isAdmin);

    }

    // Fetch products
    const response = await axios.get('http://localhost:3000/api/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.shoes = response.data;
  },
  methods: {
    async addProduct() {
      console.log('new product')
      console.log(JSON.stringify(this.newProduct))
      const token = localStorage.getItem('token');
      console.log(token)
      try {
        // await axios.post('http://localhost:3000/api/products', {
        const response = await fetch("http://localhost:3000/api/products", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',  // Add this header
          },
          body: JSON.stringify({
                id: this.newProduct.id,
                brand: this.newProduct.brand,
                size: this.newProduct.size,
                rating: this.newProduct.rating,
                price: this.newProduct.price,
                releaseDate: this.newProduct.releaseDate,
                quantityInStock: this.newProduct.quantityInStock,
                category: this.newProduct.category,
                color: this.newProduct.color,
                imgUrl: this.newProduct.imgUrl,
              }
          )
        });
        if (!response.ok) {
          console.log('')
        } else {
          const data = await response.json()
          console.log(data)
        }
        this.shoes.push(JSON.parse(JSON.stringify(this.newProduct)));
        // this.newProduct = { name: '', brand: '', price: 0, size: 0, stock: 0 };
        // const NewProduct1 = {}
      } catch (err) {
        console.error('Failed to add product', err);
      }
    },
    async deleteProduct(id) {
      const token = localStorage.getItem('token');
      try {
        // Use proper string interpolation with backticks and quotes around the URL
        await axios.delete(`http://localhost:3000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the local shoe list by removing the deleted item
        this.shoes = this.shoes.filter((shoe) => shoe._id !== id);
      } catch (err) {
        console.error('Failed to delete product', err);
      }
    }
  },
}

</script>
<style>/* Expand the Add Product Form */
/* Expand the Add Product Form */
.add-product-form form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
  max-width: 900px; /* Adjusted max-width */
  margin: 0 auto; /* Centering the form */
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-product-form input {
  width: 100%;
  padding: 12px; /* Increased padding for better input size */
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 5px 0;
}

.add-product-form button {
  grid-column: span 2;
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-product-form button:hover {
  background-color: #45a049;
}

/* Make the form responsive on smaller screens */
@media (max-width: 768px) {
  .add-product-form form {
    grid-template-columns: 1fr; /* Single column for smaller screens */
  }
}

/* Other Styles */
.container {
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
}

.admin-controls {
  margin-bottom: 20px;
}

.toggle-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.toggle-button:hover {
  background-color: #45a049;
}

/* Product List - Horizontal Layout */
.product-list {
  display: flex;
  flex-wrap: nowrap; /* Prevent items from wrapping to the next line */
  justify-content: flex-start; /* Align items to the left */
  gap: 20px;
  overflow-x: auto; /* Enables horizontal scrolling when the list exceeds the width */
  padding-bottom: 10px; /* Optional: Adds padding to ensure smooth scrolling */
}

.product-list > li {
  flex: 0 0 auto; /* Prevents shrinking and growing */
  width: 300px; /* Adjust width for your card size */
  max-height: 600px; /* Set max height for product cards */
}

/* Product Card */
.product-card {
  width: 300px; /* Adjust the width as needed */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px; /* Padding inside the card */
  text-align: left; /* Align content to the left */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info {
  margin-top: 15px;
  font-size: 0.9rem; /* Adjust font size for readability */
}

.product-info p {
  margin: 5px 0; /* Space between product details */
}

.price {
  font-weight: bold;
  color: #4CAF50;
}

.admin-actions {
  text-align: center;
}

.delete-button {
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #e53935;
}


</style>
