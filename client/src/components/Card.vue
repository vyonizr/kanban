<template>
  <v-flex
    d-flex
    lg12
  >
    <v-card :color="color" :dark="dark" hover style="cursor: default;">
      <v-card-title :color="color" style="padding: 16px 16px 0px 16px;">
        <div>
          <span class="headline pt-sans">{{ task.title }} <br></span>
          <span class="caption">Assigned to: {{ task.assignedTo }} <br></span>
          <span class="caption">Created: {{ parseDate(task.createdAt.toDate()) }}</span>
        </div>
      </v-card-title>
      <v-card-text color="white">
        <span class="lato">{{ task.description }}</span>
      </v-card-text>
      <v-layout
        align-center
        justify-space-around
        row
      >
        <v-card-actions>
          <v-btn depressed v-if="task.status === 'todo'" small fab @click="moveToBacklog(task.id)">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-btn depressed v-else-if="task.status === 'going'" small fab @click="moveToTodo(task.id)">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-btn depressed v-else-if="task.status === 'done'" small fab @click="moveToGoing(task.id)">
            <v-icon>arrow_back</v-icon>
          </v-btn>

          <v-dialog v-model="dialog" persistent max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn depressed small fab dark color="blue darken-4" class="text-lg-center" v-on="on">
                <v-icon dark>edit</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Edit task</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex lg8>
                      <v-text-field v-model="taskTitleInput" label="Title" required></v-text-field>
                    </v-flex>
                    <v-flex lg4>
                      <v-text-field
                        v-model="assignToInput"
                        label="Assign To"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex lg12>
                      <v-textarea
                        v-model="descriptionInput"
                        label="Description"
                        outline
                        required
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="toggleDialog();">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="updateTask(task); toggleDialog();">Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn depressed small fab dark color="red" @click="confirmDelete(task.id)">
            <v-icon dark>delete_outline</v-icon>
          </v-btn>

          <v-btn v-if="task.status === 'backlog'" depressed light small fab @click="moveToTodo(task.id)">
            <v-icon>arrow_forward</v-icon>
          </v-btn>
          <v-btn v-else-if="task.status === 'todo'" depressed small fab @click="moveToGoing(task.id)">
            <v-icon>arrow_forward</v-icon>
          </v-btn>
          <v-btn v-else-if="task.status === 'going'" depressed small fab @click="moveToDone(task.id)">
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-card-actions>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import moment from 'moment'
import Swal from 'sweetalert2'

export default {
  props: ['task', 'color', 'dark'],
  data () {
    return {
      taskTitleInput: this.task.title,
      assignToInput: this.task.assignedTo,
      descriptionInput: this.task.description,
      dialog: false
    }
  },
  methods: {
    toggleDialog () {
      this.dialog = !this.dialog
    },
    clearInput () {
      this.taskTitleInput = "",
      this.assignToInput = "",
      this.descriptionInput = ""
    },
    parseDate(date) {
      return moment(new Date(date)).calendar()
    },
    updateTask(task) {
      let updatedTask = task
      updatedTask.title = this.taskTitleInput
      updatedTask.description = this.descriptionInput
      updatedTask.assignedTo = this.assignToInput
      updatedTask.updatedAt = new Date

      // this.clearInput()
      this.$store.dispatch("updateTask", updatedTask)
    },
    confirmDelete (taskId) {
      const vuetifySwal = Swal.mixin({
        customClass: {
          confirmButton: 'v-btn error outline',
          cancelButton: 'v-btn secondary'
        },
        buttonsStyling: false,
      })

      vuetifySwal.fire({
        title: 'Delete this task?',
        text: "You won't be able to revert this",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("deleteTask", taskId)
        }
      })
    },
    moveToBacklog(taskId) {
      this.$store.dispatch("moveToBacklog", taskId)
    },
    moveToTodo(taskId) {
      this.$store.dispatch("moveToTodo", taskId)
    },
    moveToGoing(taskId) {
      this.$store.dispatch("moveToGoing", taskId)
    },
    moveToDone(taskId) {
      this.$store.dispatch("moveToDone", taskId)
    }
  }
}
</script>
