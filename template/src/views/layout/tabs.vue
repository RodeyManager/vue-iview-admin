<template>
  <div class="tab-bar-container" v-if="hasTab && tabCurrent && tabCurrent.name" :style="{ left: !siderSwitched ? '246px': '46px' }">
    <div class="tab-bar">
      <i-button class="scroll-l-btn" icon="ios-arrow-back" @click.stop="onScrollLeft()" v-if="showScrBtn"></i-button>
      <ul class="tab-items" :style="[tabStyle, { marginLeft: showScrBtn ? '32px': '0' }]">
        <li v-for="(tab) in tabList" :key="tab.id" class="tab-item" :class="{ active: tab.id === tabCurrent.id }" @click="onSelectTab(tab)">
          <menu-icon :icon="tab.icon" size="16" class="tab-icon"></menu-icon>
          <span>{{ tab.name }}</span>
          <i-icon type="ios-close" size="16" @click.stop="onCloseTab(tab)" />
        </li>
      </ul>
      <i-button class="scroll-r-btn" icon="ios-arrow-forward" @click.stop="onScrollRight()" v-if="showScrBtn"></i-button>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapActions, mapGetters } from 'vuex';
import MenuIcon from '@/components/menu/menu-icon.vue';
import { urlToPath } from '@/utils';

export default {
  components: { MenuIcon },
  data(){
    return {
      tabStyle: {
        transform: 'translate(0, 0)'
      },
      showScrBtn: false,
      barWidth: 0,
      tabContainer$: null,
      offset: 0,
      layoutLeft: 246
    }
  },
  created() {},
  mounted() {
    this.$nextTick(()=>{
      window.addEventListener('resize', this.init.bind(this), false);
    });
  },
  watch: {
    'tabList': function(){
      this.$nextTick(()=>{
        try{
          this.updateShowScrBtn();
        }catch(e){}
      });
    },
    'tabCurrent': function(){
      this.$nextTick(()=>{
        try{
          this.updataTabCurrentOffset();
        }catch(e){}
      });
    }
  },
  methods: {
    ...mapMutations(['ACTIVE_TAB', 'REMOVE_TAB']),
    ...mapActions(['navigateToRoute']),
    init(){
      if(this.$el && this.$el.nodeType !== 8){
        this.updateShowScrBtn();
        this.updataTabCurrentOffset();
      }
    },
    onSelectTab(tab){
      this.ACTIVE_TAB(tab);
      this.navigateToRoute({ url: tab.url, route: this.$route });
    },
    onCloseTab(tab){
      tab && this.REMOVE_TAB(tab);

      if(this.tabCurrent){
        this.navigateToRoute({ url: this.tabCurrent.url, route: this.$route });
      }else{
        this.navigateToRoute({ route: this.$route });
      }
    },
    onScrollLeft(){
      this.tabStyle.transform = `translate(0, 0)`;
    },
    onScrollRight(){
      if(this.offset > 0){
        this.tabStyle.transform = `translate(${-(this.offset + 64)}px, 0)`;
      }
    },
    updateShowScrBtn(){
      this.tabContainer$ = this.$el.querySelector('.tab-items');
      this.barWidth = this.$el.getBoundingClientRect().width;
      const tabWidth = this.tabContainer$.getBoundingClientRect().width;
      this.offset = tabWidth - this.barWidth;
      this.showScrBtn = this.offset > 0;
    },
    updataTabCurrentOffset(){
      const activeBound = this.tabContainer$.querySelector('.active').getBoundingClientRect();
      if(this.offset > 0){
        const currentIndex = this.tabList.indexOf(this.tabCurrent);
        let offset = 0;
        const tabs = [].slice.call(this.$el.querySelectorAll('.tab-item'));
        (tabs || []).forEach((tab, i) => {
          if(i <= currentIndex){
            const { width } = tab.getBoundingClientRect();
            offset += width - 1;
          }
        });
        offset = offset - this.barWidth + 64;
        if(offset <= 0){
          offset = 0;
        }
        this.tabStyle.transform = `translate(${-(offset > 0 ? offset : 0)}px, 0)`;
      }else{
        this.tabStyle.transform = `translate(0, 0)`;
      }
    },

  },
  computed: {
    ...mapGetters(['tabCurrent', 'tabList', 'hasTab', 'siderSwitched'])
  }
}
</script>

<style lang="scss" scoped>
.tab-bar-container {
  position: fixed;
  left: 246px;
  top: 60px;
  right: 0;
  background-color: white;
  z-index: 100;
  transition: all 0.2s ease;
  .tab-bar {
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px rgb(216, 216, 216);
    position: relative;
    .tab-items {
      position: relative;
      display: block;
      // display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      height: 100%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform: translate(0, 0);
      overflow: visible;
      white-space: nowrap;
      float: left;
      .tab-item {
        display: inline-block;
        padding: 0 36px;
        color: #666666;
        text-align: center;
        border-right: solid 1px rgb(216, 216, 216);
        border-left: solid 1px rgba(216, 216, 216, 0);
        margin-left: -1px;
        cursor: pointer;
        overflow: visible;
        white-space: nowrap;
        position: relative;
        box-sizing: border-box;
        * {
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        &:first-child {
          border-left: none;
        }

        .tab-icon,
        .ivu-icon-ios-close {
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
        }
        .tab-icon {
          left: 10px;
        }
        .ivu-icon-ios-close {
          right: 10px;
        }
        &:hover {
          color: #000000;
          .ivu-icon-ios-close {
            background-color: #f0f0f0;
            border-radius: 50%;
            font-weight: bold;
            font-size: 18px;
          }
        }
        &.active {
          color: #00d7d5;
          .tab-icon {
            color: #00d7d5;
          }
        }
      }
    }
    .ivu-btn {
      display: block;
      height: 100%;
      border-radius: 0;
      border: none;
      font-size: 18px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      position: absolute;
      top: 0;
      z-index: 10;
      &:focus {
        box-shadow: none;
      }
      &.scroll-l-btn {
        left: 0;
        box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.1);
      }
      &.scroll-r-btn {
        right: 0;
        box-shadow: -1px 0 2px 1px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>

