<template>
  <div>
    <user-count></user-count>
    <user-list class="l-margin"></user-list>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import UserCount from '@/views/UserManage/UserCount.vue';
  import UserList from '@/views/UserManage/UserList.vue';

  /**
   * @name 用户管理页
   * @author yuanzeyu
   * @date 2019-04-17
   */
  @Component({
    components: {
      UserCount,
      UserList,
    }
  })
  export default class UserManage extends Vue {
  }
</script>

<style scoped>
  .l-margin {
    margin-top: 20px;
  }
</style>
