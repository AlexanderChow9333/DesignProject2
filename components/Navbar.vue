<template>
  <div class="sideDiv">
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
    <div class="username">
      <h5 style="color: black;">{{username}}, {{year}}</h5>
    </div>
    <b-nav vertical class="sidebar">
      <b-nav-item class="nav-item" active href="projects" ><h5>Projects</h5></b-nav-item>
      <b-nav-item class="nav-item" href="timeBlocking" ><h5>Time Blocking</h5></b-nav-item>
      <b-nav-item class="nav-item" href="workTogether" ><h5>Work Together</h5></b-nav-item>
      <b-nav-item class="nav-item" href="profile" ><h5>Edit Profile</h5></b-nav-item>
      <b-nav-item class="nav-item logout" @click="logout()"><h5>Logout</h5></b-nav-item>
    </b-nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: "",
        year: ""
      }
    },
    methods: {
      readData() {
        var ref = this.$fire.database.ref('users/'+localStorage.getItem('uid'));
        ref.on('value', this.gotData, this.errData);
      },
      gotData(data) {
        var val = Object.entries(data.val());
        this.setData(val);
      },
      setData(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i][0] == "name") {
            this.username = data[i][1];
          }
          else if (data[i][0] == "year") {
            this.year = data[i][1];
          }
        }
      },
      logout() {
        this.$fire.auth.signOut()
          .then(() => {
            localStorage.setItem('loggedIn', "false")
            window.location.replace('/login');
          });
      }
    },
    mounted () {
      this.readData();
    },
  }
</script>

<style lang="scss" scoped>
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';
  $enable-shadows: true;
  .username {
    padding-left: 20px;
    padding-top: 30px;
  }
  .nav-item {
    margin-top: 20px;
    padding-right: 10px;
    padding-left:10px;
  }
  h5 {
    padding-top:5px;
    color: rgba(108,106,101,255);
    font-size:16px;
  }
  .nav-item:hover {
    background-color:rgba(232,231,228,255);
  }
  .logout {
    margin-top:500px;
  }
  .sidebar {
    padding:0;
    padding-top: 25px;
    height: 100%;
  }
  .sideDiv {
    background-color: rgba(247,246,243,255);
    width:240px;
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