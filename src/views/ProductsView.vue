<template>
  <div class="products">
    <CategoriesAll />
    <ProductsAll />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductsAll from '@/components/ProductsAll.vue'
import CategoriesAll from "@/components/CategoriesAll";

export default {
  name: 'ProductsView',
  components: {
    CategoriesAll,
    ProductsAll
  }
}
</script>