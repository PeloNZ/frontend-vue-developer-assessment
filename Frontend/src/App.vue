<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import * as http from './http.ts'

// todo list
// CRUD requests to backend
// env vars
// display errors
// add tests
// authentication
// form security

// done list
// display items
// http layer
// add item
// update item, mark as completed


const description = ref('')
const items = ref([])
const errorMessage = ref('')

const hasDescription = computed(() =>
  description.value.length > 0
)

const hasErrorMessage = computed(() =>
  errorMessage.value.length > 0
)

onMounted(() => {
  console.debug('mounted')
  // todo
  // load existing items.
  console.debug(items.value)
  getItems()
})

async function getItems() {
  console.debug('getItems');
  try {
    await http.get('')
      .then((response) => {
        // todo validate response
        return response;
      })
      .then((response) => {
        // empty the list first to avoid duplication of values.
        // todo improve by matching on id.
        items.value = [];

        response.forEach(item => {
          items.value.push(item)
        })

        orderByStatus()
      })
  } catch (error) {
    // add error handler component, toaster? replace all console logs
    console.error(error)
  }
}

function orderByStatus() {
  // id is random string so just push the completed values to the bottom.
  items.value.sort( (itemA, itemB) =>
    Number(itemA.isCompleted) - Number(itemB.isCompleted)
  );
}

async function handleAdd() {
  console.debug('handleAdd');

  try {
    const data = {
      description: description.value,
      isCompleted: false
    }

    await http.post('', data)
      .then((response) => {
        // console.debug(response)
        items.value.push(response)
        orderByStatus()
      })
    // todo notify added ok
    // todo handle error
    // todo validate input


  } catch (error) {
    console.error(error)
    errorMessage.value = error.message
  }
}

function handleClear() {
  description.value = ''
}

async function handleMarkAsComplete(item) {
  console.debug('handleMarkAsComplete');
  try {
    const data = {
      id: item.id,
      description: item.description,
      isCompleted: true,
    }

    http.put(data.id, data)
      .then((response) => {
        console.debug(response)

        // Set the referenced item status only after a valid response is received.
        item.isCompleted = response.isCompleted
        // todo error handling
      })

    orderByStatus()

  } catch (error) {
    console.error(error)
  }
}

// http handlers
// todo move to separate component once working
// use fetch api to keep it simple

// todo status handler

// todo response handler 200 201 204 400 404 500

// todo error display handler

</script>

<template>
  <main class="App">
    <div class="container">
      <div class="row">
        <div class="col">
          <img src="clearPointLogo.png" class="img-fluid rounded" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="alert alert-success">
            <h4 class="alert-heading">Todo List App</h4>
            Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean so your task(s)
            are as follows:
            <br />
            <br />
            <ol className="list-left">
              <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
              <li>Display (GET) all the current Todo Items in the below grid and display them in any order you wish</li>
              <li>
                Bonus points for completing the 'Mark as completed' button code for allowing users to update and mark a
                specific Todo Item as completed and for displaying any relevant validation errors/ messages from the API
                in the UI
              </li>
              <li>Feel free to add unit tests and refactor the component(s) as best you see fit</li>
            </ol>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="container">
            <h1>Add Item</h1>
            <div class="row mb-3">
              <label class="col col-form-label form-label col-sm-2">Description</label>
              <div class="col col-md-6">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter description..."
                  v-model="description"
                />
              </div>
            </div>
            <div class="row mb-3 offset-md-2">
              <div class="hstack gap-2">
                <button type="button" class="btn btn-primary" @click="handleAdd" :disabled="hasDescription === false">
                  Add Item
                </button>
                <button type="button" class="btn btn-secondary" @click="handleClear"
                        :disabled="hasDescription === false">Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="container" id="error_container" v-show="hasErrorMessage">
            <span>Error: {{ errorMessage }}</span>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col">
          <h1>
            Showing {{ items.length }} Item(s)
            <button type="button" class="pull-right btn btn-primary" @click="getItems">Refresh</button>
          </h1>
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.description }}</td>
                <td>
                  <button v-show="item.isCompleted === false" type="button" class="btn btn-warning btn-sm" @click="() => handleMarkAsComplete(item)">
                    Mark as completed
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <footer className="page-footer font-small teal pt-4">
      <div className="footer-copyright text-center py-3">
        © 2021 Copyright:
        <a href="https://clearpoint.digital" target="_blank" rel="noreferrer"> clearpoint.digital </a>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.App {
  text-align: center;
}

.list-left {
  text-align: left;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
