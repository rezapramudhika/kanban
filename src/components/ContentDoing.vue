<template lang="html">
  <div class="col-md-3">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">Doing</h3>
      </div>
      <div class="panel-body">
        <div v-if="doings != ''">
          <board-card v-for="(doing, index) in doings" :details="doing" :key="index" @detailed-card="getDetails"/>
          <div class="modal-detail">
            <div id="detaildoing" class="modal fade" role="dialog">
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
                    <div class="wrapper center" v-if="forModalDetails.status == 'doing'">
                      <popover name="confirm-before-doing">
                        <div class="">
                          Are you sure?
                        </div>
                        <span><button @click="confirmBefore(forModalDetails)" v-popover.top="{ name: 'confirm-before-doing' }" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Yes</button></span>
                        <span><button type="button" class="btn btn-success btn-sm" v-popover.top="{ name: 'confirm-before-doing' }" >No</button></span>
                      </popover>
                      <popover name="confirm-deletion">
                        <div class="">
                          Are you sure?
                        </div>
                        <span><button @click="deleteCard(forModalDetails)" v-popover.top="{ name: 'confirm-deletion-todo' }" type="button" class="btn btn-danger btn-sm">Yes</button></span>
                        <span><button type="button" class="btn btn-success btn-sm" v-popover.top="{ name: 'confirm-deletion' }" >No</button></span>
                      </popover>
                      <popover name="confirm-next-doing">
                        <div class="">
                          Are you sure?
                        </div>
                        <span><button @click="confirmNext(forModalDetails)" v-popover.top="{ name: 'confirm-next-doing' }" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Yes</button></span>
                        <span><button type="button" class="btn btn-success btn-sm" v-popover.top="{ name: 'confirm-next-doing' }" >No</button></span>
                      </popover>
                      <span class="pull-left"><button v-popover.top="{ name: 'confirm-before-doing' }" type="button" class="btn btn-warning btn-sm">To-Do</button></span>
                      <span><button v-popover.top="{ name: 'confirm-deletion' }" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Delete</button></span>
                      <span class="pull-right"><button v-popover.top="{ name: 'confirm-next-doing' }" type="button" class="btn btn-success btn-sm">Done</button></span>
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
  props: ['doings'],
  data: function () {
    return {
      forModalDetails: ''
    }
  },
  methods: {
    ...mapActions([
      'toToDoFromDoing',
      'toDone',
      'removeCard'
    ]),
    getDetails: function ({card}) {
      this.forModalDetails = card
    },
    deleteCard: function (card) {
      // eslint-disable-next-line
      $('#detaildoing').modal('hide')
      this.removeCard(card)
    },
    confirmNext: function (card) {
      // eslint-disable-next-line
      $('#detaildoing').modal('hide')
      this.toDone(card)
    },
    confirmBefore: function (card) {
      // eslint-disable-next-line
      $('#detaildoing').modal('hide')
      this.toToDoFromDoing(card)
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
