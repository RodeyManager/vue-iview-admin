<template>
  <menu-list :menu-list="$store.state.menuList"></menu-list>
</template>

<script>

import Service from '@/service';
import { mapMutations, mapActions } from 'vuex';
import MenuList from '@/components/menu';
import { permissionAction, sortMenuList, findTabByName, getRouteByURL, urlToPath } from '@/utils';
import { importCMP } from '@/router';


export default {
  components: { MenuList },
  created() {
    this.getMenuList();
  },
  methods: {
    ...mapMutations(['ADD_TAB', 'UPDATE_MENU_LIST']),
    ...mapActions(['navigateToRoute']),
    getMenuList(){
      Service.sys.menu.list({}).then(({data})=>{
        if(data && data.code === 1000){
          const { menus, permissions } = data.data;
          menus = sortMenuList(menus);
          // 菜单列表
          this.UPDATE_MENU_LIST(menus);
          permissionAction(permissions);
          // 加载菜单后定位路由及处理tab
          this.initGotoPath(menus);
        }else{
          this.UPDATE_MENU_LIST([]);
          permissionAction([]);
        }
      });
    },
    initGotoPath(menus){
      const { name, path } = this.$route;
      const tab = findTabByName(name, menus);

      if(tab){
        this.ADD_TAB(tab);
        this.navigateToRoute({ url: tab.url, route: this.$route });
      }else{
        this.navigateToRoute({ route: this.$route });
      }
    },
  }
}
</script>


