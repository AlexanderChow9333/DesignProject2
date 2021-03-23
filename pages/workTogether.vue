<template>
  <b-row class="row">
    <b-col class="col">
      <h1>Work Together</h1>
      <hr>
      <b-form-select v-model="status" :options="statusOptions" class="input"></b-form-select>
      <b-button @click="setStatus()" variant="success">Save</b-button>
      <!-- <b-button @click="readData()">Read Data</b-button> -->
    </b-col>
    <b-col class="bordered col">
      <h1>Other Students Working on {{status}}</h1>
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
        <template #cell(contact)="row">
          <!-- <div @click="completeTask(row.index)">
            <b-form-checkbox :checked="items[row.index].status"></b-form-checkbox>
          </div> -->
          <address>
            <b-button @click="contact(row.index)" :href ="'mailto:' + items[row.index].email" variant="primary">Contact</b-button>
          </address>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        status:"",
        statusOptions:[
          {value:"Econ", text:"Econ"},
          {value:"Math", text:"Math"},
          {value:"English", text:"English"},
          {value:"Art", text:"Art"},
          {value:"Civics", text:"Civics"},
          {value:"Computer Science", text:"Computer Science"},
          {value:"Product Design", text:"Product Design"},
          {value:"Film", text:"Film"},
          {value:"Physics", text:"Physics"},
          {value:"Chemistry", text:"Chemistry"},
          {value:"Biology", text:"Biology"},
          {value:"Drama", text:"Drama"},
        ],
        year:"",
        fields: [
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'email',
            sortable: true
          },
          {
            key: 'contact',
          }
        ],
        items: []
      }
    },
    methods: {
      contact(index:number) {
        console.log(this.items[index].email);
      },
      readData() {
        var projects = this.$fire.database.ref('users');
        projects.on('value', this.gotData, this.errData)
      },
      setStatus() {
        this.$fire.database.ref('users/'+localStorage.getItem('uid')).update({
          status: this.status
        });
        console.log(this.status);

      },
      gotData(data) {
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
        for (let i=0;i<data.length;i++) {
          if (data[i][0] == localStorage.getItem('uid')) {
            this.status = data[i][1].status;
            this.year = data[i][1].year;
          }
        }
        for (let i = 0; i < data.length; i++) {
          const element = data[i][1];
          if (element.status == this.status && element.year == this.year && data[i][0]!=localStorage.getItem('uid')) {
            this.items.push(element);
          }
        }
        console.log(this.items, "ITEMS")
      },
      removeData(index: number) {
        this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid+'/timeblocking/'+this.items[index].name).remove();
        // console.log(this.items[index]);
        // // console.log(this.items, index);
        // var data = this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid+"/timeblocking").get();
        // console.log("Remove DATA", data);
      },
      errData(err: any) {
        console.log('error', err);
      },
      completeTask(index: number, completedBool: boolean) {
        this.$fire.database.ref('users/'+this.$fire.auth.currentUser.uid+"/timeblocking/"+this.items[index].name).set({
          name: this.items[index].name,
          time: this.items[index].time,
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