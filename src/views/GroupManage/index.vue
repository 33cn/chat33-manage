<template>
  <div>
    <div class="top_wrapper">
      <limit-set class="top-set"/>
      <group-count class="top-count"/>
    </div>
    <group-list class="l-margin"/>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import LimitSet from '@/views/GroupManage/LimitSet.vue';
  import GroupCount from '@/views/GroupManage/GroupCount.vue';
  import GroupList from '@/views/GroupManage/GroupList.vue';

  /**
   * 群聊设置
   * @author yuanzeyu
   * @date 2019-04-18
   */
  @Component({
    components: {
      LimitSet,
      GroupCount,
      GroupList,
    },
  })
  export default class GroupManage extends Vue {
  }
</script>

<style scoped>
  .top_wrapper {
    display: flex;
  }

  .top-set {
    flex: 1;
  }

  .top-count {
    margin-left: 20px;
    width: 330px;
  }

  .l-margin {
    margin-top: 20px;
  }
</style>
