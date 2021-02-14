<template>
    <div class="Cart">
        <h2>Корзина</h2>
        <CartItem 
          v-for="(item,index) in cartData" 
          :key="item.T"
          :cartItem="item"
          @deleteItemCart="deleteItemCart(index)"
          @incrementItem="incrementItem(index)"
          @decrementItem="decrementItem(index)"
        />
        <div class="cartTotalPrice">
          <p>Сумма:</p>
          <p>{{cartTotalCost}}</p>
        </div>
    </div>
</template>

<script>
import CartItem from './CartItem'
import store from '@/store/index'

export default {
  name: "Cart",
  props: {
    cartData:{
      type: Array
    }
  },
  components: {
    CartItem
  },
  computed:{
    cartTotalCost() {
      let result =[]
      if(this.cartData.length){
        for (let item of this.cartData) {
          result.push(item.newC * item.quantity)
        }
        result = result.reduce(function(sum, el){
          return sum + el
        })
        return result.toFixed(2)
      }else{
        return 0
      }
    }
  },
  methods: {
    deleteItemCart(index) {
      store.dispatch('deleteItemCart', index)
    },
    decrementItem(index) {
      store.dispatch('decrementItem', index)
    },
    incrementItem(index) {
      store.dispatch('incrementItem', index)
    }
  }
};
</script>

<style lang="scss">
  .cartTotalPrice{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
