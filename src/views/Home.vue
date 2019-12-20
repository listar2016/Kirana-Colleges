<template>
  <div class="container text-center p-3">
    <h3>Answering Your Key Question About Online Learning</h3>
    <h6>In this mini learnig series you will discover just how simple and easy it is to complete your chosen course.<br>Simply click on the below to get started.</h6>
    <b-progress :max="videoData.length" animated class="mx-1">
      <b-progress-bar :value="currentIndex">
        {{ currentIndex }} / {{ videoData.length }}
      </b-progress-bar>
    </b-progress>
    <div class="m-3" v-if="currentStatus==0 || currentStatus == 3">
      <!-- <b-progress :value="currentIndex" :max="videoData.length" show-progress animated class="my-1"></b-progress> -->
      
      <b-embed
        type="iframe"
        aspect="16by9"
        :src="videoData[currentIndex].url"
        allowfullscreen
        v-if="videoData.length>0"
      ></b-embed>
    </div>
    <div class="col-xl-9 mx-auto my-4" v-if="currentStatus == 1">
      <b-card
        :title="quizData[currentQuizIndex].question"
        class= "card-shadow"
        >
        <div class="text-left ml-4 float-left">
          <b-form-radio 
            v-model="quizData[currentQuizIndex].selected" 
            v-for="(answer,index) in quizData[currentQuizIndex].answers"
            :key="index"
            name="some-radios" 
            :value="index"
            class="mb-2">{{ answer }}</b-form-radio>
        </div>
        <radial-progress-bar :diameter="100"
              :completed-steps="currentQuizIndex"
              :total-steps="quizData.length"
              :strokeWidth="5"
              startColor="#0073dc"
              stopColor="#0073dc"
              innerStrokeColor="#EEE"
              class="float-right"
              >
              <p style="margin-bottom:0px">{{ currentQuizIndex }} / {{ quizData.length }}</p>
            </radial-progress-bar>
      </b-card>
    </div>
    <div class="col-xl-9 mx-auto my-4" v-if="currentStatus == 2">
      <b-alert show variant="success"><h1>You have a {{ learningStyleList[currentLStyle] }} learning style</h1></b-alert>
      <b-card
        title="Enter Your E-mail"
        class= "card-shadow"
        >
        <div class="ml-4">
          <b-form-input type="email" v-model="email" :state="!$v.email.$error"></b-form-input>
          <div class="invalid-feedback" v-if="$v.email.$error">
            <span v-if="$v.email.required">The email field is required.</span>
            <span v-if="$v.email.email">Please enter valid email address.</span>
          </div>
        </div>
      </b-card>
    </div>
    <div class="col-xl-9 mx-auto my-4" v-if="currentStatus == 4">
      <b-alert show variant="success" class="p-4">
        <font-awesome-icon :icon="['far','check-circle']" style="font-size:5rem" />
        <h1>Thank you!</h1>
      </b-alert>
      <b-form-group>
        <button class="btn btn-primary mr-2"> Enrol </button>
        <button class="btn btn-success mr-2"> More Info </button>
        <button class="btn btn-secondary mr-2"> Not For Me </button>
      </b-form-group>
    </div>
    <div v-if="currentStatus == 0 || currentStatus == 3">
      <button v-if="currentIndex > 0 && currentIndex!=5" class="btn btn-primary mr-2" @click="prevItem">
        <font-awesome-icon icon="fast-backward"/>
        Prev
      </button> 
      <button v-if="currentIndex < 8" class="btn btn-primary" @click="nextItem">
        Next
        <font-awesome-icon icon="fast-forward" v-if="currentIndex!= 4 && currentIndex!= 7"/>
      </button>
      <a v-if="currentStatus == 0 && currentIndex == 2" class="float-right" href="/files/Kirana Study timetable TEMPLATE.docx">Study Timetable Template</a>  
    </div>
    <div v-else>
      <button v-if="currentStatus<4" class="btn btn-primary" @click="nextItem">Next</button>
    </div>
    
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import RadialProgressBar from 'vue-radial-progress'
import jQuery from 'jquery'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'home',
  components: {
    RadialProgressBar
  },
  computed: {
    ...mapState({
      videoData: state => state.video.data,
      quizData: state => state.quiz.data
    })
  },
  data() {
    return {
      currentIndex: 0,
      currentStatus: 0,
      currentQuizIndex:0,
      learningStyleList: [
        'VISUAL',
        'AUDITORY',
        'KINAESTHETIC'
      ],
      currentLStyle: '',
      email:'',
    }
  },
  validations: {
    email: { required, email }
  },
  created() {
    this.$store.dispatch('getVideoData')
    this.$store.dispatch('getQuizData')
  },
  methods: {
    nextItem() {
      if( this.currentStatus == 0 ){
        this.currentIndex++
        if( this.currentIndex == 5){ 
          this.currentStatus = 1
          this.currentQuizIndex = 0
        }
      } else if (this.currentStatus == 1) {
        
        if (this.currentQuizIndex == this.quizData.length-1) {
          console.log(this.quizData)
          let cntFirst = this.quizData.filter( item => item.selected === 0).length
          let cntSecond = this.quizData.filter( item => item.selected === 1).length
          let cntThird = this.quizData.filter( item => item.selected === 2).length
          this.currentLStyle = (cntFirst > cntSecond ) ? ( cntFirst > cntThird  ? 0 : 1 ) : ( cntSecond > cntThird ? 1 : 2)
          this.currentStatus = 2
        } else {
          this.currentQuizIndex++
        }
      } else if (this.currentStatus == 2) {
        this.$v.$touch()
        if (!this.$v.email.$error) {
          this.currentStatus = 3
          this.saveEmail()
        }
      } else if (this.currentStatus == 3 ) {
        this.currentIndex++
        if (this.currentIndex == 8) {
          this.currentStatus = 4
        }
      }
    },
    prevItem() {
      this.currentIndex--;
    },
    saveEmail() {
      let script_url = "https://script.google.com/macros/s/AKfycbwsfF5P5vvicBhh_NpWGISVHVDCDgeUcBPS9JCyfM0jRiPRngiD/exec"
      let url = script_url+"?email="+this.email+"&action=insert"
      var request = jQuery.ajax({
          crossDomain: true,
          url: url ,
          method: "GET",
          dataType: "jsonp"
      })
    }
  },
}
</script>
