import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VuexPersistence from 'vuex-persist'

import config from '../config'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    loadedResturants: null,
    restaurant: null,
    user: null,
    loading: false,
    error: null,
    latitude: 1.35,
    longitude: 103.86
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
    },
    setCoordinates (state, payload) {
      state.latitude = payload.latitude
      state.longitude = payload.longitude
      console.log(payload)
    },
    setLoadedResturants (state, payload) {
      state.loadedResturants = payload
    },
    setRestaurant (state, payload) {
      state.restaurant = payload
    }
  },
  actions: {
    setCoordinates ({ commit }, payload) {
      const latitude = payload.coords.latitude
      const longitude = payload.coords.longitude

      // store state and get new restaurant details only if we
      // detect a change in location of user
      if (this.state.latitude !== latitude && this.state.longitude !== longitude) {
        commit('setCoordinates', {
          latitude,
          longitude
        })
        Vue.axios({
          method: 'get',
          url: `${config.yelp.baseUrl}?latitude=${latitude}&longitude=${longitude}&term=food&radius=1000`,
          headers: {
            'Authorization': config.yelp.authorization
          }
        })
        .then(res => {
          if (res.data) {
            res.data.businesses.sort((a, b) => a.distance < b.distance)
            commit('setLoadedResturants', res.data.businesses)
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    setRestaurant ({ commit }, payload) {
      commit('setRestaurant', payload)
    },
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

          // we want the newest reviews first
          reviews.sort((a, b) => a.created < b.created)

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
            username: user.email.split('@')[0],
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
      if (!state.loadedResturants) {
        return null
      }
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
    restaurant (state) {
      return state.restaurant
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
