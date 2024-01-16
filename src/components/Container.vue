<template>
  <div class="page-container" :style="{ gridTemplateColumns: gridCols }">

    <a-layout-header>
      <div class="header-content">
        <a-space class="headerLogo">
          <img class="logo" src="../assets/logo.png" alt="logo">
        </a-space>

        <a-space class="headerBox" v-if="token">
          <div class="avatarBox">
            <a-dropdown trigger="hover">
              <a-avatar :size="32">
                <img alt="avatar" v-bind:src="userinfoStore.user.userAvatar"/>
              </a-avatar>
              <template #content>
                <a-doption>个人中心</a-doption>
                <a-doption>获取sdk</a-doption>
                <a-divider margin="0"/>
                <a-doption @click="logoutHandler">退出登录</a-doption>
              </template>
            </a-dropdown>
          </div>

          <a-badge :count="userinfoStore.user.unReadMsgCount" dot :offset="[-12, 4]">
            <a-button type="text" style="color: #1a1a1a">
              <template #icon>
                <icon-message/>
              </template>
              消息中心
            </a-button>
          </a-badge>
        </a-space>
        <a-space class="headerBox" v-else>
          <a-button type="text" style="color: #1a1a1a" @click="router.push('/login')">登录</a-button>
        </a-space>
      </div>
      <div class="header-div">
        <a-divider margin="0"/>
      </div>
    </a-layout-header>

    <div class="page-navbar">
      <div class="navbar-content">
        <Navbar :onCollapse="containerOnCollapse" :default="props.navbarDefault"></Navbar>
      </div>
      <div class="navbar-div">
        <a-divider margin="0" direction="vertical"></a-divider>
      </div>
    </div>

    <a-layout-content>
      <slot name="content"></slot>
    </a-layout-content>

  </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue";
import {onMounted, ref} from "vue";
import {useUserInfoStore} from "../store/userInfo.ts";
import {getUserInfo} from "../services/user";
import {Message} from "@arco-design/web-vue";
import router from "../router";

const userinfoStore = useUserInfoStore()
const isLogin = ref(false)
const token = ref(localStorage.getItem('token'))


onMounted(() => {
  const userStore = userinfoStore.user;
  if (userinfoStore.user.id) {
    isLogin.value = true
    return
  }

  // 如果没有登录,那么获取token,然后获取用户信息
  if (token.value) {
    console.log('token存在')
    getUserInfo()
        .then((res) => {
          if (!res.code) {
            const userInfo = res.data
            userStore.id = userInfo.id
            userStore.userName = userInfo.userName
            userStore.userAccount = userInfo.userAccount
            userStore.userAvatar = userInfo.userAvatar
            userStore.userRole = userInfo.userRole
            userStore.gender = userInfo.gender
            userStore.accessKey = userInfo.accessKey
            userStore.secretKey = userInfo.secretKey
            // TODO 设置实际未读消息数量
            userStore.unReadMsgCount = 9
          } else {
            Message.error(res.message)
          }
        })
  }
})


const props = defineProps({
  navbarDefault: String
})

function logoutHandler() {
  localStorage.removeItem('token')
  token.value = ''

}


const containerOnCollapse = (val, type) => {
  if (gridCols.value === '17% 1fr') {
    gridCols.value = '5% 1fr';
  } else {
    gridCols.value = '17% 1fr';
  }
};

const gridCols = ref('17% 1fr');


</script>

<style scoped>
.page-container {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-areas: "header header header" "sidebar content content";
  grid-template-rows: 8% 1fr;
}

.logo{
  width: 43%;
  height: 43%;
}


.arco-divider-vertical {
  min-height: 100%;
}

.header-content {

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px 0 30px;
  height: 99%;
}

.arco-layout-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  grid-area: header;
}


.page-navbar {
  display: flex;
  justify-content: space-between;
}

.navbar-content {
  grid-area: sidebar;
  width: 99%;
}


.arco-layout-content {
  background-color: #f5f5f5;
  grid-area: content;
  padding: 30px 30px 0 30px;
}

.arco-btn-size-medium {
  border-radius: 5px;
}

.headerBox {
  display: flex;
  gap: 15px;
}
</style>
