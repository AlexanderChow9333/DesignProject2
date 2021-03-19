<template>
  <b-row class="row">
    <b-col class="col">
      <h1>Work Together</h1>
      <hr>
      <b-input class="input" placeholder="Currently working on"></b-input>
      <b-button variant="success">Save</b-button>
    </b-col>
    <b-col class="bordered col">
      <h1>Other Students</h1>
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
      }
    }
  }
</script>

<style scoped>
  .col {
    padding: 40px;
  }
  .row{
    height:100vh;
  }
  .input{
    margin-top: 20px;
    margin-bottom: 20px;
    width:50%;
  }
  .bordered{
    border-style:solid;
    border-color:gray;
    border-width: 0px;
    border-left-width: 2px;
  }
</style>