<template>
  <div id="app">
    <header-bar></header-bar>
    <slider-view></slider-view>
    <router-view/>
  </div>
</template>
<script>
import HeaderBar from './components/HeaderBar.vue'
import SliderView from './components/SliderView.vue'
export default {
  components: {
    HeaderBar,
    SliderView
  }
}
</script>

