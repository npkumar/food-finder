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

      const position = state.loadedResturants.findIndex(restaurant => {
        return restaurant.id === restaurantId
      })

      const restaurant = state.loadedResturants[position]
      if (!restaurant.reviews) {
        restaurant.reviews = []
      }

      // newest reviews first
      restaurant.reviews.unshift(payload)

      // insert back
      state.loadedResturants.splice(position, 1, restaurant)
    },
    setReview (state, payload) {
      const restaurantId = payload.restaurantId

      const position = state.loadedResturants.findIndex(restaurant => {
        return restaurant.id === restaurantId
      })

      const restaurant = state.loadedResturants[position]
      restaurant.reviews = payload.reviews

      // insert back
      state.loadedResturants.splice(position, 1, restaurant)
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
        username: payload.username,
        created: payload.created
      }

      // store in firebase
      // keep adding reviews to a restaurant
      firebase.database().ref(`reviews/${payload.restaurantId}`).push(review)
        .then(data => {
          // now update state
          commit('createReview', review)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadReviews ({ commit }, payload) {
      firebase.database().ref(`reviews/${payload.restaurantId}`).once('value')
        .then(data => {
          const reviews = []
          const obj = data.val()
          for (let key in obj) {
            reviews.push(obj[key])
          }
          // we attach the reviews to resturant
          commit('setReview', {
            restaurantId: payload.restaurantId,
            reviews
          })
        })
        .then(err => {
          console.log(err)
        })
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
            id: user.uid,
            username: user.email.split('@')[0],
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
