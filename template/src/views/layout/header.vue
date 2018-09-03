<template>
  <i-header class="header" :class="{ switched: siderSwitched }">
    <a href="javascript:void(0)" class="logo-link">
      <img class="logo" src="~@/assets/images/logo.png" alt="gupack">
    </a>
    <i-icon class="sider-switch" :type="!siderSwitched ? 'md-more' : 'ios-keypad'" id="sider-switch" @click="onSwitchSider()"></i-icon>
    <div class="search">
      <!-- <i-input search placeholder="请输入关键字" /> -->
      <i-auto-complete icon="ios-search" v-model="search" @on-focus="onSearchInit" @on-change="onSearchSelect" placeholder="请输入关键字" width="200">
        <i-option v-for="menu in searchList" :key="menu.name" :value="menu.id">
          <menu-icon :icon="menu.icon" size="16"></menu-icon> {{ menu.name }}
        </i-option>
      </i-auto-complete>
    </div>
    <div class="user-info">
      <i-dropdown style="margin-left: 20px" @on-click="onLogout">
        <a href="javascript:void(0)">
          <i-avatar :src="avatar"></i-avatar>
          <span>Admin</span>
          <i-icon type="ios-arrow-down"></i-icon>
        </a>
        <i-dropdown-menu slot="list">
          <i-dropdown-item name="member">个人中心</i-dropdown-item>
          <i-dropdown-item name="logout">退出登录</i-dropdown-item>
        </i-dropdown-menu>
      </i-dropdown>
    </div>
  </i-header>
</template>

<script>

import { mapMutations, mapActions, mapGetters } from 'vuex';
import MenuIcon from '@/components/menu/menu-icon.vue';
import { findTabById, getMenuFilter } from '@/utils';
const avatar = require('@/assets/images/logo.png');

export default {
  components: { MenuIcon },
  data(){
    return {
      avatar,
      searchList: [],
      search: ''
    }
  },
  created() {

  },
  methods: {
    ...mapMutations(['SWITCH_SIDER']),
    ...mapActions(['tabAction', 'navigateToRoute']),
    onSwitchSider(){
      this.SWITCH_SIDER();
    },
    onSearchInit(){
      this.searchList = getMenuFilter(this.menuList);
    },
    onSearchSelect(id){
      const tab = findTabById(id, this.menuList);
      if(tab){
        this.search = tab.name;
        this.tabAction(tab);
        this.navigateToRoute({ url: tab.url, route: this.$route });
      }
    },
    onLogout(name){
      if(name === 'logout'){
        this.$Modal.confirm({
            title: '登出提示',
            content: '您确定要退出登录吗？',
            onOk: ()=>{
              this.$cookie.delete('token');
              this.$router.push({ name: 'login' });
            }
        });
      }
    }
  },
  computed: { ...mapGetters(['siderSwitched', 'menuList']) }
}
</script>


<style lang="scss" scoped>
.header {
  display: flex;
  padding: 0;
  margin: 0;
  background-color: #24292e;
  clear: both;
  position: relative;
  &::after {
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }
  .logo-link {
    display: block;
    width: 246px;
    height: 100%;
    text-align: center;
    position: relative;
    .logo {
      display: block;
      margin: 0 auto;
      width: 56px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.2s ease;
    }
  }
  .sider-switch {
    font-size: 20px;
    color: #6e9595;
    position: absolute;
    top: 50%;
    left: 220px;
    transform: translate(0, -40%);
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      color: #80c6c6;
    }
  }
  .search {
    position: absolute;
    left: 250px;
    top: 50%;
    transform: translate(0, -50%);
  }
  .user-info {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
    span {
      vertical-align: middle;
      color: azure;
      margin-right: 10px;
    }
    i {
      color: azure;
      font-size: 20px;
      vertical-align: middle;
    }
  }

  &.switched {
    .logo-link {
      width: 46px;
      .logo {
        width: 40px;
      }
    }
    .sider-switch {
      left: 60px;
    }
    .search {
      left: 90px;
    }
  }
}
</style>
<style>
.search .ivu-input-wrapper input.ivu-input {
  outline: none;
  box-shadow: none;
  display: inline-block;
  width: 200px;
  height: 30px;
  line-height: 30px;
  line-height: 30px;
  border: solid 1px #24292e;
  border-radius: none;
  background-color: #353f3f;
  transition: all 0.2s ease;
  color: #ffffffc7;
}
.search .ivu-input-wrapper input.ivu-input:focus,
.search .ivu-input-wrapper input.ivu-input:hover {
  width: 260px;
  border: solid 1px #80c6c6;
  outline: none;
  box-shadow: none;
  background-color: #000000;
}
.search .ivu-input-wrapper-small .ivu-input-icon {
  line-height: 30px;
}
.search .ivu-input-wrapper input.ivu-input::placeholder {
  color: #7c8793;
}
</style>


