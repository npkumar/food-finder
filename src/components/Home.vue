<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>

        <v-jumbotron>
          <v-container fill-height>
            <v-layout align-center>
              <v-flex>
                <h3 class="display-3">Food Finder</h3>
                <span class="subheading">We provide you highly opinionated curated list of amazingly good food that is available around your neighbourhood.<br /><br />Happy munching!</span>
                <v-divider class="my-3"></v-divider>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>

      </v-flex>
    </v-layout>

    <v-layout class="row wrap">
      <v-flex xs12 class="pt-0">
        <v-btn large class="accent" router to="/restaurants">Recommend</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  mounted () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.$store.dispatch('setCoordinates', position)
      })
    }
  }
}
</script>
