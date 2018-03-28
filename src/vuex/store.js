import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import Firebase from '../firebase/index.js'

const db = Firebase.database()

Vue.use(Vuex)

const state = {
  backLog: [],
  toDo: [],
  doing: [],
  done: []
}

const mutations = {
  setAll (state, payload) {
    state.backLog = payload[0]
    state.toDo = payload[1]
    state.doing = payload[2]
    state.done = payload[3]
  },
  setBackLogToToDo (state, payload) {
    db.ref('/toDo/' + payload.id)
    .set({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      point: payload.point,
      assign: payload.assign,
      status: 'toDo'
    })
    db.ref('/backLog/' + payload.id)
    .remove()
  },
  setToDoToBackLog (state, payload) {
    db.ref('/backLog/' + payload.id)
    .set({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      point: payload.point,
      assign: payload.assign,
      status: 'backLog'
    })
    db.ref('/toDo/' + payload.id)
    .remove()
  },
  setToDoToDoing (state, payload) {
    db.ref('/doing/' + payload.id)
    .set({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      point: payload.point,
      assign: payload.assign,
      status: 'doing'
    })
    db.ref('/toDo/' + payload.id)
    .remove()
  },
  setDoingToDone (state, payload) {
    db.ref('/done/' + payload.id)
    .set({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      point: payload.point,
      assign: payload.assign,
      status: 'done'
    })
    db.ref('/doing/' + payload.id)
    .remove()
  },
  setDoneToDoing (state, payload) {
    db.ref('/doing/' + payload.id)
    .set({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      point: payload.point,
      assign: payload.assign,
      status: 'doing'
    })
    db.ref('/done/' + payload.id)
    .remove()
  },
  setDoingToToDo (state, payload) {
    db.ref('/toDo/' + payload.id)
    .set({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      point: payload.point,
      assign: payload.assign,
      status: 'toDo'
    })
    db.ref('/doing/' + payload.id)
    .remove()
  },
  removeObj (state, payload) {
    db.ref('/' + payload.status + '/' + payload.id)
    .remove()
  }
}

const actions = {
  getAll ({ commit }) {
    db.ref('/')
    .on('value', function (snapshot) {
      let backLog = []
      let toDo = []
      let doing = []
      let done = []
      if ((snapshot.val().backLog)) {
        backLog = Object.values(snapshot.val().backLog)
      }
      if ((snapshot.val().toDo)) {
        toDo = Object.values(snapshot.val().toDo)
      }
      if ((snapshot.val().doing)) {
        doing = Object.values(snapshot.val().doing)
      }
      if ((snapshot.val().done)) {
        done = Object.values(snapshot.val().done)
      }
      let arr = [backLog, toDo, doing, done]
      commit('setAll', arr)
    })
  },
  submitTodo ({ commit }, newBackLog) {
    var newKey = db.ref('/backLog').push().key
    db.ref('/backLog/' + newKey)
    .set({
      id: newKey,
      title: newBackLog.title,
      description: newBackLog.description,
      point: newBackLog.point,
      assign: newBackLog.assign,
      status: newBackLog.status
    })
  },
  toBackLog ({ commit }, newBackLog) {
    let pos = state.toDo.findIndex(function (e) {
      return e.id === newBackLog.id
    })
    newBackLog.pos = pos
    commit('setToDoToBackLog', newBackLog)
  },
  toToDo ({ commit }, newTodo) {
    let pos = state.backLog.findIndex(function (e) {
      return e.id === newTodo.id
    })
    newTodo.pos = pos
    commit('setBackLogToToDo', newTodo)
  },
  toDoing ({ commit }, newDoing) {
    let pos = state.toDo.findIndex(function (e) {
      return e.id === newDoing.id
    })
    newDoing.pos = pos
    commit('setToDoToDoing', newDoing)
  },
  toDone ({ commit }, newDone) {
    let pos = state.toDo.findIndex(function (e) {
      return e.id === newDone.id
    })
    newDone.pos = pos
    commit('setDoingToDone', newDone)
  },
  toDoingFromDone ({ commit }, newDoing) {
    let pos = state.toDo.findIndex(function (e) {
      return e.id === newDoing.id
    })
    newDoing.pos = pos
    commit('setDoneToDoing', newDoing)
  },
  toToDoFromDoing ({ commit }, newToDo) {
    let pos = state.toDo.findIndex(function (e) {
      return e.id === newToDo.id
    })
    newToDo.pos = pos
    commit('setDoingToToDo', newToDo)
  },
  removeCard ({ commit }, removeObj) {
    commit('removeObj', removeObj)
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
