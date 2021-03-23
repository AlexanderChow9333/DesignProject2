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
        <b-button @click="removeData(row.item.name)" variant="danger">Remove</b-button>
        <b-button @click="editProjectIndex(row.index)" variant="primary" v-b-modal.editModal>Edit</b-button>
      </template>
      <template #cell(importance)="row">
        <!-- <div @click="completeTask(row.index)">
          <b-form-checkbox :checked="items[row.index].status"></b-form-checkbox>
        </div> -->
          <b-badge :variant=" row.item.importance=='High'? 'danger' : row.item.importance=='Medium' ? 'warning' : 'success' "><h6 style="margin-top: 5px;">{{row.item.importance}}</h6></b-badge>
      </template>
      <template #cell(status)="row">
          <b-badge :variant=" row.item.status=='Not Started'? 'danger' : row.item.status=='In Progress' ? 'warning' : 'success' "><h6 style="margin-top: 5px;">{{row.item.status}}</h6></b-badge>
      </template>
    </b-table>
    <div class="newButton btn bordered" v-b-modal.newModal>
      New...
    </div>
    <b-modal id="newModal" title="Add Project">
      <b-input v-model="newProject.name" class="input" placeholder="Name"></b-input>
      <b-form-datepicker v-model="newProject.date" class="input"></b-form-datepicker>
      <b-input v-model="newProject.type" class="input" placeholder="Type"></b-input>
      <b-form-select v-model="newProject.status" :options="statusOptions" class="input" ></b-form-select>
      <br>
      <b-form-select v-model="newProject.importance" :options="importanceOptions" class="input" ></b-form-select>
      <b-input v-model="newProject.time" class="input" type="number" placeholder="Time (hrs)"></b-input>
      <b-button variant="success" @click="addProject()">Add</b-button>
  </b-modal>

  <b-modal id="editModal" title="Edit Project">
    <b-input v-model="updatedProject.name" class="input" placeholder="Name" disabled></b-input>
    <b-form-datepicker v-model="updatedProject.date" class="input"></b-form-datepicker>
    <b-input v-model="updatedProject.type" class="input" placeholder="Type"></b-input>
    <b-form-select v-model="updatedProject.status" :options="statusOptions" class="input" ></b-form-select>
    <br>
    <b-form-select v-model="updatedProject.importance" :options="importanceOptions" class="input" ></b-form-select>
    <b-input v-model="updatedProject.time" class="input" type="number" placeholder="Time (hrs)"></b-input>
    <b-button variant="success" @click="editProject()">Save</b-button>
  </b-modal>
  <!-- <b-button @click="readData()">read data</b-button> -->
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        statusOptions: [
          {value: null, text: 'Status'},
          {value: "Not Started", text: 'Not Started'},
          {value: "In Progress", text: 'In Progress'},
          {value: "Completed", text: 'Completed'},
        ],
        importanceOptions: [
          {value: null, text: 'Importance'},
          {value: "Low", text: 'Low'},
          {value: "Medium", text: 'Medium'},
          {value: "High", text: 'High'},
        ],
        fields: [
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'date',
            sortable: true,
            label: 'Due Date'
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
            label: 'Time (hrs)'
          },
          {
            key: 'remove',
            label: 'Remove/Edit'
          }
        ],
        items: [],
        newProject: {
          name: null,
          date: null,
          type: null,
          status: null,
          importance: null,
          time: null,
        },
        updatedProject: {
          name: null,
          date: null,
          type: null,
          status: null,
          importance: null,
          time: null,
          index: null
        }
      }
    },
    methods: {
      setStatus(val:string) {
        this.newProject.status = val;
      },
      setImportance(val:string) {
        this.newProject.importance = val;
      },
      readData() {
        var projects = this.$fire.database.ref('users/'+localStorage.getItem('uid')+"/projects");
        projects.on('value', this.gotData, this.errData);
        console.log("true")
        console.log(localStorage.getItem('loggedIn'), "auth state")
      },
      addProject() {
        this.$fire.database.ref('users/'+localStorage.getItem('uid')+"/projects/"+this.newProject.name).set({
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
      editProjectIndex(index:number) {
        this.updatedProject.name = this.items[index].name;
        this.updatedProject.date = this.items[index].date;
        this.updatedProject.type = this.items[index].type;
        this.updatedProject.status = this.items[index].status;
        this.updatedProject.importance = this.items[index].importance;
        this.updatedProject.time = this.items[index].time;
        console.log(this.updatedProject, "update")
      },
      editProject() {
        this.$fire.database.ref('users/'+localStorage.getItem('uid')+"/projects/"+this.updatedProject.name).update({
          name: this.updatedProject.name,
          date: this.updatedProject.date,
          type: this.updatedProject.type,
          status: this.updatedProject.status,
          importance: this.updatedProject.importance,
          time: this.updatedProject.time,
        });
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
        console.log(Object.entries(data.val()))
      },
      setData(data) {
        this.items=[];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          this.items.push(data[i][1]);
        }
        console.log(this.items)
      },
      removeData(name: string) {
        this.$fire.database.ref('users/'+localStorage.getItem('uid')+'/projects/'+name).remove();
        console.log(this.items);
      },
      errData(err) {
        console.log('error', err);
      }
    },
    mounted() {
      this.readData();
    }
  }
</script>

<style scoped>
  .input {
    margin-bottom: 20px;
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