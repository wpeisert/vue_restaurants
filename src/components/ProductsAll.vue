<template>
  <div v-if="!loaded"><h1>LOADING !!!</h1></div>
  <section class="categories">
    <input type="button" :value="category.name" v-for="category in categories" v-bind:key="category.id"
           @click="showProducts(category.id)" class="category-button"
           :class="{'category-selected': category.id === category_id}"
    />
  </section>
  <section class="products">
    <div class="product" v-for="product in products" v-bind:key="product.id">
      <div class="product-image-wrapper">
        <img class="product-image" v-bind:src="'/products/images/' + product.image" alt="image">
      </div>
      <div class="product-content">
        <h4 class="product-name">{{ product.name }}</h4>
        <p class="product-description">{{ product.description }}</p>
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
      category_id: 0
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
    }
  }
}
</script>

<style>

.product {
  display: flex;
  max-width: 24rem;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 0.5rem;
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

}
.product-name {
  display: flex;
  font-size: 1.25rem;
  line-height: 1.25;
  color: #fff;
}
.product-description {
  display: flex;
  font-size: 1rem;
  line-height: 1.5;
  color: #bbb;
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

</style>