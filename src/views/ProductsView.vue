<template>
  <div class="products_all">
    <ProductsAll />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductsAll from "@/components/ProductsAll";

export default {
  name: 'ProductsView',
  components: {
    ProductsAll
  }
}
</script>