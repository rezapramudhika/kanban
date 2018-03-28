<template lang="html">
  <div class="container-fluid">
    <div class="row">
      <content-back-log :backLogs="backLog" />
      <content-to-do :toDos="toDo" />
      <content-doing :doings="doing" />
      <content-done :dones="done" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentBackLog from '@/components/ContentBackLog'
import ContentToDo from '@/components/ContentToDo'
import ContentDoing from '@/components/ContentDoing'
import ContentDone from '@/components/ContentDone'
export default {
  computed: {
    ...mapState([
      'backLog',
      'toDo',
      'doing',
      'done'
    ])
  },
  components: {
    ContentBackLog,
    ContentToDo,
    ContentDoing,
    ContentDone
  },
  methods: {
    ...mapActions([
      'getAll'
    ])
  },
  created () {
    this.getAll()
  }
}
</script>

<style lang="css">
</style>
