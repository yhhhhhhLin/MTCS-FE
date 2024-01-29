<template>
  <Container :navbarDefault="'/user/updateInfo'">
    <template #content>
      <div class="user-update-info-page">
        <a-card>
          <div class="name-and-avatar">
            <div class="avatar">
              <a-avatar
                  :image-url="userInfoStore.user.avaData"
                  :trigger-icon-style="{ color: '#3491FA' }"
                  :auto-fix-font-size="false"
                  :size="84"
                  @click="handlerUpdateAvatar"
                  :style="{ backgroundColor: '#168CFF' }"
              >
                名字
                <template #trigger-icon>
                  <IconCamera/>
                </template>
              </a-avatar>
            </div>
            <div class="name-and-other">
              <div class="name-and-gen">
                <div class="name">{{ userInfoStore.user.userName }}</div>
                <div class="gender">
                  <icon-man style="color:#747bff;" v-if="userInfoStore.user.gender === 0"/>
                  <icon-woman style="color: pink" v-if="userInfoStore.user.gender === 1"/>
                </div>
              </div>
            </div>
          </div>
        </a-card>


        <div class="other-update-info">
          <a-card>
            <div class="user-info-title">基本信息</div>
            <a-divider></a-divider>
            <div class="user-info">
              <div class="info-item">
                <div class="info-item-key">用户名字：</div>
                <div class="info-item-blank"></div>
                <div class="info-item-value">{{ userInfoStore.user.userName }}</div>
                <div class="info-item-opt" @click="handlerUpdateUserName">
                  <icon-edit />修改
                </div>
              </div>
              <div class="info-item">
                <div class="info-item-key">用户账号：</div>
                <div class="info-item-blank"></div>
                <div class="info-item-value" >{{ userInfoStore.user.userAccount }}</div>
              </div>
              <div class="info-item">
                <div class="info-item-key">性别：</div>
                <div class="info-item-blank"></div>
                <div class="info-item-value">{{ userInfoStore.user.gender }}</div>
                <div class="info-item-opt" @click="handlerUpdateUserGender">
                  <icon-edit />修改
                </div>
              </div>
              <div class="info-item">
                <div class="info-item-key">accessKey：</div>
                <div class="info-item-blank"></div>
                <div class="info-item-value">{{ userInfoStore.user.accessKey }}</div>
                <a-popconfirm content="是否要刷新AccessKey和SecretKey?" @ok="handlerRefreshUserAccessKeyAndSecretKey">
                  <div class="info-item-opt" @click="()=>{}">
                    <icon-refresh /> 刷新
                  </div>
                </a-popconfirm>
              </div>
              <div class="info-item">
                <div class="info-item-key">secretKey：</div>
                <div class="info-item-blank"></div>
                <div class="info-item-value">{{ userInfoStore.user.secretKey }}</div>
                <a-popconfirm content="是否要刷新AccessKey和SecretKey?" @ok="handlerRefreshUserAccessKeyAndSecretKey">
                  <div class="info-item-opt" @click="()=>{}">
                    <icon-refresh /> 刷新
                  </div>
                </a-popconfirm>
              </div>
            </div>
          </a-card>

        </div>
      </div>


    </template>
  </Container>
  <input
      class="input-avatar"
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileChange"
  />

</template>
<script setup lang="ts">

import Container from "../../components/Container.vue";
import {onMounted, reactive, ref} from "vue";
import {refreshAkSk, updateAvatar} from "../../services/user";
import {useUserInfoStore} from "../../store/userInfo.ts";
import {Message} from "@arco-design/web-vue";

const userInfoStore = useUserInfoStore()
const userInfo = reactive<API.UserInfo>({});


onMounted(()=>{
  userInfo.userName = userInfoStore.user.userName
  userInfo.userAccount = userInfoStore.user.userAccount
  userInfo.gender = userInfoStore.user.gender
  userInfo.accessKey = userInfoStore.user.accessKey
  userInfo.secretKey = userInfoStore.user.secretKey
})

function handlerUpdateAvatar() {
  var inputAvatar = document.getElementsByClassName("input-avatar");
  // 点击
  inputAvatar[0].click();
}

function handleFileChange(event) {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    updateAvatar(formData);
    console.log(formData);
  }
}

function handlerUpdateUserName(){
  Message.info('修改名字（暂未实现）')
}

function handlerUpdateUserGender(){
  Message.info('修改性别（暂未实现）')
}

function handlerRefreshUserAccessKeyAndSecretKey(){
  refreshAkSk().then((resp)=>{
    if (!resp.code) {
      userInfoStore.updateUserInfo()
      Message.success('刷新accessKey和secretKey成功')
    }else{
      Message.error(resp.message)
    }
  }).catch((resp)=>{
    Message.error('刷新accessKey和secretKey出错')
    console.log(resp)
  })
}

</script>

<style scoped>

.user-update-info-page {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .name-and-avatar {
    display: flex;
    gap: 40px;
  }

  .name-and-other {
    display: flex;
    flex-direction: column;
  }
}

.name {
  font-size: 22px;
}

.name-and-gen {
  display: flex;
  gap: 10px;
  margin-top: 4px;
  align-items: center;
}

.user-info {
  margin-top: 35px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  gap: 60px;
}

.user-info-title {
  font-size: 18px;
  font-weight: bold;
}

.arco-divider-horizontal {
  margin-top: 10px;
}

.info-item {
  display: flex;
  gap: 20px;
}


.info-item-key {
  font-size: 16px;
}


.info-item-opt {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  color: #409EFF;
  cursor: pointer;
  font-family: SimSun;
}


.info-item:hover .info-item-opt {
  opacity: 1;
  visibility: visible;
}


</style>