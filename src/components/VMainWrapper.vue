<template>
  <div class="container-wrapper">
    <h1>{{ msg }}</h1>
    <div class="set-currency">
      <div>
        Текущий курс: 
        <input 
        v-model="currency" 
        @change="changeCurrency" 
        type="text"
        >
      </div>
      <button @click="updatePrice">Обновить цены вручную</button>
    </div>
    <div class="timerUpdateCurrency">Последнее обновление курса <span>{{time}}</span></div>
    <div class="catalog">
      <Categories 
      class="catalog-categorie"
      v-for="(value,key) in catalog" 
      :key="key"
      v-bind:category="value"
      @addToCart="addToCart"
      />
    </div>
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
import { mapState, mapGetters  } from 'vuex'
export default {
  name: 'VMainWrapper',
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
      'getdate',
      'getCart'
    ]),
    time() {
      const t = this.getdate
      return [
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
      ].map(n => `0${n}`.slice(-2)).join(':');
    },
  },
  methods: {
    addToCart: function(data) {
      store.dispatch('addToCart', data)
    },
    changeCurrency: function() {
      store.dispatch('updateCurrency', this.currency)
    },
    updatePrice: function() {
      store.dispatch('updatePriceClick')
    }
  },
  created(){
    store.commit('createCatalog')
    store.dispatch('updatePrice')
  }
};
</script>

<style lang="scss">
    
</style>
