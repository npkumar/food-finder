<template>
  <v-app dark>

    <!-- navigation-drawer -->
    <v-navigation-drawer v-model="sideNav" fixed temporary class="accent">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.content"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.content }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-toolbar class="primary">
      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click="sideNav = !sideNav">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">FoodFinder</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.content"
          :to="item.link"
          >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.content }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Dynamic content goes here -->
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {
          icon: 'face',
          content: 'Sign Up',
          link: '/signup'
        },
        {
          icon: 'lock_open',
          content: 'Sign In',
          link: '/signin'
        }
      ]

      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: 'search',
            content: 'Nearby',
            link: '/restaurants'
          },
          {
            icon: 'person',
            content: 'Profile',
            link: '/profile'
          },
          {
            icon: 'settings_power',
            content: 'Logout',
            link: '/logout'
          }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null
    }
  }
}
</script>
