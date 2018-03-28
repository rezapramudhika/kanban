<template lang="html">
  <div class="panel panel-default">
    <div class="panel-heading title-header">{{ details.title }}</div>
    <div class="panel-body">
      <p>Point: {{ details.point }}</p>
      <p>Assigned to: {{ details.assign }}</p>
    </div>
    <div class="panel-footer">
      <div v-if="details.status == 'backLog'">
        <button @click="showDetails" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#detailbacklog" type="button" name="button">Show Details</button>
      </div>
      <div v-if="details.status == 'toDo'">
        <button @click="showDetails" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#detailtodo" type="button" name="button">Show Details</button>
      </div>
      <div v-if="details.status == 'doing'">
        <button @click="showDetails" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#detaildoing" type="button" name="button">Show Details</button>
      </div>
      <div v-if="details.status == 'done'">
        <button @click="showDetails" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#detaildone" type="button" name="button">Show Details</button>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['details'],
  methods: {
    showDetails () {
      this.$emit('detailed-card', {
        card: this.details
      })
    }
  }
}
</script>

<style lang="css" scoped>
.title-header {
  font-weight: bold;
}
</style>
