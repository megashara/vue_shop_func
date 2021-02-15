<template>
  <div class="item-product" :class="checkPrice" @click="addToCartProduct">
    <div class="item-name">{{ product.N }} ( {{ product.P }} )</div>
    <div class="item-price">{{ product.newC }} p.</div>
  </div>
</template>

<script>
export default {
  name: 'VMainWrapper',
  props: {
    product: Object,
  },
  data: function () {
    return {
      green: false,
      red: false
    }
  },
  methods: {
    addToCartProduct: function() {
      this.$emit("addToCartProduct", this.product)
    },
  },
  computed: {
    checkPrice: function() {
      if (this.product.oldC !== '') {
        if (this.product.oldC < this.product.newC) {
          this.green = false
          this.red = true
        } else if (this.product.oldC > this.product.newC) {
          this.green = true
          this.red = false
        } else {
          this.green = false
          this.red = false
        }
      } else {
        this.green = false
        this.red = false
      }
      return {'green' : this.green , 'red' : this.red}
    }
  }
};
</script>

<style lang="scss">
  
</style>
