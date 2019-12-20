// import axios from 'axios'
export default {
  state: {
    data: []
  },
  mutations: {
    setVideoData (state, data) {
      Object.keys(state).map(key => {
        if (Array.isArray(data[key])) {
          state[key] = data[key]
          return state[key]
        }
      })
    },
    emptyVideoData (state) {
      Object.keys(state).map(key => {
        state[key] = []
        return state[key]
      })
    }
  },
  actions: {
    getVideoData () {
      let vm = this
      vm.commit('emptyVideoData')
      axios.get('/json/video.json', {})
        .then(response => {
          if (response.data) { vm.commit('setVideoData', response.data) }
        })
        .catch(error => {
          console.log('Fetch error /n' + error.response)
        })
    }
  }
}
