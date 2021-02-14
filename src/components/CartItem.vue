<template>
    <div class="item">
        <div class="item-name">
          {{cartItem.N}}
        </div>
        <div class="item-quantity">
          <span v-if="cartItem.quantity > 1" @click="decrementItem">-</span>
          {{cartItem.quantity}}
          <span v-if="cartItem.quantity < cartItem.P" @click="incrementItem">+</span>
        </div>
        <div class="item-price">
          {{cartItem.newC}}
        </div>
        <button @click="deleteItemCart">Удалить</button>
    </div>
</template>

<script>
import store from '@/store/index'

export default {
  name: "CartItem",
  props: {
    cartItem:{
      type: Object
    }
  },
  methods: {
    deleteItemCart() {
      this.$emit('deleteItemCart')
    },
    decrementItem(){
      this.$emit('decrementItem')
    },
    incrementItem(){
      this.$emit('incrementItem')
    }
  },
  mounted() {
    this.$set(this.cartItem, 'quantity',1)
  }
};
</script>

<style lang="scss">
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
