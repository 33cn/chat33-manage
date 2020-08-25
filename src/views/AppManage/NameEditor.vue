<template>
  <div class="name_editor">
    <input v-if="isEdit"
           class="input_name"
           ref="input_dom"
           type="text"
           maxlength="10"
           @blur="handleBlur"
           @keyup.enter="$event.target.blur()">
    <template v-else>
      <span class="text_name">{{name}}</span>
      <i class="iconfont iconbianji icon_edit" @click="startEdit"></i>
    </template>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * 编辑广告名称
   * @author yuanzeyu
   * @date 2019-06-18
   * @desc
   */
  @Component
  export default class NameEditor extends Vue {
    @Prop() name!: string;

    public isEdit: boolean = false;

    public startEdit() {
      this.isEdit = true;
      this.$nextTick(() => {
        const dom = this.$refs.input_dom as HTMLInputElement;
        dom.value = this.name;
        dom.focus();
      });

    }

    public handleBlur(e: any) {
      this.isEdit = false;
      const newName = e.target.value;
      if (newName !== this.name) { // 有修改
        this.emitConfirm(newName);
      }
    }

    public emitConfirm(newName: string) {
      this.$emit('confirm', newName);
    }

  }
</script>

<style scoped>
  .name_editor {
    white-space: nowrap;
  }

  .text_name {
    line-height: 40px;
    color: var(--color-dark);
    font-size: 14px;
    font-weight: 500;
  }

  .icon_edit {
    margin-left: 4px;
    color: #B2BCC6;
    font-size: 12px;
  }

  .input_name {
    width: 100%;
    background: transparent;
    line-height: 40px;
    color: var(--color-dark);
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border: none;
    padding: 0;
    outline: none;
  }
</style>
