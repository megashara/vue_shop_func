<template>
    <div class="item-cart">
        <div class="item-name">
          {{cartItem.N}}
        </div>
        <div class="item-quantity">
          <span class="item-quantity-sim" v-if="cartItem.quantity > 1" @click="decrementItem">-</span>
          <span class="item-quantity-number">{{cartItem.quantity}}</span>
          <span class="item-quantity-sim" v-if="cartItem.quantity < cartItem.P" @click="incrementItem">+</span>
        </div>
        <div class="item-price">
          {{cartItem.newC}} p.
        </div>
        <button @click="deleteItemCart">Удалить</button>
    </div>
</template>

<script>

export default {
  name: 'CartItem',
  props: {
    cartItem: {
      type: Object
    }
  },
  methods: {
    deleteItemCart() {
      this.$emit('deleteItemCart')
    },
    decrementItem() {
      this.$emit('decrementItem')
    },
    incrementItem() {
      this.$emit('incrementItem')
    }
  },
  mounted() {
    this.$set(this.cartItem, 'quantity', 1)
  }
};
</script>

<style lang="scss">
  
</style>
