<template>
    <div>
        <h1>Edit Profile</h1>
        <hr>
        <div style="width: 400px;">
            <b-form-input v-model="email" class="input" placeholder="Email"></b-form-input>
            <b-button @click="editEmail" class="btnInput" variant="success">Save Email</b-button>
            <b-form-input v-model="password" class="input" placeholder="New Password" type="password"></b-form-input>
            <b-button @click="editPassword" class="btnInput" variant="success">Save Password</b-button>
            <b-form-input v-model="name" class="input" placeholder="Full Name"></b-form-input>
            <b-button @click="editName" class="btnInput" variant="success">Save Name</b-button>
            <b-form-input v-model="year" class="input" placeholder="Graduating Year"></b-form-input>
            <b-button @click="editYear" class="btnInput" variant="success">Save Year</b-button>
            <b-alert :show="error!=null" variant="danger">{{error}}</b-alert>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                name: "",
                year: "",
                error: null
            }
        },
        methods: {
            readData() {
                var ref = this.$fire.database.ref('users/'+localStorage.getItem('uid'));
                ref.on('value', this.gotData, this.errData);
            },
            gotData(data) {
                console.log("data");
                if(data.val()) {
                    var val = Object.entries(data.val());
                }
                else {
                    var val = [];
                }
                this.setData(val);
                console.log("hiiii", Object.entries(data.val()))
            },
            setData(data) {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    console.log(element);
                    if (element[0] == "name") {
                        this.name = element[1];
                    } else if (element[0] == "year") {
                        this.year = element[1];
                    } else if (element[0] == "email") {
                        this.email = element[1];
                    }
                }
                console.log("hello", this.items)
            },
            editEmail() {
                this.$fire.auth.currentUser.updateEmail(this.email)
                    .then(() => {
                        this.error=null;
                        this.$fire.database.ref('users/'+localStorage.getItem('uid')).update({
                            email: this.email
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.error = error;
                    });
            },
            editName() {
                this.$fire.database.ref('users/'+localStorage.getItem('uid')).update({
                name: this.name,
                });
            },
            editPassword() {
                this.$fire.auth.currentUser.updatePassword(this.password)
                    .then(
                        this.error=null
                    )
                    .catch((error) => {
                        console.log(error);
                        this.error = error;
                    });
            },
            editYear() {
                this.$fire.database.ref('users/'+localStorage.getItem('uid')).update({
                    year: this.year,
                });
            }
        },
        mounted() {
            console.log('hello');
            this.readData();
        }
    }
</script>

<style scoped>
    .input{
        margin-bottom: 5px;
    }
    .btnInput{
        margin-bottom:20px;
    }
</style>