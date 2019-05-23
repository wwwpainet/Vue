<template>
 <div>
   <goods-item v-for="(item,index) in goodsList" :key="index" :product="item" @addCart="addCart"></goods-item>
   <div style="height: 49px;width: 100%;clear: both;"></div>
 </div>
</template>

<script>
import goodsItem from './goodsItem'
import goodsData from '../assets/js/goodsData'
 export default {
   data () {
     return {
       goodsList: []
     }
   },
   created(){
     this.goodsList = goodsData
   },
   components: {
     goodsItem
   },
   methods: {
     addCart(target) {
       this.$emit('addCart',target)
     }
   }
 }
</script>

<style lang="scss" scoped></style>
