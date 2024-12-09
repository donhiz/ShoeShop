<template>
  <div>
    <h2>Shoe Shop</h2>
    <div v-if="isAdmin">
      <button @click="showAddProduct = !showAddProduct">Add New Product</button>
      <div v-if="showAddProduct">
        <form @submit.prevent="addProduct">
          <input v-model="newProduct.name" placeholder="Shoe Name" />
          <input v-model="newProduct.brand" placeholder="Brand" />
          <input v-model="newProduct.price" placeholder="Price" type="number" />
          <input v-model="newProduct.size" placeholder="Size" type="number" />
          <input v-model="newProduct.quantityInStock" placeholder="Stock" type="number" />
          <input v-model="newProduct.id" placeholder="Stock" type="number" />
          <input v-model="newProduct.rating" placeholder="Stock" type="number" />
          <input v-model="newProduct.releaseDate" placeholder="Stock" type="date" />
          <input v-model="newProduct.category" placeholder="Stock" type="text" />
          <input v-model="newProduct.color" placeholder="Stock" type="text" />
          <input v-model="newProduct.imgUrl" placeholder="Stock" type="text" />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>

    <ul>
      <li v-for="shoe in shoes" :key="shoe._id">
        {{ shoe.name }} - ${{ shoe.price }} - {{ shoe.stock }} in stock
        <span v-if="isAdmin">
          <button @click="deleteProduct(shoe._id)">Delete</button>
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
      newProduct: { name: '', brand: '', price: 0, size: 0, quantityInStock: 0 , id: 0,rating:0,releaseDate:0, category: '', color:'',imgUrl:''},
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
        const response = await fetch("http://localhost:3000/api/products",{
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',  // Add this header
          },
          body:JSON.stringify({
                id: this.newProduct.id,
                brand: this.newProduct.brand,
                size:  this.newProduct.size,
                rating:  this.newProduct.rating,
                price:  this.newProduct.price,
                releaseDate:  this.newProduct.releaseDate,
            quantityInStock:  this.newProduct.quantityInStock,
                category:  this.newProduct.category,
                color:  this.newProduct.color,
                imgUrl:  this.newProduct.imgUrl,
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
        await axios.delete(`http://localhost:3000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.shoes = this.shoes.filter(shoe => shoe._id !== id);
      } catch (err) {
        console.error('Failed to delete product', err);
      }
    },
  },
};
</script>
