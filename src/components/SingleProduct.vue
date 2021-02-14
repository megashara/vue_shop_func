<template>
  <div class="item" :class="checkPrice">
    <div class="item-name">{{ product.N }}({{ product.P }})</div>
    <div class="item-price">{{ product.newC }}</div>
    <button @click="addToCartProduct">Добавить в корзину</button>
  </div>
</template>

<script>
export default {
  name: "VMainWrapper",
  props: {
    product: Object,
  },
  data: function () {
    return{
      green: false,
      red: false
    }
  },
  methods: {
    addToCartProduct: function() {
      this.$emit("addToCartProduct", this.product);
    },
  },
  computed: {
    checkPrice: function() {
      if(this.product.oldC !== ''){
        if(this.product.oldC < this.product.newC){
          this.green = false
          this.red = true
        }else{
          this.green = true
          this.red = false
        }
      }else{
        this.green = false
        this.red = false
      }
      return {'green' : this.green , 'red' : this.red}
    }
  }
};
</script>

<style lang="scss">
.item {
  margin-bottom: 5px;
  border: 1px solid #000;
  &.red{
    background: red;
    color:#fff;
  }
  &.green{
    background: green;
    color:#fff;
  }
}
</style>
