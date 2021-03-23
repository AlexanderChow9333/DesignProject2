<template>
  <div>
    <b-row>
      <b-col cols=2>
        <Navbar />
      </b-col>
      <b-col style="height: 100vh;">
        <Nuxt style="padding: 20px;"/>
      </b-col>
    </b-row>
    
  </div>
</template>
<script>
  export default {
    beforeMount () {
      if (localStorage.getItem('loggedIn')!="true") {
        window.location.replace('/login');
      }
      console.log(localStorage.getItem('loggedIn'));
    },
  }
</script>
<style>
</style>