<template>
  <div class="login-form">
    <a-input placeholder="请输入账号" v-model="userLoginInfo.userAccount">
      <template #prefix>
        <icon-user/>
      </template>
    </a-input>
    <a-input-password placeholder="请输入密码" v-model="userLoginInfo.userPassword">
      <template #prefix>
        <icon-lock/>
      </template>
    </a-input-password>
    <div class="other-select">
      <a-checkbox v-model="userLoginInfo.autoLogin">自动登录</a-checkbox>
      <a href="#">忘记密码</a>
    </div>
    <a-button type="primary" @click="loginHandler">登录</a-button>
  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";
import {userLogin} from "../services/user";
import {Message} from "@arco-design/web-vue";
import {useRouter} from "vue-router";
import {useUserInfoStore} from "../store/userInfo.ts";

const router = useRouter()
const userinfoStore = useUserInfoStore()

const userLoginInfo: API.LoginUserInfo = reactive({
  userAccount: "",
  userPassword: "",
  autoLogin: false
})

function loginHandler() {

  userLogin(userLoginInfo)
      .then((res: API.BaseResponse<any>) => {
        if (!res.code) {
          localStorage.setItem('token', res.data)
          router.push('/')
          Message.success('登录成功')

        } else {
          Message.error(res.message)
        }
      })
      .catch(res => {
        Message.error('登录出现异常')
        console.log('出现错误了' + res)
      })
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 30px;


  .other-select {
    display: flex;
    justify-content: space-between;
  }
}

.arco-btn-size-medium {
  border-radius: 8px;
}

.arco-input-wrapper {
  border-radius: 8px;
}


</style>
