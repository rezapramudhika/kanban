<template lang="html">
  <div class="button-detail">
    <!-- <button data-toggle="modal" data-target="#detail" type="button" name="button">Show Detail</button> -->
    
    <!-- modal -->
    <div id="detail" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title center">Detail Task: {{ data.title }}</h4>
          </div>
          <div class="modal-body">
            {{ data }}
            <p><span class="strong">Task description:</span> {{ data.description }}</p>
            <p><span class="strong">Points:</span> {{ data.point }}</p>
            <p><span class="strong">Status:</span> {{ data.status }}</p>
          </div>
          <div class="modal-footer">
            <div class="wrapper center" v-if="data.status == 'backLog'">
              <!-- <span class="pull-left"><button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button></span> -->
              <span class="fix-mid"><button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button></span>
              <span class="pull-right"><button @click="sendToDo(data)" type="button" class="btn btn-success btn-sm" data-dismiss="modal">To-Do</button></span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ButtonModalDetails from '@/components/ButtonModalDetails'
export default {
  props: ['data'],
  components: {
    ButtonModalDetails
  },
  methods: {
    ...mapActions([
      'toToDo'
    ]),
    sendToDo: function (details) {
      this.toToDo(details)
    }
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
