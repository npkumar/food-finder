import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedResturants: data.businesses,
    user: {
      id: 'batman',
      favoritedResturants: ['1']
    }
  },
  mutations: {},
  actions: {},
  getters: {
    loadedResturants (state) {
      return state.loadedResturants.sort((a, b) => {
        return a.rating > b.rating
      })
    },
    loadedResturant (state) {
      return (restaurantId) => {
        return state.loadedResturants.find(restaurant => {
          return restaurant.id === restaurantId
        })
      }
    }
  }
})
