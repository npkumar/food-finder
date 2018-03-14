<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3 class="info--text">Resturant Name</h3>
            <v-badge color="accent" class="ml-1">
              <span slot="badge">6</span>
            </v-badge>
          </v-card-title>
          <v-card-media
            src="https://s3-media1.fl.yelpcdn.com/bphoto/mPEPmD0GNnvm67S7lh14pg/o.jpg"
            height="150px"
          >
          </v-card-media>
          <v-card-text>
            <div>Rating here</div>
            <div>Category here</div>
            <div>Distance here</div>
            <div>Google Map here</div>
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
}
</script>
