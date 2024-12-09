<template>
  <div class="container">
    <h1 class="page-title">Welcome to the Shoe Shop</h1>

    <section class="product-list">
      <h2>Shoe Details</h2>
      <div class="product-cards">
        <div class="product-card" v-for="shoe in shoes" :key="shoe.id">
          <div class="product-image">
            <img :src="shoe.imgUrl" alt="Shoe image" v-if="shoe.imgUrl" />
          </div>
          <div class="product-info">
            <h3>{{ shoe.brand }} - {{ shoe.size }}</h3>
            <p class="price">${{ shoe.price }}</p>
            <p class="rating">Rating: {{ shoe.rating || 'No rating available' }}</p>
            <p class="category">Category: {{ shoe.category }}</p>
            <p class="stock">In Stock: {{ shoe.quantityInStock }}</p>
            <p class="release-date">Release Date: {{ shoe.releaseDate ? new Date(shoe.releaseDate).toLocaleDateString() : 'N/A' }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="order-details">
      <h2>Order Details</h2>
      <div v-for="order in orders" :key="order.orderId" class="order-card">
        <h3>Order ID: {{ order.orderId }}</h3>
        <p><strong>Total Price:</strong> ${{ order.totalPrice }}</p>
        <p><strong>Shipping Address:</strong> {{ order.shippingAddress }}</p>
        <p><strong>Payment Method:</strong> {{ order.paymentMethod }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>
        <p><strong>Order Date:</strong> {{ new Date(order.orderDate).toLocaleDateString() }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProductDetails",
  data() {
    return {
      shoes: [],
      orders: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const shoeResponse = await fetch('http://localhost:3000/api/products');
        const shoes = await shoeResponse.json();
        this.shoes = shoes;

        const orderResponse = await fetch('http://localhost:3000/api/orders');
        const orders = await orderResponse.json();
        this.orders = orders;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Container for the entire page */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
}

/* Title of the page */
.page-title {
  text-align: center;
  font-size: 36px;
  color: #333;
  margin-bottom: 40px;
}

/* Styling for product list */
.product-list h2 {
  font-size: 28px;
  color: #444;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}

/* Container for product cards, using flexbox to align items horizontally */
.product-cards {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping to the next line if space is insufficient */
  gap: 20px;
  max-height: 600px; /* Set a max-height to create a scrollable area */
  overflow-y: auto; /* Enable vertical scrolling if content exceeds max-height */
}

/* Individual product cards */
.product-card {
  display: flex;
  background-color: #fff;
  padding: 20px;
  width: 300px; /* Adjusted width for a wider box */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex-shrink: 0; /* Prevents shrinking to fit within the container */
}

.product-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* Product image */
.product-image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

/* Product info (text beside image) */
.product-info {
  flex: 1;
  padding-left: 20px;
  /* Increase width of product info to ensure it fits the content */
  max-width: 180px; /* Set max width for product info to make sure text fits */
}

/* Price and text styling */
.price {
  font-size: 20px;
  font-weight: bold;
  color: #e63946;
}

.rating, .category, .stock, .release-date {
  font-size: 16px;
  color: #555;
  margin-top: 5px;
}

/* Styling for orders section */
.order-details {
  margin-top: 50px;
}

.order-details h2 {
  font-size: 28px;
  color: #444;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}

.order-card {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Order card styling */
.order-card p {
  font-size: 16px;
  color: #333;
}
</style>
