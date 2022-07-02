<template>
  <div v-if="!loaded"><h1>LOADING !!!</h1></div>
  <section class="categories">
    <input type="button" :value="category.name" v-for="category in categories" v-bind:key="category.id"
           @click="showProducts(category.id)" class="m-3 "
    />
  </section>
  <section class="products">
    <ul>
      <li v-for="product in products" v-bind:key="product.id" class="product-item">
        <b>{{ product.name }}</b> {{ product.description }} price: {{ product.price }} zł
      </li>
    </ul>
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
      axios.get('/example-data.json')
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
