<template>
    <div>
        <h2>{{category.G}}</h2>
        <SingleProduct
            v-for="(product,key) in category.B" 
            :key="key"
            :product="product"
            @addToCartProduct="addToCart"
        />
    </div>
</template>

<script>
import SingleProduct from './SingleProduct'

export default {
  name: "Categories",
  props: {
    category: Object
  },
  components: {
    SingleProduct
  },
  methods: {
    addToCart: function(data){
      this.$emit('addToCart', data)
    }
  }
};
</script>

<style lang="scss">
</style>
