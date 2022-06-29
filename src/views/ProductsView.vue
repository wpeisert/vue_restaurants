<template>
  <div class="products">
    <CategoriesAll />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoriesAll from "@/components/CategoriesAll";

export default {
  name: 'ProductsView',
  components: {
    CategoriesAll
  }
}
</script>