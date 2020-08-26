<template>
  <div>
    <certificatial-set/>
    <tab-change-tables/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CertificatialSet from '@/components/CertificatialSet.vue';
  import TabChangeTables from '@/views/CertManage/TabChangeTables.vue';

  @Component({
    components: {
      CertificatialSet,
      TabChangeTables
    }
  })

  export default class Cert extends Vue {
  }
</script>

<style scoped>
</style>
