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
      <b-input v-model="newTodo" class="input" placeholder="Name"> </b-input>
      <b-input v-model="time" class="input" placeholder="Time"> </b-input>
      <b-button variant="primary" class="button" @click="addTodo(newTodo, time)">Add ToDo</b-button>
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
      ></b-table>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      newTodo: null,
      time: null,
      todos: [],
      fields: [
          {
            key: 'last_name',
            sortable: true
          },
          {
            key: 'first_name',
            sortable: true
          },
          {
            key: 'age',
            label: 'Person age',
            sortable: true,
          }
        ],
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    };
  },
  methods: {
    addTodo(name, time) {
      this.todos.push({name: name, time: time});
      this.newTodo = "";
      this.time = "";
      console.log("hello");
    },
    removeTodo (index) {
				this.todos.splice(index, 1);
			}
  },
}

</script>

<style scoped>
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