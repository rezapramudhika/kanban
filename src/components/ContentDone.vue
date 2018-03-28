<template lang="html">
  <div class="col-md-3">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">Done</h3>
      </div>
      <div class="panel-body">
        <div v-if="dones != ''">
          <board-card v-for="(done, index) in dones" :details="done" :key="index" @detailed-card="getDetails"/>
          <div class="modal-detail">
            <div id="detaildone" class="modal fade" role="dialog">
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
                    <div class="wrapper center" v-if="forModalDetails.status == 'done'">
                      <popover name="confirm-before-done">
                        <div class="">
                          Are you sure?
                        </div>
                        <span><button @click="confirmBefore(forModalDetails)" v-popover.top="{ name: 'confirm-before-done' }" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Yes</button></span>
                        <span><button type="button" class="btn btn-success btn-sm" v-popover.top="{ name: 'confirm-before-done' }" >No</button></span>
                      </popover>
                      <popover name="confirm-deletion">
                        <div class="">
                          Are you sure?
                        </div>
                        <span><button @click="deleteCard(forModalDetails)" v-popover.top="{ name: 'confirm-deletion-todo' }" type="button" class="btn btn-danger btn-sm">Yes</button></span>
                        <span><button type="button" class="btn btn-success btn-sm" v-popover.top="{ name: 'confirm-deletion' }" >No</button></span>
                      </popover>
                      <span class="pull-left"><button v-popover.top="{ name: 'confirm-before-done' }" type="button" class="btn btn-info btn-sm" data-dismiss="modal">Doing</button></span>
                      <span class="fix-mid"><button v-popover.top="{ name: 'confirm-deletion' }" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Delete</button></span>
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
  props: ['dones'],
  data: function () {
    return {
      forModalDetails: ''
    }
  },
  methods: {
    ...mapActions([
      'toDoingFromDone',
      'removeCard'
    ]),
    getDetails: function ({card}) {
      this.forModalDetails = card
    },
    deleteCard: function (card) {
      // eslint-disable-next-line
      $('#detaildone').modal('hide')
      this.removeCard(card)
    },
    confirmBefore: function (card) {
      // eslint-disable-next-line
      $('#detaildone').modal('hide')
      this.toDoingFromDone(card)
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
  padding-right: 10%;
}
.strong {
  font-weight: bold;
}
p {
  font-size: 120%;
  padding-bottom: 15px;
}
</style>
