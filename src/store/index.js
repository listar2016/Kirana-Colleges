import Vue from 'vue'
import Vuex from 'vuex'

import video from './__video'
import quiz from './__quiz'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    video,
    quiz
  }
})
