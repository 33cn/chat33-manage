<template>
  <div class="time_selector" @click="showMenu">
    <span>{{value}}秒</span>
    <i class="iconfont iconfanhui-copy-copy-copy-copy-copy-copy-copy icon_nav" :class="{'icon_nav_rotate':isMenuShow}"></i>
    <select-col v-if="isMenuShow"
                class="l-menu"
                :options="options"
                :selected="value"
                @select="emitChange"
                @click.native.stop
                @mousedown.native.stop>
    </select-col>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import SelectCol from '@/components/SelectCol.vue';
  import {OptionItem} from '@/typings/local';

  /**
   * 时间输入框
   * @author yuanzeyu
   * @date 2019-06-13
   * @desc
   */
  @Component({
    components: {
      SelectCol,
    },
  })
  export default class TimeSelector extends Vue {
    @Prop() public value!: number;

    public isMenuShow: boolean = false;
    public options: OptionItem[] = [
      {
        id: '1',
        label: '1秒',
        value: 1,
      },
      {
        id: '2',
        label: '2秒',
        value: 2,
      },
      {
        id: '3',
        label: '3秒',
        value: 3,
      },
      {
        id: '4',
        label: '4秒',
        value: 4,
      },
      {
        id: '5',
        label: '5秒',
        value: 5,
      },
      {
        id: '6',
        label: '6秒',
        value: 6,
      },
    ];

    public emitChange(val: number) {
      this.$emit('input', val);
      this.onMenuHind();
    }

    public showMenu() {
      this.isMenuShow = true;
      document.addEventListener('mousedown', this.onMenuHind);
    }

    public onMenuHind() {
      this.isMenuShow = false;
      document.removeEventListener('mousedown', this.onMenuHind);
    }

  }
</script>

<style scoped>
  .time_selector {
    position: relative;
    width: 129px; /* 150 - 21 */
    padding-left: 21px;
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    background: var(--background);
    font-size: 14px;
  }

  .icon_nav {
    float: right;
    margin-right: 19px;
    display: inline-block;
    font-size: 12px;
    transform: scale(.83);
    color: var(--color-light);
  }

  .icon_nav_rotate {
    transform: scale(.83) rotate(180deg);
  }

  .l-menu {
    position: absolute;
    top: 45px;
    left: 0;
  }
</style>
