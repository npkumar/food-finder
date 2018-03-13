<template>
  <v-app dark>
    <v-navigation-drawer v-model="sideNav" fixed>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.content">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.content }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="primary">
      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click="sideNav = !sideNav">
      </v-toolbar-side-icon>
      <v-toolbar-title>FoodFinder</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.content">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.content }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Dynamic content goes here -->
    <main>
      Content
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        {
          icon: 'search',
          content: 'Nearby'
        },
        {
          icon: 'person',
          content: 'Profile'
        },
        {
          icon: 'face',
          content: 'Sign Up'
        },
        {
          icon: 'lock_open',
          content: 'Sign In'
        }
      ]
    }
  }
}
</script>
