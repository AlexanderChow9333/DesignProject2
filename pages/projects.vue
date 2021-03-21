<template>
  <div style="projects">
    <h1>Projects</h1>
    <hr>
    <b-table
      class="table"
      :striped=true
      :bordered=true
      :outlined=true
      :hover=true
      :no-border-collapse=true
      :items="items"
      :fields="fields"
    >
    <template #cell(remove)="row">
      <!-- <div @click="completeTask(row.index)">
        <b-form-checkbox :checked="items[row.index].status"></b-form-checkbox>
      </div> -->
      <b-button @click="removeData(row.index)" variant="danger">Remove</b-button>
    </template>
    </b-table>
    <div class="newButton btn bordered" v-b-modal.modal>
      New...
    </div>
    <b-modal id="modal" title="Add Project">
      <b-input v-model="newProject.name" class="input" placeholder="Name"></b-input>
      <b-input v-model="newProject.date" class="input" placeholder="Due Date"></b-input>
      <b-input v-model="newProject.type" class="input" placeholder="Type"></b-input>
      <b-input v-model="newProject.status" class="input" placeholder="Status"></b-input>
      <b-input v-model="newProject.importance" class="input" placeholder="Importance"></b-input>
      <b-input v-model="newProject.time" class="input" placeholder="Time (hrs)"></b-input>
      <b-button variant="success" @click="addProject()">Add</b-button>
  </b-modal>
  <b-button @click="readData()">read data</b-button>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        fields: [
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'date',
            sortable: true
          },
          {
            key: 'type',
            sortable: true,
          },
          {
            key: 'status',
            sortable: true,
          },
          {
            key: 'importance',
            sortable: true,
          },
          {
            key: 'time',
            sortable: true,
          },
          {
            key: 'remove',
          }
        ],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
        newProject: {
          name: null,
          date: null,
          type: null,
          status: null,
          importance: null,
          time: null,
        }
      }
    },
    methods: {
      readData() {
        var projects = this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid+"/projects");
        projects.on('value', this.gotData, this.errData);
        console.log("true")
        console.log(this.$store.state.authState.loggedIn, "auth state")
      },
      addProject() {
        this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid+"/projects/"+this.newProject.name).set({
          name: this.newProject.name,
          date: this.newProject.date,
          type: this.newProject.type,
          status: this.newProject.status,
          importance: this.newProject.importance,
          time: this.newProject.time,
        });
        this.newProject.name = "";
        this.newProject.date = "";
        this.newProject.type = "";
        this.newProject.status = "";
        this.newProject.importance = "";
        this.newProject.time = "";
      },
      gotData(data) {
        console.log("data");
        var val = Object.entries(data.val());
        this.setData(val);
        console.log(Object.entries(data.val()));
        console.log('users/'+this.$fire.auth.currentUser.uid+"/projects");
      },
      setData(data) {
        this.items=[];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          this.items.push(data[i][1]);
        }
        console.log(this.items)
      },
      removeData(index: number) {
        this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid+'/projects/'+this.items[index].name).remove();
        // console.log(this.items[index]);
        // // console.log(this.items, index);
        // var data = this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid+"/timeblocking").get();
        // console.log("Remove DATA", data);
      },
      errData(err) {
        console.log('error', err);
      }
    }
  }
</script>

<style scoped>
  .input {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .newButton {
    padding: 10px;
    text-align:left;
    border-radius: 0;
  }
  .newButton:hover{
    background-color:rgb(238, 238, 238);
  }
  .projects{
    width:100%;
    align-items: center;
    text-align: center;
  }

  .table{
    width: 80%;
    margin: 0;
  }

  .bordered {
    width:80%;
    border-style:solid;
    border-color:rgb(230, 222, 222);
    border-top:0;
    border-width:2px;
  }
</style>