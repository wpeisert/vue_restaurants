<template>
  <h1>Categories</h1>
  <ul>
    <li v-for="category in categories" v-bind:key="category.id">{{ category.id }} {{ category.name }}</li>
  </ul>
</template>

<script>
export default {
  name: 'CategoriesAll',
  data: function () {
    return {
      categories: [],
    }
  },
  mounted () {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      this.categories = [
        {id: '1', name: 'cat1'},
        {id: '2', name: 'cat2'},
      ];
    }
  }
}
</script>
