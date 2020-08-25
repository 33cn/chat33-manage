<template>
  <div class="edit_app">
    <name-editor :name="name" @confirm="updateName"/>
    <source-upload class="l-margin" v-model="file"/>
    <h2 class="title">广告时间</h2>
    <time-selector class="l-margin" v-model="duration"/>
    <h2 class="title">广告链接</h2>
    <textarea class="input_link" v-model="link" placeholder="输入广告链接"></textarea>
    <button class="g-btn_primary btn_confirm" @click="handleConfirmAdd">确认添加</button>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Bool, ParamAddAd, ResUploadFile} from '@/typings/interfaces';
  import SourceUpload from '@/views/AppManage/SourceUpload.vue';
  import TimeSelector from '@/views/AppManage/TimeSelector.vue';
  import {Apis} from '@/config/Apis';
  import {formatDate} from '@/utils/tool';
  import NameEditor from '@/views/AppManage/NameEditor.vue';

  /**
   *
   * @author yuanzeyu
   * @date 2019-06-13
   * @desc
   */
  @Component({
    components: {
      SourceUpload,
      TimeSelector,
      NameEditor,
    },
  })
  export default class EditApp extends Vue {
    public name: string = '';
    public duration: number = 3;
    public link: string = '';
    public isActive: Bool = Bool.Yes;
    public file: File | null = null;

    public async handleConfirmAdd() {
      const url = await this.uploadFile();
      if (!url) {
        return;
      }
      const params: ParamAddAd = {
        name: this.name,
        url,
        duration: this.duration,
        link: this.link,
        isActive: this.isActive,
      };
      const res = await this.$post(Apis.ADD_AD, params);
      if (res) {
        this.$emit('afterSubmit');
      }
    }

    public async uploadFile(): Promise<string> {
      if (!this.file) {
        return '';
      }
      const param = new FormData();
      param.append('file', this.file);
      const res: ResUploadFile | null = await this.$post(Apis.UPLOAD_FILE, param, {
        'Content-Type': 'multipart/form-data',
      });
      if (res) {
        return res.url;
      }
      return '';
    }

    public updateName(newName: string) {
      this.name = newName;
    }

    public created() {
      this.name = formatDate(Date.now());
    }
  }
</script>

<style scoped>
  .edit_app {
    display: inline-block;
    width: 150px;
    font-size: 0;
  }

  .title {
    margin: 0;
    line-height: 40px;
    color: var(--color-dark);
    font-size: 14px;
  }

  .l-margin {
    margin-bottom: 10px;
  }

  .input_link {
    margin-bottom: 20px;
    padding: 10px 19px 10px 21px;
    box-sizing: border-box;
    width: 100%;
    height: 200px;
    border: none;
    background: var(--background);
    resize: none;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    font-family: inherit;

    &::placeholder {
      color: var(--color-light);
      font-weight: 500;
    }
  }

  .btn_confirm {
    display: block;
    width: 100%;
    height: 30px;
  }

</style>
