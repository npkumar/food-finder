<template>
  <v-container>
    <v-layout row wrap v-for="restaurant in resturants" :key="restaurant.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>

        <v-card :to="'/restaurant/' + restaurant.id">
          <v-container fluid>
            <v-layout row>

              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="restaurant.image_url"
                  height="130px"
                >
                </v-card-media>
              </v-flex>

              <v-flex xs7 sm8 md9>
                <v-card-title>
                  <div>
                    <h2 class="orange--text">{{ restaurant.name }}</h2>
                    <div>{{ restaurant.categories.map(c => c.title).splice(0, 2).join(', ')}}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    resturants () {
      return this.$store.getters.loadedResturants
    }
  },
  beforeCreate () {
    // safety net
    if (!this.$store.getters.loadedResturants) {
      this.$router.push('/')
    }
  },
  methods: {
    setRestaurant (resturant) {
      this.$store.dispatch('setRestaurant', resturant)
    }
  }
}
</script>
