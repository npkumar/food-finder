<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <v-container fluid>
            <v-layout row>

              <v-flex xs5 sm4 md3>
                <v-card-media
                  src="https://s3-media1.fl.yelpcdn.com/bphoto/mPEPmD0GNnvm67S7lh14pg/o.jpg"
                  height="130px"
                >
                </v-card-media>
              </v-flex>

              <v-flex xs7 sm8 md9>
                <v-card-title>
                  <div>
                    <h2 class="info--text">Tim Ho Wan</h2>
                    <div>Dimsum</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn accent to="/restaurant/1">
                    <v-icon left>arrow_forward</v-icon>More
                  </v-btn>
                </v-card-actions>
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
}
</script>
