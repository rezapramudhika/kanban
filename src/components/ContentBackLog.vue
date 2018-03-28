<template lang="html">
  <div class="col-md-3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Back Log</h3>
      </div>
      <div class="panel-body">
        <div v-if="backLogs != ''">
          <board-card v-for="(backLog, index) in backLogs" :details="backLog" :key="index" @detailed-card="getDetails"/>
          <div class="modal-detail">
            <div id="detailbacklog" class="modal fade" role="dialog">
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
                    <div class="wrapper center" v-if="forModalDetails.status == 'backLog'">
                      <span class="fix-mid"><button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" @click="deleteCard(forModalDetails)">Delete</button></span>
                      <span class="pull-right"><button type="button" class="btn btn-warning btn-sm" @click="confirmNext(forModalDetails)">To-Do</button></span>
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
  props: ['backLogs'],
  data: function () {
    return {
      forModalDetails: ''
    }
  },
  methods: {
    ...mapActions([
      'toToDo',
      'removeCard'
    ]),
    getDetails: function ({card}) {
      this.forModalDetails = card
    },
    deleteCard: function (card) {
      // eslint-disable-next-line
      $('#detailbacklog').modal('hide')
      this.removeCard(card)
    },
    confirmNext: function (card) {
      // eslint-disable-next-line
      $('#detailbacklog').modal('hide')
      this.toToDo(card)
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
