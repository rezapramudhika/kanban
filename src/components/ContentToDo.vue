<template lang="html">
  <div class="col-md-3">
    <div class="panel panel-warning">
      <div class="panel-heading">
        <h3 class="panel-title">To-Do</h3>
      </div>
      <div class="panel-body">
        <div v-if="toDos != ''">
          <board-card v-for="(todo, index) in toDos" :details="todo" :key="index" @detailed-card="getDetails"/>
          <div class="modal-detail">
            <div id="detailtodo" class="modal fade" role="dialog" ref="myDiv">
              <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title center">Detail Task: {{ forModalDetails.title }}</h4>
                  </div>
                  <div class="modal-body">
                    <p><span class="strong">Task description:</span> {{ forModalDetails.description }}</p>
                    <p><span class="strong">Points:</span> {{ forModalDetails.point }}</p>
                    <p><span class="strong">Status:</span> {{ forModalDetails.status }}</p>
                  </div>
                  <div class="modal-footer">
                    <div class="wrapper center" v-if="forModalDetails.status == 'toDo'">
                      <popover name="confirm-before-todo">
                        <div class="">
                          Are you sure?
                        </div>
                        <span><button @click="confirmBefore(forModalDetails)" v-popover.top="{ name: 'confirm-before-todo' }" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Yes</button></span>
                        <span><button type="button" class="btn btn-success btn-sm" v-popover.top="{ name: 'confirm-before-todo' }" >No</button></span>
                      </popover>
                      <popover name="confirm-deletion-todo">
                        <div class="">
                          Are you sure?
                        </div>
                        <span><button @click="deleteCard(forModalDetails)" v-popover.top="{ name: 'confirm-deletion-todo' }" type="button" class="btn btn-danger btn-sm">Yes</button></span>
                        <span><button type="button" class="btn btn-success btn-sm" v-popover.top="{ name: 'confirm-deletion-todo' }" >No</button></span>
                      </popover>
                      <popover name="confirm-next-todo">
                        <div class="">
                          Are you sure?
                        </div>
                        <span><button @click="confirmNext(forModalDetails)" v-popover.top="{ name: 'confirm-next-todo' }" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Yes</button></span>
                        <span><button type="button" class="btn btn-success btn-sm" v-popover.top="{ name: 'confirm-next-todo' }" >No</button></span>
                      </popover>
                      <span class="pull-left"><button v-popover.top="{ name: 'confirm-before-todo' }" type="button" class="btn btn-default btn-sm">Back Log</button></span>
                      <span><button v-popover.top="{ name: 'confirm-deletion-todo' }" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Delete</button></span>
                      <span class="pull-right"><button v-popover.top="{ name: 'confirm-next-todo' }" type="button" class="btn btn-info btn-sm">Doing</button></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> <!-- end modal -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BoardCard from '@/components/BoardCard'
export default {
  props: ['toDos'],
  data: function () {
    return {
      forModalDetails: ''
    }
  },
  methods: {
    ...mapActions([
      'toBackLog',
      'toDoing',
      'removeCard'
    ]),
    getDetails: function ({card}) {
      this.forModalDetails = card
    },
    deleteCard: function (card) {
      // eslint-disable-next-line
      $('#detailtodo').modal('hide')
      this.removeCard(card)
    },
    confirmNext: function (card) {
      // eslint-disable-next-line
      $('#detailtodo').modal('hide')
      this.toDoing(card)
    },
    confirmBefore: function (card) {
      // eslint-disable-next-line
      $('#detailtodo').modal('hide')
      this.toBackLog(card)
    }
  },
  components: {
    BoardCard
  }
}
</script>

<style lang="css" scoped>
.center {
  text-align: center;
}
.fix-mid {
  padding-left: 10%;
}
.strong {
  font-weight: bold;
}
p {
  font-size: 120%;
  padding-bottom: 15px;
}
</style>
