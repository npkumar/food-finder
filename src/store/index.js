import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

import data from './data'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedResturants: data.businesses,
    user: null,
    loading: false,
    error: null
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
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
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
      commit('setLoading', true)
      commit('setError', null)

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            favoritedResturants: []
          }
          commit('setLoading', false)
          commit('setUser', newUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err.message)
        })
    },
    signInUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('setError', null)

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const existingUser = {
            id: user.id,
            favoritedResturants: []
          }
          commit('setLoading', false)
          commit('setUser', existingUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err.message)
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
    },
    error (state) {
      return state.error
    },
    loading (state, error) {
      return state.loading
    }
  }
})
