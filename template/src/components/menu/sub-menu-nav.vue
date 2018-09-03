<template>
  <i-submenu v-if="menu.children" :name="menu.id">
    <template slot="title">
      <menu-icon :icon="menu.icon"></menu-icon>
      {{ menu.name }}
    </template>
    <sub-menu-nav v-for="child in menu.children" :key="child.name" :menu="child">
    </sub-menu-nav>
  </i-submenu>
  <i-menu-item v-else :name="menu.id">
    <menu-icon :icon="menu.icon"></menu-icon> {{ menu.name }}
  </i-menu-item>
</template>

<script>

import SubMenuNav from './sub-menu-nav.vue';
import MenuIcon from './menu-icon.vue';

export default {
  name: 'sub-menu-nav',
  props: {
    menu: Object,
    switched: Boolean
  },
  components: { SubMenuNav, MenuIcon },
}
</script>

