<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="mb-0 pb-0">
            <h2 class="orange--text">{{ restaurant.name }}</h2>
          </v-card-title>

          <v-layout row wrap class="ml-3">
            <v-flex xs12>
              <h5 class="white--text">
                {{ restaurant.location.address1}}, {{ restaurant.location.address2}},
                {{ restaurant.location.state}} - {{ restaurant.location.zip_code }}
              </h5>
            </v-flex>
          </v-layout>

          <v-layout row ml-2 mr-1>
              <v-chip outline color="orange" text-color="white">
                {{ restaurant.rating }}
                <v-icon right>star</v-icon>
              </v-chip>
              <v-chip outline color="orange" text-color="white">
                {{ restaurant.distance | distanceFormat }} km
                <v-icon right>directions</v-icon>
              </v-chip>
            <v-spacer></v-spacer>
              <v-chip v-if="!restaurant.is_closed" color="green" text-color="white">Open</v-chip>
              <v-chip v-else color="error" text-color="white">Closed</v-chip>
          </v-layout>

          <v-card-media
            class="mt-1"
            :src="restaurant.image_url"
            height="300px"
          >
          </v-card-media>
          <v-card-text>
            <v-layout row wrap mb-4>
              <span v-for="category in restaurant.categories" :key="category.alias">
                <v-chip outline color="orange" text-color="white">
                  {{ category.title }}
                </v-chip>
              </span>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12>
                <v-btn
                  color="accent"
                  class="ml-0 pl-0"
                  @click="window.location.href=`https://www.google.com/maps?q=${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`"
                >
                <v-icon left>directions</v-icon>Get Directions
                </v-btn>
              </v-flex>
            </v-layout>

            <v-btn
              color="accent"
              dark
              small
              absolute
              bottom
              right
              fab
              @click="dialog = !dialog"
              :disabled="!userIsAuthenticated"
            >
            <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Leave a Review!</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <form @submit.prevent="onCreateReview">
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                      autofocus
                      name="review"
                      label="Let others know about your thoughts! "
                      id="review"
                      multi-line
                      v-model="review"
                      class="info--text"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-btn
                      @click.prevent="dialog =!dialog"
                      class="accent">
                      Cancel
                    </v-btn>
                    <v-btn
                      type="submit"
                      :disabled="!formIsValid"
                      class="info">
                      Submit
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-flex>
          </v-layout>
        </v-card-text>

      </v-card>
    </v-dialog>
  </v-layout>

    <v-layout
      row wrap
      v-for="item in restaurant.reviews"
      :key="new Date(item.created).getTime()"
      class="mt-2"
      >
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <blockquote><i class="orange pl-1 pr-1 black--text">{{ item.review }}</i> -- {{ item.username }}</blockquote>
            <p class="caption mb-0 pb-0">{{ item.created | dateFormat }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  props: ['id'],
  data () {
    return {
      window,
      review: '',
      dialog: false
    }
  },
  beforeCreate () {
    // safety net
    if (!this.$store.getters.loadedResturants) {
      this.$router.push('/')
    }
  },
  created () {
    this.$store.dispatch('loadReviews', {
      restaurantId: this.restaurant.id
    })
  },
  computed: {
    formIsValid () {
      // type in at least 3 chars
      return this.review.length > 3
    },
    restaurant () {
      return this.$store.getters.loadedResturant(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    onCreateReview () {
      // for safety
      if (!this.formIsValid) {
        return
      }

      const review = {
        review: this.review.trim(),
        restaurantId: this.restaurant.id,
        username: this.user.username,
        created: moment().format()
      }
      this.$store.dispatch('createReview', review)

      // reset this review
      this.review = ''

      // close the dialog
      this.dialog = false
    }
  }
}
</script>

<style>
  .direction-btn {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    background-color: #FF5252;
    padding: 10px 20px;
    border-radius: 5%;
    cursor: pointer;
  }
</style>
