<template>
  <Container :navbarDefault="'/user/updateInfo'">
    <template #content>
      <div class="user-update-info-page">
        <div class="name-and-avatar">
          <div class="avatar">
            <a-avatar
                :image-url="avatarUrl"
                :trigger-icon-style="{ color: '#3491FA' }"
                :auto-fix-font-size="false"
                :size="84"
                @click="handlerUpdateAvatar"
                :style="{ backgroundColor: '#168CFF' }"
            >
              名字
              <template #trigger-icon>
                <IconCamera />
              </template>
            </a-avatar>
          </div>
          <div class="name">名字</div>
        </div>


          <div class="other-update-info">
            这里展示所有的信息，可以修改

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
import {Message} from "@arco-design/web-vue";
import {onMounted, ref} from "vue";
import {getUserAvatar, updateAvatar} from "../../services/user";
import {useUserInfoStore} from "../../store/userInfo.ts";

const userInfoStore = useUserInfoStore()

const avatarUrl = ref('')

onMounted(()=>{
  // const userAvatar = userInfoStore.user.userAvatar;
  // // 根据地址获取对应头像
  // if(userAvatar){
  //   console.log(userAvatar)
  //   // avatarUrl.value = userAvatar
  // }

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
</script>

<style scoped>

.user-update-info-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 15px;
  background-color: #FFFFFF;
  .name-and-avatar{
    display: flex;
    align-items: center;
    gap: 15px;
  }
}

</style>