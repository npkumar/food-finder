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
  mutations: {
    createReview (state, payload) {
      const restaurantId = payload.restaurantId

      const resturant = state.loadedResturants.find(restaurant => {
        return restaurant.id === restaurantId
      })

      if (!resturant.reviews) {
        resturant.reviews = []
      }

      resturant.reviews.push(payload)
    }
  },
  actions: {
    createReview ({ commit }, payload) {
      const review = {
        review: payload.review,
        restaurantId: payload.restaurantId,
        userId: payload.userId,
        created: payload.created
      }

      commit('createReview', review)
    }
  },
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
