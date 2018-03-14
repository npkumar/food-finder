<template>
  
</template>

<script>
export default {
  created () {
    this.$store.dispatch('signOutUser')
    this.$router.push('/')
  }
}
</script>
