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
                      <span class="pull-left"><button type="button" class="btn btn-info btn-sm" data-dismiss="modal" @click="confirmBefore(forModalDetails)">Doing</button></span>
                      <span class="fix-mid"><button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" @click="deleteCard(forModalDetails)">Delete</button></span>
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
