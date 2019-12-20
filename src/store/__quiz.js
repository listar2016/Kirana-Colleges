// import axios from 'axios'
export default {
    state: {
      data: []
    },
    mutations: {
      setQuizData (state, data) {
        Object.keys(state).map(key => {
          if (Array.isArray(data[key])) {
            state[key] = data[key]
            return state[key]
          }
        })
      },
      emptyQuizData (state) {
        Object.keys(state).map(key => {
          state[key] = []
          return state[key]
        })
      }
    },
    actions: {
      getQuizData () {
        let vm = this
        vm.commit('emptyQuizData')
        axios.get('/json/quiz.json', {})
          .then(response => {
            if (response.data) { vm.commit('setQuizData', response.data) }
          })
          .catch(error => {
            console.log('Fetch error /n' + error.response)
          })
      }
    }
  }
  