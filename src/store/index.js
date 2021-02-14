import Vue from "vue";
import Vuex from "vuex";
import DataFile from '../assets/data.json';
import NameFile from '../assets/names.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataFile: DataFile.Value.Goods,
    namesFile: NameFile,
    currence: 20,
    templatyCatalog: {},
    catalog: {},
    cart: []
  },
  mutations: {
    createCatalog(state) {
      
      // "C" - цена в долларах(USD) - вывести в рублях(курс выбрать произвольно),
      // "G" - id группы,
      // "T" - id товара,
      // "P" - сколько единиц товара осталось (параметр, который указан в скобках в названии).

      for(let i=0; i < state.dataFile.length; i++){
        let C = state.dataFile[i].C;
        let G = state.dataFile[i].G;
        let T = state.dataFile[i].T;
        let P = state.dataFile[i].P;
        let nameCat = state.namesFile[G].G;
        let nameProduct = state.namesFile[G].B[T].N
        let oldPrice
        if(state.templatyCatalog[G] !== undefined){
          oldPrice = state.templatyCatalog[G].B[T].newC
        }else{
          oldPrice = ''
        }
        // create category
        if(state.namesFile[G] !== undefined && state.catalog[G] === undefined){
          state.catalog[G] = {'G' : nameCat, 'B' : {}}
        }

        if(state.catalog[G] !== undefined){
          if(state.catalog[G].B[T] === undefined){
            state.catalog[G].B[T] = {'N' : nameProduct, 'G' : G, 'T' : T , 'C' : C, 'newC' : (C*state.currence).toFixed(2), 'oldC' : oldPrice, 'P' : P}
          }else{
            state.catalog[G].B[T] = {'N' : nameProduct, 'G' : G, 'T' : T , 'C' : C, 'newC' : (C*state.currence).toFixed(2), 'oldC' : oldPrice, 'P' : P}
          }
        }

      }
      // console.log(state.catalog)
    },
    setToCart(state, product) {
      if(state.cart.length){
        let isProductExists = false
        state.cart.map(function(item){
          if(item.T === product.T){
            isProductExists = true
            item.quantity++
          }
        })
        if(!isProductExists){
          state.cart.push(product)
        }
      }else{
        state.cart.push(product)
      }
    },
    removeItemCart(state, index) {
      state.cart.splice(index,1);
    },
    increment(state, index) {
      if(state.cart[index].P > state.cart[index].quantity){
        state.cart[index].quantity++
      }
    },
    decrement(state, index) {
      if(state.cart[index].quantity > 1){
        state.cart[index].quantity--
      }
    },
    incrementCatalog(state, index) {
      state.catalog[state.cart[index].G].B[state.cart[index].T].P--
    },
    decrementCatalog(state, index) {
      state.catalog[state.cart[index].G].B[state.cart[index].T].P++
    },
    updateCurrency(state, data) {
      state.currence = data
    },
    updatePrice(state) {
      state.templatyCatalog = {}
      state.templatyCatalog = Object.assign({}, state.catalog);
      state.catalog = {}
    }
  },
  actions: {
    addToCart({commit}, product) {
      commit('setToCart', product)
    },
    deleteItemCart({commit}, index) {
      commit('removeItemCart', index)
    },
    decrementItem({commit}, index) {
      commit('decrement', index)
      commit('decrementCatalog', index)
    },
    incrementItem({commit}, index) {
      commit('increment', index)
      commit('incrementCatalog', index)
    },
    updateCurrency({commit}, data) {
      commit('updateCurrency', data)
    },
    updatePrice({commit}) {
      setInterval(() => {
        commit('updatePrice')
        commit('createCatalog')
      }, 15000)
    },
    updatePriceClick({commit}) {
      commit('updatePrice')
      commit('createCatalog')
    }
  },
  modules: {},
  getters: {
    getCatalog: state => state.catalog,
    getCart: state => state.cart,
    getCurrency: state => state.currence
  }
});
