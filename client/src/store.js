import Vue from 'vue'
import Vuex from 'vuex'
import db from './api/firestore'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backlogs: [],
    todos: [],
    goings: [],
    dones: []
  },
  mutations: {
    setBacklogs (state, payload) {
      state.backlogs = payload
    },
    setTodos (state, payload) {
      state.todos = payload
    },
    setGoings (state, payload) {
      state.goings = payload
    },
    setDones (state, payload) {
      state.dones = payload
    }
  },
  actions: {
    getAllTasks (context) {
      context.dispatch('getAllBacklogs')
      context.dispatch('getAllTodos')
      context.dispatch('getAllGoings')
      context.dispatch('getAllDones')
    },

    getAllBacklogs (context) {
      db.collection('todos')
        .where('status', '==', 'backlog')
        .orderBy('updatedAt', 'asc')
        .onSnapshot(function (querySnapshot) {
          let backlogs = []
          querySnapshot.forEach(function (doc) {
            backlogs.push({...doc.data(), id: doc.id})
          })


          context.commit('setBacklogs', backlogs)
        })
    },
    getAllTodos (context) {
      db.collection('todos').where('status', '==', 'todo')
        .orderBy('updatedAt', 'asc')
        .onSnapshot(function (querySnapshot) {
          let todos = []
          querySnapshot.forEach(function (doc) {
            todos.push({...doc.data(), id: doc.id})
          })

          context.commit('setTodos', todos)
        })
    },
    getAllGoings (context) {
      db.collection('todos').where('status', '==', 'going')
        .orderBy('updatedAt', 'asc')
        .onSnapshot(function (querySnapshot) {
          let goings = []
          querySnapshot.forEach(function (doc) {
            goings.push({...doc.data(), id: doc.id})
          })

          context.commit('setGoings', goings)
        })
    },
    getAllDones (context) {
      db.collection('todos').where('status', '==', 'done')
        .orderBy('updatedAt', 'asc')
        .onSnapshot(function (querySnapshot) {
          let dones = []
          querySnapshot.forEach(function (doc) {
            dones.push({...doc.data(), id: doc.id})
          })

          context.commit('setDones', dones)
        })
    },
    addNewTask (context, data) {
      db.collection('todos').add(data)
      .then(function (docRef) {
        Swal.fire({
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('Document written with ID: ', docRef.id)
        context.dispatch('getAllTasks')
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
    },
    updateTask(context, updatedTask) {
      db.collection("todos").doc(`${updatedTask.id}`)
      .set(updatedTask)
      .then(function () {
        Swal.fire({
          type: 'success',
          title: 'Updated',
          showConfirmButton: false,
          timer: 1500
        })
        context.dispatch('getAllTasks')
      })
      .catch(function (error) {
        console.error('Error updating document: ', error)
      })
    },
    deleteTask(context, taskId) {
      db.collection("todos").doc(`${taskId}`)
      .delete()
      .then(function () {
        Swal.fire({
          type: 'success',
          text: 'Task deleted',
          showConfirmButton: false,
          timer: 1500
        })
        context.dispatch('getAllTasks')
      })
      .catch(function (error) {
        console.error('Error deleting document: ', error)
      })
    },
    moveToBacklog(context, taskId) {
      db.collection("todos").doc(`${taskId}`)
      .update({
        status: "backlog",
        updatedAt: new Date
      })
      .then(function () {
        context.dispatch('getAllTasks')
      })
      .catch(function (error) {
        console.error('Error updating document: ', error)
      })
    },
    moveToTodo(context, taskId) {
      db.collection("todos").doc(`${taskId}`)
      .update({
        status: "todo",
        updatedAt: new Date
      })
      .then(function () {
        context.dispatch('getAllTasks')
      })
      .catch(function (error) {
        console.error('Error updating document: ', error)
      })
    },
    moveToGoing(context, taskId) {
      db.collection("todos").doc(`${taskId}`)
      .update({
        status: "going",
        updatedAt: new Date
      })
      .then(function () {
        context.dispatch('getAllTasks')
      })
      .catch(function (error) {
        console.error('Error updating document: ', error)
      })
    },
    moveToDone(context, taskId) {
      db.collection("todos").doc(`${taskId}`)
      .update({
        status: "done",
        updatedAt: new Date
      })
      .then(function () {
        context.dispatch('getAllTasks')
      })
      .catch(function (error) {
        console.error('Error updating document: ', error)
      })
    }
  }
})
