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
            <v-flex xs2>
              <v-chip outline color="orange" text-color="white">
                {{ restaurant.rating }}
                <v-icon right>star</v-icon>
              </v-chip>
            </v-flex>
            <v-flex xs2>
              <v-chip outline color="orange" text-color="white">
                {{ restaurant.distance | distanceFormat }} km
                <v-icon right>flight</v-icon>
              </v-chip>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs2>
              <v-chip v-if="!restaurant.is_closed" color="green" text-color="white">Open</v-chip>
              <v-chip v-else color="error" text-color="white">Closed</v-chip>
            </v-flex>
          </v-layout>

          <v-card-media
            class="mt-1"
            :src="restaurant.image_url"
            height="300px"
          >
          </v-card-media>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs2 v-for="restaurant in restaurant.categories" :key="restaurant.alias">
                <v-chip outline color="orange" text-color="white">
                  {{ restaurant.title }}
                </v-chip>
              </v-flex>
            </v-layout>

            <div>
              <a
                class="info"
                :href="'https://www.google.com/maps/?q=' + restaurant.coordinates.latitude + ',' + restaurant.coordinates.longitude"
              >Google Maps
              </a>
            </div>

            <v-btn
              color="pink"
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
        review: this.review,
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
