<template>
  <div class="sideDiv shadow-sm">
    <!-- <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" shadow>
      <template>
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active href="projects" >Projects</b-nav-item>
              <b-nav-item href="timeBlocking" >Time Blocking</b-nav-item>
              <b-nav-item href="workTogether" >Work Together</b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar> -->
    <b-nav vertical class="sidebar">
      <b-nav-item class="nav-item" active href="projects" >Projects</b-nav-item>
      <b-nav-item class="nav-item" href="timeBlocking" >Time Blocking</b-nav-item>
      <b-nav-item class="nav-item" href="workTogether" >Work Together</b-nav-item>
      <b-nav-item class="nav-item" @click="logout()">Logout</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$fire.auth.signOut()
          .then(() => {
            console.log(this.$fire.auth.currentUser)
            window.location.replace('/login');
          })
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';
  $enable-shadows: true;
  .nav-item {
    margin-top: 20px;
    margin-left: 10px;
  }
  .sidebar {
    padding-top: 40px;
    height: 100%;
  }
  .sideDiv {
    background-color: lightgray;
    /* position: absolute;
    top:0; */
    height: 100vh;
    /* width:200px;
    display: inline-block;
    margin-right: 20px;
    border-style: solid;
    border-right-color: lightgray;
    border-width: 0px;
    border-right-width: 2px; */
  }
</style>