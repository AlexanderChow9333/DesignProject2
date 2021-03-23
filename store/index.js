export const state = () => ({
    loggedIn: false
  })
  
  export const mutations = {
    loggedInTrue() {
      state.loggedIn = true;
      console.log("logged in")
    },
    loggedInFalse() {
      state.loggedIn = false;
    }

  }
  