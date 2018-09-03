<template>
  <!-- 可以采用 https://fontawesome.com/v4.7.0/icons/ -->
  <icon v-if="icon.indexOf('fa fa-') >= 0" class="menu-icon" :class="icon"></icon>
  <i-icon v-else :type="icon" :size="size"></i-icon>
</template>

<script>
export default {
  name: 'menu-icon',
  props: ['icon', 'size']
}
</script>

<style lang="scss" scoped>
.menu-icon {
  &.fa {
    font-size: 14px;
  }
}
</style>


