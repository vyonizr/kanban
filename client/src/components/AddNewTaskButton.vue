<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn fab dark color="light-blue darken-3" class="text-lg-center" v-on="on">
        <v-icon dark>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add new task</span>
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
              <v-text-field
                v-model="descriptionInput"
                label="Description"
                outline
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="toggleDialog();">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="addNewTask(); toggleDialog();">Post</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      taskTitleInput: '',
      assignToInput: '',
      descriptionInput: '',
      dialog: false
    }
  },
  methods: {
    toggleDialog () {
      this.dialog = !this.dialog
    },
    addNewTask () {
      let newTask = {
        title: this.taskTitleInput,
        description: this.descriptionInput,
        assignedTo: this.assignToInput,
        status: 'backlog',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      this.$store.dispatch('addNewTask', newTask)
    }
  }
}
</script>
