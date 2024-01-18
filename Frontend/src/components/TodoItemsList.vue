<!-- As an example refactor, move the table of items to its own component, and emit changes per item for the parent to deal with -->
<!-- In the future we could delete items and reorder by column(s) -->
<template>
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
        <button v-show="item.isCompleted === false" type="button" class="btn btn-warning btn-sm"
                @click="$emit('markAsComplete', item)">
          Mark as completed
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
interface Props {
  items: Array<any>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  markAsComplete: []
}>()

</script>
<style scoped>

@media (prefers-reduced-motion: no-preference) {
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