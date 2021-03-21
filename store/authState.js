export const state = () => ({
    loggedIn: false
  })
  
  export const mutations = {
    loggedInTrue() {
      state.loggedIn = true;
    },
    loggedInFalse() {
      state.loggedIn = false;
    }

  }
  