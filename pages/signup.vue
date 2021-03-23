<template>
    <div class="div">
        <div>
            <b-card class="card" align="center" header="Signup" header-tag="h2">
                <b-input v-model="email" class="input" placeholder="Email"></b-input>
                <b-input v-model="password" class="input" placeholder="Password" type="password"></b-input>
                <b-input v-model="name" class="input" placeholder="Full Name (First, Last)"></b-input>
                <b-input v-model="year" class="input" placeholder="Graduating Year"></b-input>
                <b-button @click="signup()" variant="primary"><font-awesome-icon :icon="['fas', 'sign-in-alt']"/> Signup </b-button>
                <br>
                <br>
                <br>
                <b-button @click="googleLogin()" class="google" variant="light"><font-awesome-icon style="margin-top:2px;" :icon="['fab', 'google']"/>   Sign up with Google</b-button>
                <br><br><br>
                <h6>Already have an account? Login <a href="/login">here.</a></h6>
                <br>
                <b-alert :show="error!=null" variant="danger">{{error}}</b-alert>
            </b-card>
        </div>
    </div>
</template>

<script lang="ts">
    import firebase from 'firebase';
    export default {
        layout: "auth",
        data() {
            return {
                email: "",
                password: "",
                name: "",
                year: "",
                error: null,
            }
        },
        methods: {
            signup() {
                var signupSuccess = false;
                if (this.email != "" && this.password!="" && this.name!="" &&this.year!="") {
                    this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then(userCredential => {
                        console.log(this.$fire.auth.currentUser)
                        console.log(userCredential)
                        signupSuccess = true;
                        })
                    .then(() => {
                        if (signupSuccess) {
                            this.writeUserData();
                            localStorage.setItem('loggedIn', "true");
                            localStorage.setItem('uid', this.$fire.auth.currentUser.uid);
                            window.location.replace('/projects');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.error = error;
                        console.log("error")
                    });
                } else {
                    this.error = "Error: Missing information";
                }
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
            },
            writeUserData() {
                console.log(this.$fire.auth.currentUser.uid);
                this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid).set({
                    email: this.email,
                    name: this.name,
                    year: this.year
                });
                console.log("write user data")
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