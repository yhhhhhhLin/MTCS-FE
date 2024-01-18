<template>
  <div class="page-container" :style="{ gridTemplateColumns: gridCols }">

    <a-layout-header class="a-fixed-header">
      <div class="header-content">
        <a-space class="headerLogo">
          <img class="logo" src="../assets/logo.png" alt="logo">
        </a-space>

        <a-space class="headerBox" v-if="userinfoStore.user.id">
          <div class="avatarBox">
            <a-dropdown trigger="hover">
              <a-avatar :size="32">
                <img alt="avatar" v-bind:src="userinfoStore.user.userAvatar"/>
              </a-avatar>
              <template #content>
                <a-doption @click="Message.info('暂未实现')">个人中心</a-doption>
                <a-doption @click="Message.info('暂未实现')">获取sdk</a-doption>
                <a-divider margin="0"/>
                <a-doption @click="logoutHandler">退出登录</a-doption>
              </template>
            </a-dropdown>
          </div>

          <a-badge :count="userinfoStore.user.unReadMsgCount" dot :offset="[-12, 4]">
            <a-button type="text" style="color: #1a1a1a" @click="Message.info('暂未实现')">
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
<!--      <div class="navbar-div">-->
<!--        <a-divider margin="0" direction="vertical"></a-divider>-->
<!--      </div>-->
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
import router, {routerWhitelist} from "../router";

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
    userinfoStore.storeGetUserInfo()
  }else{
    Message.info('请先登录')
  }

})


const props = defineProps({
  navbarDefault: String
})

function logoutHandler() {
  localStorage.removeItem('token')
  token.value = ''
  // 判断当前页面，如果不是白名单页面，那么就跳转到登录页面
  if (!routerWhitelist.includes(router.currentRoute.value.path)) {
    Message.error('请先登录')
    router.push('/login')
  }

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

  position: sticky;
  top:0;
  z-index: 1000;
  opacity: 1;
  background-color: #ffffff;
  grid-area: header;
}

.page-navbar {
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 17%;
  height: 92.3%;
  margin-top: 55px;
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
