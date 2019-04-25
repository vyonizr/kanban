<template>
  <v-container grid-list-md>

    <v-layout align-start justify-center row fill-height wrap>
      <AddNewTaskButton />

      <v-flex d-flex xs12 class="text-xs-center">
        <span class="text-xs-center pt-sans">Add new task</span>
      </v-flex>

      <TaskColumn
        :tasks='this.$store.state.backlogs'
        taskType="Backlog"
        cardColor="red lighten-3"
      />
      <TaskColumn
        :tasks='this.$store.state.todos'
        taskType="Todo"
        cardColor="yellow lighten-3"
      />
      <TaskColumn
        :tasks='this.$store.state.goings'
        taskType="In Progress"
        cardColor="blue-grey lighten-3"
      />
      <TaskColumn
        :tasks='this.$store.state.dones'
        taskType="Done"
        cardColor="green lighten-2"
      />
    </v-layout>
  </v-container>
</template>

<style>
  @import "../assets/styles/index.css";
</style>

<script>
import AddNewTaskButton from '@/components/AddNewTaskButton'
import TaskColumn from '@/components/TaskColumn'

export default {
  data () {
    return {

    }
  },
  components: {
    AddNewTaskButton,
    TaskColumn
  }
}
</script>
