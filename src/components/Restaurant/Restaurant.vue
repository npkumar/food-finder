<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3 class="info--text">{{ restaurant.name }}</h3>
            <v-badge color="accent" class="ml-1">
              <span slot="badge">{{ restaurant.rating }}</span>
            </v-badge>
          </v-card-title>
          <v-card-media
            :src="restaurant.image_url"
            height="300px"
          >
          </v-card-media>
          <v-card-actions v-show="userIsAuthenticated">
            <v-btn class="accent ml-2" small>
              <v-icon left small>star</v-icon>
              Favourite
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <div>{{ restaurant.categories.map(c => c.title).join(', ') }}</div>
            <div>{{ restaurant.distance | distanceFormat }} km from here!</div>
            <div>
              <a
                class="info"
                :href="'https://www.google.com/maps/?q=' + restaurant.coordinates.latitude + ',' + restaurant.coordinates.longitude"
              >Google Maps
              </a>
            </div>

            <div v-show="userIsAuthenticated">
              <v-layout row wrap>
                <v-flex xs12>
                  <form @submit.prevent="onCreateReview">
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                          name="review"
                          label="Leave a review"
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
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
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
            {{ item.review }} -- {{ item.username }}
            <p>{{ item.created | dateFormat }}</p>
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
      review: ''
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

      // navigate to same page, optional
      // this.$router.push(`/restaurant/${this.restaurant.id}`)
    }
  }
}
</script>
