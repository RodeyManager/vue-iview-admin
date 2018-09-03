<template>
  <i-row>
    <i-col span="24">
      <h1 style="margin:0 auto;">{{ $route.name | capFirst }} Page</h1>
      <p>{{ $route.path }}</p>
    </i-col>
  </i-row>
</template>

<script>
import Service from '@/service';

export default {
  data(){
    return {};
  },
  created() {
    Service.test.list({}).then(res => {
      console.log('Home Request: ', res);
    });
  },
  filters: {
    capFirst: function(str){
      const first = str[0].toUpperCase();
      return str = str.replace(/^\w{1}/, first);
    }
  }
};
</script>
