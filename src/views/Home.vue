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
export default {
  name: 'home',
  components: {
    RadialProgressBar
  },
  data() {
    return {
      videoData: [
        {
          url: 'https://dl.dropboxusercontent.com/s/jykk4pgh20j8zye/Kirana%20v1.mp4?dl=0'
        },
        {
          url: 'https://dl.dropboxusercontent.com/s/m99g3m0niwewc1c/Kirana%20v2.mp4?dl=0'
        },
        {
          url: 'https://dl.dropboxusercontent.com/s/fdgv479k33te2wp/Kirana%20v3.mp4?dl=0'
        },
        {
          url: 'https://dl.dropboxusercontent.com/s/id97h6h53eqx0p6/Kirana%20v4.mp4V2.mp4?dl=0'
        },
        {
          url: 'https://dl.dropboxusercontent.com/s/0f60jhlshrcuyz4/Kirana%20v5.mp4?dl=0'
        },
        {
          url: 'https://dl.dropboxusercontent.com/s/i41u25gmtwo706a/Kirana%20v6.mp4?dl=0'
        },
        {
          url: 'https://dl.dropboxusercontent.com/s/2tbmt8djd39g6r3/Kirana%20v7.mp4?dl=0'
        },
        {
          url: 'https://dl.dropboxusercontent.com/s/1grlk9dtxopzchw/Kirana%20v8.mp4?dl=0'
        }
      ],
      currentIndex: 0,
      quizData:[
        {
          question: 'When I operate new equipment I generally:',
          answers: [
            'read the instructions first',
            'listen to an explanation from someone who has used it before',
            'go ahead and have a go, I can figure it out as I use it'
          ]
        },
        {
          question: 'When I need directions for traveling I usually:',
          answers: [
            'look at a map',
            'ask for spoken directions',
            'follow my nose and maybe use a compass'
          ]
        },
        {
          question: 'When I cook a new dish, I like to:',
          answers: [
            'follow a written recipe',
            'call a friend for an explanation',
            'follow my instincts, testing as I cook'
          ]
        },
        {
          question: 'If I am teaching someone something new, I tend to:',
          answers: [
            'write instructions down for them',
            'give a verbal explanation',
            'demonstrate first and then let them have a go'
          ]
        },
        {
          question: 'I tend to say:',
          answers: [
            'watch how I do it',
            'listen to me explain',
            'you have a go'
          ]
        },
        {
          question: 'During my free time I most enjoy:',
          answers: [
            'going to museums and galleries',
            'listening to music and talking to my friends',
            'playing sport or doing DIY'
          ]
        },
        {
          question: 'When I go shopping for clothes, I tend to:',
          answers: [
            'imagine what they would look like on',
            'discuss them with the shop staff',
            'try them on and test them out'
          ]
        },
        {
          question: 'When I am choosing a holiday I usually:',
          answers: [
            'read lots of brochures',
            'listen to recommendations from friends',
            'imagine what it would be like to be there'
          ]
        },
        {
          question: 'If I was buying a new car, I would:',
          answers: [
            'read reviews in newspapers and magazines',
            'discuss what I need with my friends',
            'test-drive lots of different types'
          ]
        },
        {
          question: 'When I am learning a new skill, I am most comfortable:',
          answers: [
            'watching what the teacher is doing',
            'talking through with the teacher exactly what I am supposed to do',
            'give it a try myself and work it out as I go'
          ]
        },
        {
          question: 'If I am choosing food off a menu, I tend to:',
          answers: [
            'imagine what the food will look like',
            'talk through the options in my head or with my partner',
            'imagine what the food will taste like'
          ]
        },
        {
          question: 'When I listen to a band, I can’t help:',
          answers: [
            'watching the band members and other people in the audience',
            'listening to the lyrics and the beats',
            'moving in time with the music'
          ]
        },
        {
          question: 'When I concentrate, I most often:',
          answers: [
            'focus on the words or pictures in front of me',
            'discuss the problem and the possible solutions in my head',
            'move around a lot, fiddle with pens and pencils and touch things'
          ]
        },
        {
          question: 'I choose household furnishing because I like:',
          answers: [
            'their colours and how they look',
            'the descriptions the sales-people give me',
            'the textures and what it feels like to touch them'
          ]
        },
        { 
          question: 'My first memory is of:',
          answers: [
            'looking at something',
            'being spoken to',
            'doing something'
          ]
        },
        { 
          question: 'When I am anxious, I:',
          answers: [
            'visualise the worst-case scenarios',
            'talk over in my head what worries me most',
            'can’t sit still, fiddle and move around constantly'
          ]
        },
        {
          question: 'I feel especially connected to other people because of:',
          answers: [
            'how they look',
            'what they say to me',
            'how they make me feel'
          ]
        },
        {
          question: 'When I have to revise for an exam, I generally:',
          answers: [
            'write lots of revision notes and diagrams',
            'talk over my notes, alone or with other people',
            'imagine making the movement or creating the formula'
          ]
        },
        {
          question: 'If I am explaining to someone I tend to:',
          answers: [
            'show them what I mean',
            'explain to them in different ways until they understand',
            'encourage them to try and talk them through my ideas as they do it'
          ]
        },
        {
          question: 'I really love:',
          answers: [
            'watching films, photography, looking at art or people watching',
            'listening to music, the radio or talking to friends',
            'taking part in sporting activities, eating fine foods and wines and dancing'
          ]
        },
        {
          question: 'Most of my free time is spent:',
          answers: [
            'watching television',
            'talking to friends',
            'doing a physical activity or making things'
          ]
        },
        {
          question: 'When I first contact a new person, I usually:',
          answers: [
            'arrange a face to face meeting',
            'talk to them on the telephone',
            'try to get together while doing something else, such as an activity or a meal'
          ]
        },
        {
          question: 'I first notice how people:',
          answers: [
            'look and dress',
            'sound and speak',
            'stand and move'
          ]
        },
        {
          question: 'If I am angry, I tend to:',
          answers: [
            'keep replaying in my mind what it is that has upset me',
            'raise my voice and tell people how I feel',
            'stamp about, slam doors and physically demonstrate my anger'
          ]
        },
        {
          question: 'I find it easiest to remember:',
          answers: [
            'faces',
            'names',
            'things I have done'
          ]
        },
        {
          question: 'I think you can tell if someone is lying if:',
          answers: [
            'they avoid looking at you',
            'their voice changes',
            'they give me funny vibes'
          ]
        },
        {
          question: 'When I meet an old friend:',
          answers: [
            'I say “It’s great to see you!”',
            'I say “It’s great to hear from you!”',
            'I give them a hug or a handshake'
          ]
        },
        {
          question: 'I remember things best by:',
          answers: [
            'writing notes or keeping printed details',
            'saying them aloud or repeating words and key points in my head',
            'doing or practising the activity or imagining it being done'
          ]
        },
        {
          question: 'If I have to complain about faulty goods, I am most comfortable:',
          answers: [
            'writing a letter',
            'complaining over the phone',
            'taking them back to the store or posting them back to head office'
          ]
        },
        {
          question: 'I tend to say:',
          answers: [
            'I see what you mean',
            'I hear what you are saying',
            'I know how you feel'
          ]
        },
      ],
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
    }
  },
}
</script>
