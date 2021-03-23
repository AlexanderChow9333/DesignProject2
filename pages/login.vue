<template>
    <div class="div">
        <div>
            <b-card class="card" align="center" header="Login" header-tag="h2">
                <b-input v-model="email" class="input" placeholder="Email"></b-input>
                <b-input v-model="password" class="input" placeholder="Password" type="password"></b-input>
                <b-button @click="login()" variant="primary"><font-awesome-icon :icon="['fas', 'sign-in-alt']"/> Login </b-button>
                <br>
                <br>
                <br>
                <b-button @click="googleLogin()" class="google" variant="light"><font-awesome-icon style="margin-top:2px;" :icon="['fab', 'google']"/>   Sign in with Google</b-button>
                <br><br><br>
                <h6>Don't have an account yet? Sign up <a href="/signup">here.</a></h6>
                <br>
                <b-alert :show="error!=null" variant="danger">{{error}}</b-alert>
            </b-card>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    export default {
        layout: "auth",
        data() {
            return {
                email: "",
                password: "",
                error: null,
            }
        },
        methods: {
            login() {
                var loggedIn = false;
                this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        console.log(this.$fire.auth.currentUser);
                        loggedIn = true;
                        console.log("logged in", loggedIn)
                    })
                    .then(() => {
                        if (loggedIn) {
                            localStorage.setItem('loggedIn', "true");
                            localStorage.setItem('uid', this.$fire.auth.currentUser.uid)
                            window.location.replace('/projects');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.error = error;
                        console.log("error")
                    });
            },
            googleLogin() {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        /** @type {firebase.auth.OAuthCredential} */
                        var credential = result.credential;

                        // This gives you a Google Access Token. You can use it to access the Google API.
                        var token = credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;
                        // ...
                        console.log('CURRENT USER');
                        console.log(this.$fire.auth.currentUser);
                        localStorage.setItem('loggedIn', "true");
                        localStorage.setItem('uid', this.$fire.auth.currentUser.uid)
                        window.location.replace('/projects');
                    }).catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                });
            }
        },
    }
</script>

<style>
    body{
        background-color: rgb(78, 78, 245);
    }
    .google {
        border-style:solid;
        border-color: gray;
        border-width: 1px;
    }
    .div {
        position: fixed;
        top: 50%;
        left: 50%
    }
    .card{
        width:500px;
        padding-bottom: 75px;
        /* height: 500px; */
    }
    .input {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>