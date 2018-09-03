<template>
  <div class="app-wapper">
    <Spin size="large" fix v-if="loading" class="app-loading"></Spin>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      loading: true
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取管理员信息
    getUserInfo(){
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="scss">
.app-wapper {
  width: 100%;
  height: 100%;
  position: relative;
  .app-loading {
    z-index: 999999;
    background-color: white;
    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }
  }
}
</style>
