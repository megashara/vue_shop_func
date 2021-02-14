<template>
  <div class="container-wrapper">
    <h1>{{ msg }}</h1>
    <div class="currency">
      Текущий курс <input v-model="currency" @change="changeCurrency" type="text"> <button @click="updatePrice">Обновить цены вручную</button>
    </div>
    <Categories 
      v-for="(value,key) in catalog" 
      :key="key"
      v-bind:category="value"
      @addToCart="addToCart"
    />
    <Cart 
      v-if="getCart.length"
      :cartData="getCart"
    />
  </div>
</template>

<script>
import Categories from './Categories'
import Cart from './Cart'
import store from '@/store/index'
import { mapState, mapGetters  } from 'vuex';
store.commit('createCatalog')
store.dispatch('updatePrice')
export default {
  name: "VMainWrapper",
  props: {
    msg: String
  },
  components: {
    Categories,
    Cart
  },
  data: function() {
    return{
      currency: store.getters.getCurrency
    }
  },
  computed: {
    ...mapState([
      'catalog'
      ]),
    ...mapGetters([
      'getCatalog',
      'getCart'
    ])
  },
  methods: {
    addToCart: function(data) {
      store.dispatch('addToCart', data)
    },
    changeCurrency: function() {
      store.dispatch('updateCurrency',this.currency)
    },
    updatePrice: function() {
      store.dispatch('updatePriceClick')
    }
  }
};
</script>

<style lang="scss">
    .container-wrapper{
        max-width: 1024px;
        width: 100%;
        margin: 0 auto;
    }
</style>
