<template>
  <i-layout style="height: 100%">
    <header-bar></header-bar>
    <i-layout>
      <i-sider hide-trigger :width="!siderSwitched ? 246 : 46" class="sider-container" :class="{ switched: siderSwitched }">
        <sider-bar></sider-bar>
      </i-sider>
      <i-content>
        <tabs-bar></tabs-bar>
        <div class="main-container" v-show="menuList" :style="{ paddingTop: tabCurrent && tabCurrent.name ? '40px' : '10px'}">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </i-content>
    </i-layout>
  </i-layout>
</template>

<script>

import { mapGetters } from 'vuex';
import HeaderBar from './header';
import SiderBar from './sider';
import TabsBar from './tabs';

export default {
  name: 'App',
  components: { HeaderBar, SiderBar, TabsBar },
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
  },
  computed: { ...mapGetters(['siderSwitched', 'menuList', 'tabCurrent']) }
};
</script>

<style scoped lang="scss">
.sider-container {
  background-color: #24292e;
  border-top: solid 1px #353c42;
  transition: all 0.2s ease;
}
.main-container {
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 40px 10px 10px 10px;
  // min-height: calc(100% - 60px);
  min-height: 100%;
}
</style>
