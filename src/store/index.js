import Vue from "vue";
import Vuex from "vuex";
import NameFile from '../assets/names.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    namesFile: NameFile,
    currence: 20,
    dateUpdate: new Date(),
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
      const dataFile = require('../assets/data.json').Value.Goods
      for(let i=0; i < dataFile.length; i++) {
        let C = dataFile[i].C,
        G = dataFile[i].G,
        T = dataFile[i].T,
        P = dataFile[i].P,
        nameCat = state.namesFile[G].G,
        nameProduct = state.namesFile[G].B[T].N,
        oldPrice
        if(state.templatyCatalog[G] !== undefined){
          oldPrice = state.templatyCatalog[G].B[T].newC
        }else{
          oldPrice = ''
        }
        // create category
        if(state.namesFile[G] !== undefined && state.catalog[G] === undefined) {
          state.catalog[G] = {'G' : nameCat, 'B' : {}}
        }
        // add product
        if(state.catalog[G] !== undefined) {
          state.catalog[G].B[T] = {'N' : nameProduct, 'G' : G, 'T' : T , 'C' : C, 'newC' : (C*state.currence).toFixed(2), 'oldC' : oldPrice, 'P' : P}
        }
      }
    },
    //add to cart
    setToCart(state, product) {
      if(state.cart.length) {
        let isProductExists = false
        state.cart.map(function(item) {
          if(item.T === product.T) {
            if(item.quantity === product.P) {
              isProductExists = true
            } else {
              isProductExists = true
              item.quantity++
            }
          }
        })
        if(!isProductExists) {
          state.cart.push(product)
        }
      } else {
        state.cart.push(product)
      }
    },
    removeItemCart(state, index) {
      state.cart.splice(index,1)
    },
    increment(state, index) {
      if(state.cart[index].P > state.cart[index].quantity) {
        state.cart[index].quantity++
      }
    },
    decrement(state, index) {
      if(state.cart[index].quantity > 1) {
        state.cart[index].quantity--
      }
    },
    updateCurrency(state, data) {
      if(data !== '') {
        state.currence = data
      } else {
        state.currence = 1
      }
    },
    updatePrice(state) {
      state.templatyCatalog = {}
      state.templatyCatalog = Object.assign({}, state.catalog)
      state.catalog = {}
    },
    updateTime(state) {
      state.dateUpdate = new Date()
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
    },
    incrementItem({commit}, index) {
      commit('increment', index)
    },
    updateCurrency({commit}, data) {
      commit('updateCurrency', data)
    },
    updatePrice({commit}) {
      setInterval(() => {
        commit('updatePrice')
        commit('createCatalog')
        commit('updateTime')
      }, 15000)
    },
    updatePriceClick({commit}) {
      commit('updatePrice')
      commit('createCatalog')
      commit('updateTime')
    }
  },
  modules: {},
  getters: {
    getCatalog: state => state.catalog,
    getCart: state => state.cart,
    getCurrency: state => state.currence,
    getdate: state => state.dateUpdate
  }
});
