<template>
    <div>
        开发中，敬请期待！！
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$store.dispatch('changeHeadLine','项目')
    setTimeout(()=>{
      this.$router.replace('/')
    },500)
  }
} 
</script>