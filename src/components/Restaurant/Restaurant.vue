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
            height="150px"
          >
          </v-card-media>
          <v-card-text>
            <div>{{ restaurant.categories.map(c => c.title).join(', ') }}</div>
            <div>{{ restaurant.distance }} from here!</div>
            <div>
              <a
                class="info"
                :href="'https://www.google.com/maps/?q=' + restaurant.coordinates.latitude + ',' + restaurant.coordinates.longitude"
              >Google Maps
              </a>
            </div>
            <div>Comments here</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="accent" small>
              <v-icon left small>star</v-icon>
              Favourite
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    restaurant () {
      return this.$store.getters.loadedResturant(this.id)
    }
  }
}
</script>
