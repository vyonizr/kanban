<template>
  <v-container grid-list-md>

    <v-layout align-start justify-center row fill-height wrap>
      <AddNewTaskButton />

      <v-flex d-flex lg12 class="text-lg-center">
        <span class="text-lg-center pt-sans">Add new task</span>
      </v-flex>
      <v-flex d-flex lg3>
        <v-layout row wrap>
          <v-flex d-flex lg12>
            <span class="headline text-lg-center font-weight-medium noto-sans">Backlog</span>
          </v-flex>
          <Card
            v-for="task in this.$store.state.backlogs"
            :key="task.id"
            :task="task"
            color="red lighten-3"
          />
        </v-layout>
      </v-flex>
      <v-flex d-flex lg3>
        <v-layout row wrap>
          <v-flex d-flex lg12>
            <span class="headline text-lg-center font-weight-medium noto-sans">Todo</span>
          </v-flex>
          <Card
            v-for="task in this.$store.state.todos"
            :key="task.id"
            :task="task"
            color="yellow lighten-3"
          />
        </v-layout>
      </v-flex>
      <v-flex d-flex lg3>
        <v-layout row wrap>
          <v-flex d-flex lg12>
            <span class="headline text-lg-center font-weight-medium noto-sans">In Progress</span>
          </v-flex>
          <Card
            v-for="task in this.$store.state.goings"
            :key="task.id"
            :task="task"
            color="blue-grey lighten-3"
          />
        </v-layout>
      </v-flex>
      <v-flex d-flex lg3>
        <v-layout row wrap>
          <v-flex d-flex lg12>
            <span class="headline text-lg-center font-weight-medium noto-sans">Done</span>
          </v-flex>
          <Card
            v-for="task in this.$store.state.dones"
            :key="task.id"
            :task="task"
            color="green lighten-2"
          />
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
  @import "../assets/styles/index.css";
</style>

<script>
import Card from '@/components/Card'
import AddNewTaskButton from '@/components/AddNewTaskButton'

export default {
  data () {
    return {
      backlogColor: 'grey',
      todoColor: 'red',
      goingColor: 'yellow',
      doneColor: 'green'
    }
  },
  components: {
    Card,
    AddNewTaskButton
  }
}
</script>
