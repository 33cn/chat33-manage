<template>
  <div class="source_upload">
    <img v-if="fileUrl" class="img_selected" :src="fileUrl" alt="已上传图片">
    <div v-else class="empty_box l-absolute" @click="showFileInput">
      <div class="l-empty_box-text" style="margin-bottom: 10px">点击上传</div>
      <div>375*812</div>
      <div>750*1624</div>
      <div>1125*2436的jpg</div>
      <div style="margin-top: 10px">限300K</div>
    </div>
    <div v-if="fileUrl" class="replace_mask l-absolute" @click="showFileInput">
      <i class="iconfont iconshangchuan replace_mask-icon"></i>
    </div>
    <input ref="input_dom" type="file" accept=".jpg" @change="onFileChange" hidden>
    <div v-if="isPopShow" class="pop_tip">图片尺寸/格式不对，需上传尺寸为375*812、750*1624、1125*2436的jpg，图片大小限300K</div>
  </div>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * 图片/视频添加组件
   * @author yuanzeyu
   * @date 2019-06-13
   * @desc
   */
  @Component
  export default class SourceUpload extends Vue {
    @Prop() public value!: File | null;

    public fileUrl: string = '';
    public isPopShow: boolean = false;

    public showFileInput() {
      (this.$refs.input_dom as any).click();
    }

    public async onFileChange(e: any) {
      const file = e.target.files[0];
      if (file) {
        try {
          // 读取dataUrl
          const dataUrl = await this.getFileUrl(file);
          // 检查文件大小
          await this.checkFileLimit(file);
          // 检测图片尺寸
          await this.checkImageLimit(dataUrl);
          this.fileUrl = dataUrl;
          this.$emit('input', file);
        } catch (e) {
          if (e === 'limit') {
            this.showPop();
          } else {
            this.$chatNotify.fail('文件读取异常');
          }
        }
      }
    }

    public checkFileLimit(file: File) {
      return new Promise((resolve, reject) => {
        const SIZE_LIMIT = 300 * 1024;
        if (file.size > SIZE_LIMIT) {
          reject('limit');
        }
        resolve();
      });
    }

    /**
     * 获取图片的尺寸
     */
    public checkImageLimit(url: string) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          // 375*812、750*1624、1125*2436
          const width = img.width;
          const height = img.height;
          if ((width === 375 && height === 812) || (width === 750 && height === 1624) || (width === 1125 && height === 2436)) {
            resolve();
          } else {
            reject('limit');
          }
        };
        img.onerror = () => {
          reject();
        };
        img.src = url;
      });
    }

    public showPop() {
      this.isPopShow = true;
      setTimeout(() => {
        this.isPopShow = false;
      }, 3000);
    }

    public getFileUrl(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const fs = new FileReader();
        fs.onload = (e: any) => {
          resolve(e.target.result);
        };
        fs.onerror = () => {
          reject();
        };
        fs.readAsDataURL(file);
      });
    }
  }
</script>

<style scoped>
  .source_upload {
    position: relative;
    width: 150px;
    height: 325px;

    &:hover {
      & > .replace_mask {
        display: initial;
      }
    }
  }

  .l-absolute {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .img_selected {
    width: 100%;
    height: 100%;
  }

  .empty_box {
    height: 100%;
    color: var(--color-light);
    background: var(--background);
    text-align: center;
    line-height: 20px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
  }

  .l-empty_box-text {
    padding-top: 112px; /* 117 - 5 */
  }

  .replace_mask {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    line-height: 325px;
    text-align: center;
    background: rgba(36, 55, 78, .8);
  }

  .replace_mask-icon {
    font-size: 19px;
    color: #fff;
  }

  .pop_tip {
    z-index: 9999;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -41px;
    margin-left: -150px;
    padding: 20px;
    width: 261px;
    height: 66px;
    border-radius: 8px;
    background: #262B31;
    font-size: 16px;
    color: #fff;
    line-height: 22px;
    font-weight: bold;
    text-align: center;
  }
</style>
