<template lang="html">
  <!-- modal -->
  <div id="add" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Add Task</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label" for="title">Title</label>
            <input v-model="newTask.title" class="form-control" id="title" type="text" placeholder="Task Title">
          </div>
          <div class="form-group">
            <label class="control-label" for="description">Description</label>
            <textarea v-model="newTask.description" rows="2" class="form-control" id="description" type="text" placeholder="Task Description"></textarea>
          </div>
          <div class="form-group">
            <label class="control-label" for="point">Point</label>
            <input v-model="newTask.point" class="form-control" id="point" type="number" placeholder="Point">
          </div>
          <div class="form-group">
            <label class="control-label" for="assign">Assign to</label>
            <input v-model="newTask.assign" class="form-control" id="assign" type="text" placeholder="Assign to">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button @click="addTask" type="button" class="btn btn-primary">Add Task</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: function () {
    return {
      newTask: {
        title: '',
        description: '',
        point: 0,
        assign: '',
        status: 'backLog'
      }
    }
  },
  methods: {
    ...mapActions([
      'submitTodo'
    ]),
    addTask: function () {
      if (this.newTask.title !== '') {
        this.submitTodo(this.newTask)
        this.clearStatus()
        // eslint-disable-next-line
        $('#add').modal('hide')
      } else {
        console.log('please fill title')
        this.clearStatus()
      }
    },
    clearStatus: function () {
      this.newTask.title = ''
      this.newTask.description = ''
      this.newTask.point = 0
      this.newTask.assign = ''
    }
  }
}
</script>

<style lang="css">
</style>
