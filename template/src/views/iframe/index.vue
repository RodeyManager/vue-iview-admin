<template>
  <div class="iframe-container">
    <iframe :src="iframeSrc" class="iframe-link" scrolling="auto" frameborder="0" scroll="auto"></iframe>
    <i-spin fix size="large" v-if="loading"></i-spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data(){
    return {
      loading: true
    };
  },
  watch: {
    '$store.state.iframeSrc': function(val, oldVal){
      if(val !== oldVal){
        this.loading = true;
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      const iframe = this.$el.querySelector('iframe');
      console.log(iframe);
      if(this.iframeSrc){
        iframe.addEventListener('load', this.loadHander, false);
        iframe.addEventListener('complete', this.loadHander, false);
        iframe.addEventListener('error', this.loadErrorHander, false);
      }
    });
  },
  methods: {
    loadHander(){
      this.loading = false;
    },
    loadErrorHander(){
      this.$Message.error('加载地址失败');
    }
  },
  computed: { ...mapGetters(['iframeSrc']) }
}
</script>

<style lang="scss" scoped>
.iframe-container {
  width: 100%;
  height: 100%;
  position: relative;
  .iframe-link {
    width: 100%;
    // height: 100vh;
    height: calc(100vh - 100px);
    border: none;
    outline: none;
  }
}
</style>

