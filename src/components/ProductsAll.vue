<template>
  <div v-if="!loaded"><h1>LOADING !!!</h1></div>
  <div class="main">
    <div class="categories">
      <input type="button" :value="category.name" v-for="category in categories" v-bind:key="category.id"
             @click="showProducts(category.id)" class="category-button"
             :class="{'category-selected': category.id === category_id}"
      />
    </div>
    <div class="order-count" :class="{'order-hidden': getOrderCount() === 0}">
      {{ getOrderCount() }} &nbsp; &nbsp; &nbsp;
    </div>
    <div class="order-count" :class="{'order-hidden': getOrderCount() === 0}">
      {{ getOrderTotal() }} zł
    </div>
    <div style="clear: both;"></div>
  </div>
  <section class="products">
    <div class="product" v-for="product in products" v-bind:key="product.id" @click="clickProduct(product.id)">
      <div class="product-image-wrapper">
        <img class="product-image" v-bind:src="'/products/images/' + product.image" alt="image">
      </div>
      <div class="product-content">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-price">{{ product.price }} zł</div>
        <div style="clear: both;"></div>
        <div class="product-description">{{ product.description }}</div>
        <div class="product-order" :class="{'order-hidden': getOrderProductCount(product.id) === 0}">
          <input type="button" class="product-minus" value="-" v-on:click.stop="decrProduct(product.id)"/>
          <input type="button" class="product-count" :value="getOrderProductCount(product.id)" />
          <input type="button" class="product-plus" value="+" v-on:click.stop="incrProduct(product.id)"/>
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
    
  </section>

</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductsAll',
  data: function () {
    return {
      data: {},
      categories: [],
      products: [],
      loaded: false,
      category_id: 0,
      order: { products: []}
    }
  },
  mounted () {
    this.loadAll();
  },
  methods: {
    showProducts(id) {
      this.category_id = id
      this.products = [];
      for (let product of this.data.products) {
        if (id === 0 || id === product.category_id) {
          this.products.push(product);
        }
      }
    },
    loadAll() {
      axios.get('/products/example-data.json')
          .then((response) => {
            this.data = response.data;
            this.categories = this.data.categories;
            if (this.data.settings.show_all_products) {
              this.categories.unshift({id: 0, name: "Wszystko"});
              this.category_id = 0;
            } else {
              this.category_id = this.categories[0].id;
            }
            this.loaded = true;
            this.showProducts(this.category_id);
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
          });
    },
    getOrderProductCount(productId) {
      if (!this.order || !this.order.products || !this.order.products[productId]) {
        return 0;
      }
      return this.order.products[productId];
    },
    clickProduct(productId) {
      if (this.order.products[productId]) {
        return;
      }
      this.order.products[productId] = 1;
    },
    incrProduct(productId) {
      this.order.products[productId]++;
    },
    decrProduct(productId) {
      this.order.products[productId]--;
    },
    getOrderCount() {
      var count = 0;
      for (var cnt of this.order.products) {
        if (cnt) {
          count += cnt;
        }
      }
      return count;
    },
    getOrderTotal() {
      var total = 0;
      for (let index = 0; index < this.order.products.length; ++index) {
        if (!this.order.products[index]) {
          continue;
        }
        total += this.order.products[index] * (this.getProductById(index)).price;
      }
      return total;
    },
    getProductById(productId) {
      for (let product of this.data.products) {
        if (productId === product.id) {
          return product;
        }
      }
    }
  }
}
</script>

<style>

div {
  border: 0px solid yellow;
}

.product {
  display: flex;
  max-width: 24rem;
  margin: 0 auto;
  padding: 1rem;
  border-top: 1px solid grey;
  background-color: #000;
}
.product:hover {
  background-color: #444;
}
.product-image-wrapper {
  flex-shrink: 0;
}
.product-image {
  height: 3rem;
  width: 3rem;
}
.product-content {
  margin-left: 1.5rem;
  padding-top: 0.25rem;
  max-width: 17rem;
  width: 100%;
  flex-shrink: 0;
}

.product-name {
  display: inline;
  text-align: left;
  float: left;
  font-size: 1.25rem;
  line-height: 1.25;
  color: #fff;
}
.product-price {
  float: right;
  font-size: 1.25rem;
  line-height: 1.25;
  color: #fff;
  font-weight: bold;
}
.product-description {
  display: inline;
  text-align: left;
  float: left;
  font-size: 1rem;
  line-height: 1.5;
  color: #bbb;
  max-width: 12rem;
}
.main {
  display: flex;
  max-width: 24rem;
  margin: 0 auto;
  background-color: #000;
}
.categories {
  float: left;
  min-width: 20rem;
}
.category-button {
  display: inline-flex;
  max-width: 24rem;
  margin: 0 auto;
  padding: 1rem;
  background-color: #000;
  color: #dd0;
}
.category-button:hover {
  background-color: #444;
}
.category-selected {
  color: #fff;
  font-weight: bold;
}

.product-order {
  display: inline;
  float: right;
}
.order-hidden {
  display: none;
}
.order-count {
  font-weight: bold;
  font-size: 20px;
  color: #880000;
  border: 1px solid #880000;
  background-color: #ff6666;
  border-radius: 10px;
  float: right;
  text-align: center;
}

.product-minus, .product-plus {
  font-size: 30px;
  color: red;
  font-weight: bold;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  border: 0;
}

.product-count {
  font-size: 20px;
  width: 2rem;
  background-color: #fff;
}


</style>