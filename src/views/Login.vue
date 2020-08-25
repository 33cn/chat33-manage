<template>
  <div class="login">
    <div class="main_box l-main_box">
      <div class="main-banner_wrapper">
        <img src="../assets/img/banner.svg">
      </div>
      <div class="main-form_wrapper">
        <img class="main-form-logo" src="../assets/img/logo.svg" alt="logo">
        <h2 class="main-form-title">{{Platform.name}}后台</h2>
        <label-input class="main-form-input main-form-input_id"
                     v-model="userId"
                     label="账号"
                     placeholder="请输入账号"/>
        <br>
        <label-input class="main-form-input main-form-input_pass"
                     v-model="password"
                     label="密码"
                     placeholder="请输入密码"
                     @enter="login"
                     isPassword/>
        <br>
        <button class="g-btn_primary main-form-btn" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Platform} from '@/config/platform';
  import LabelInput from '@/components/LabelInput.vue';
  import {Apis} from '@/config/Apis';

  /**
   * @name 登录页
   * @author yuanzeyu
   * @date 2019-04-12
   */
  @Component({
    components: {
      LabelInput,
    },
  })
  export default class Login extends Vue {
    public userId: string = '';
    public password: string = '';
    public Platform = Platform;

    public async login() {
      const userId = this.userId;
      const data = await this.$post(Apis.MANAGER_LOGIN, {
        id: userId,
        password: this.password,
      });
      if (data) {
        sessionStorage.setItem('managerId', userId);
        this.$router.push('sum');
      }
    }
  }
</script>

<style scoped>
  .main_box {
    display: flex;
    height: 472px;
    width: 80%;
    max-width: 950px;
    background: #fff;
    font-size: 0;
  }

  .l-main_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .main-banner_wrapper {
    width: 350px;
  }

  .main-form_wrapper {
    flex: 1;
    text-align: center;
  }

  .main-form-logo {
    margin-top: 80px;
    width: 50px;
  }

  .main-form-title {
    margin: 10px 0 0 0;
    font-size: 30px;
    line-height: 42px;
    font-weight: bold;
    color: var(--theme-color);
  }

  .main-form-input {
    width: 300px;
  }

  .main-form-input_id {
    margin-top: 40px;
  }

  .main-form-input_pass {
    margin-top: 20px;
  }

  .main-form-btn {
    margin-top: 30px;
    width: 300px;
    height: 30px;
  }
</style>
