<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components:{

  },
  methods:{
  },
  computed:mapState(['progress']),

  mounted(){
  }
}
</script>

<style>
  #app{
    height: 100%;
  }
</style>
