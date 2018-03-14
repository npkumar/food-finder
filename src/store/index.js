import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

import data from './data'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedResturants: data.businesses,
    user: null
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

      // newest reviews first
      resturant.reviews.unshift(payload)
    },
    setUser (state, payload) {
      state.user = payload
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
    },
    signUpUser ({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            favoritedResturants: []
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signInUser ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const existingUser = {
            id: user.id,
            favoritedResturants: []
          }
          commit('setUser', existingUser)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signOutUser ({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
        })
        .catch(err => {
          console.log(err)
        })
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
    },
    user (state) {
      return state.user
    }
  }
})
