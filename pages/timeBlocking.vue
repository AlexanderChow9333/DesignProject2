<template>
  <!-- <div class="todoDiv">
      <b-input v-model="newTodo" class="input" placeholder="Name"> </b-input>
      <b-input v-model="time" class="input" placeholder="Time"> </b-input>
      <b-button variant="primary" class="button" @click="addTodo(newTodo, time)">Add ToDo</b-button>
    <ul class="ul">
      <li class="li" v-for="(todo, index) in todos" :key="index">
        <span>{{ todo.name }}</span>
        <span>{{ todo.time }}</span>
        <b-button class="removeBtn" @click="removeTodo(index)" variant="primary">Remove</b-button>
      </li>
    </ul>
    <h4 v-if="todos.length == 0">Empty list.</h4>
  </div> -->
  <b-row class="row">
    <b-col class="col"> 
      <div>
        <h1>Time Blocking</h1>
      </div>
      <hr>
      <b-input v-model="newTodo.name" class="input" placeholder="Name"> </b-input>
      <b-form-timepicker v-model="newTodo.time" class="input"></b-form-timepicker>
      <b-button variant="primary" class="button" @click="addTodo(newTodo, time)">Add ToDo</b-button>
      <!-- <b-button @click="readData()">Read Data</b-button> -->
    </b-col>
    <b-col class="bordered col">
      <h1>Schedule</h1>
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
        <template #cell(status)="row">
          <!-- <div @click="completeTask(row.index)">
            <b-form-checkbox :checked="items[row.index].status"></b-form-checkbox>
          </div> -->
          <b-button @click="completeTask(row.item.name, false)" v-if="items[row.index].status" variant="success">Completed</b-button>
          <b-button @click="completeTask(row.item.name, true)" v-else variant="secondary">Incomplete</b-button>
          <b-button @click="removeData(row.index)" variant="danger">Remove</b-button>
        </template>
        <template #cell(name)="row">
          <h6 :class="row.item.status==true? 'gray' : 'black'">{{row.item.name}}</h6>
        </template>
        <template #cell(time)="row">
          <h6 :class="row.item.status==true? 'gray' : 'black'">{{row.item.time}}</h6>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script lang="ts">
interface todo {
  name: string,
  time: string,
  status: boolean
}
export default {
  data() {
    return {
      newTodo: {
        name: "",
        time: "",
      },
      fields: [
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'time',
            sortable: true
          },
          {
            key: 'status',
          }
        ],
      items: []
    };
  },
  methods: {
    // addTodo(name, time) {
    //   this.todos.push({name: name, time: time});
    //   this.newTodo = "";
    //   this.time = "";
    //   console.log("hello");
    // },
    // removeTodo (index) {
		// 		this.todos.splice(index, 1);
		// },
    readData() {
      var projects = this.$fire.database.ref('users/'+localStorage.getItem('uid')+"/timeblocking");
      projects.on('value', this.gotData, this.errData)
    },
    addTodo() {
      for (let i = 0; i < this.items.length; i++) {
        const todo = this.items[i];
        if (todo.time == this.newTodo.time) {
          alert("Warning: the time that you specified for your new event overlaps with another event");
        }
      }
      console.log(this.items[0], "hi");
      this.$fire.database.ref('users/'+localStorage.getItem('uid')+"/timeblocking/"+this.newTodo.name).set({
        name: this.newTodo.name,
        time: this.newTodo.time,
        status: false
      });
      this.newTodo.name = "";
      this.newTodo.time = "";
    },
    gotData(data: todo) {
      console.log("data");
      if (data.val()) {
        var val = Object.entries(data.val());
      }
      else {
        var val  = [];
      }
      this.setData(val);
      console.log(Object.entries(data.val()));
    },
    setData(data: any) {
      this.items=[];
      console.log(data, "SET DATA");
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.items.push(data[i][1]);
      }
      console.log(this.items)
    },
    removeData(index: number) {
      this.$fire.database.ref('users/'+localStorage.getItem('uid')+'/timeblocking/'+this.items[index].name).remove();
    },
    errData(err: any) {
      console.log('error', err);
    },
    completeTask(name: string, completedBool: boolean) {
      this.$fire.database.ref('users/'+localStorage.getItem('uid')+"/timeblocking/"+name).update({
        status: completedBool
      });
      console.log(this.items, "items")
    }

  },
  mounted() {
    this.readData();
  }
}

</script>

<style scoped>
  .gray {
    color: gray;
    text-decoration: line-through;
  }
  .removeBtn{
    margin-left: 70px;
  }
  .ul {
    margin-top:30px;
    list-style-type: none;
  }
  .li{
    border-style:solid;
    border-color:gray;
    border-width:1px;
    padding:10px;
    padding-left: 10px;
  }
  .todoDiv{
    margin-left:20px;
    margin-top:50px;
  }
  .input{
    margin-bottom:20px;
  }
  /* .button{
    margin:20px;
  } */
  .bordered{
    border-style:solid;
    border-color:gray;
    border-width: 0px;
    border-left-width: 2px;
  }
  .col {
    padding: 40px;
  }
  .row{
    height:100vh;
  }
</style>