<template>
    <div class="div">
        <div>
            <b-card class="card" align="center" header="Signup" header-tag="h2">
                <b-input v-model="email" class="input" placeholder="Email"></b-input>
                <b-input v-model="password" class="input" placeholder="Password" type="password"></b-input>
                <b-button @click="signup()" variant="primary"><font-awesome-icon :icon="['fas', 'sign-in-alt']"/> Signup </b-button>
                <br>
                <br>
                <b-button class="google" variant="light"><font-awesome-icon style="margin-top:2px;" :icon="['fab', 'google']"/>   Sign up with Google</b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
    export default {
        layout: "auth",
        data() {
            return {
                email: "",
                password: "",
            }
        },
        methods: {
            signup() {
                var signupSuccess = false;
                this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then(userCredential => {
                        console.log(this.$fire.auth.currentUser)
                        console.log(userCredential)
                        signupSuccess = true;
                        })
                    .then(() => {
                        if (signupSuccess) {
                            // window.location.replace('/projects');
                            this.writeUserData();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        console.log("error")
                    });
            },
            writeUserData() {
                this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid).set({
                    email: this.email,
                    password: this.password
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
        padding-bottom: 100px;
        /* height: 500px; */
    }
    .input {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>