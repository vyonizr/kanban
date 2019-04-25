<template>
  <v-flex d-flex xs3>
    <v-layout row wrap>
      <v-flex d-flex xs12>
        <span class="headline text-xs-center font-weight-medium noto-sans">{{ taskType }}</span>
      </v-flex>
      <Card
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :color="cardColor"
      />
    </v-layout>
  </v-flex>
</template>

<script>
import Card from '@/components/Card'

export default {
  props: ['tasks', 'taskType', 'cardColor'],
  components: {
    Card
  }
}
</script>