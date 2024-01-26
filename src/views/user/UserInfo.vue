<template>
  <Container :navbarDefault="'/user'">
    <template #content>
      <div class="user-profile-page">
        <div class="user-profile-header">
          <a-card>
            <div class="profile-header-card">
              <div class="profile-header-avatar">
                <a-avatar :size="84" :image-url="userProfile.userAvatar">Arco</a-avatar>

              </div>
              <div class="profile-header-other">
                <div class="profile-header-title">
                  <div class="name-gender">
                    <div class="profile-header-username">
                      {{ userProfile.userName }}
                    </div>
                    <div class="gender">
                      <icon-man style="color:#747bff;" v-if="userProfile.gender === 0"/>
                      <icon-woman style="color: pink" v-if="userProfile.gender === 1"/>
                    </div>

                  </div>
                  <div class="profile-header-opt">
                    <!--                需要判断是否是展示自己的首页，选择展示那些button-->
                    <div v-if="userProfile.self">
                      <a-button type="text" @click="handlerPushToUpdateUserInfo">编辑资料</a-button>
                    </div>
                    <div v-else>
                      <a-button type="text" @click="Message.info('暂未实现')">关注</a-button>
                    </div>
                  </div>
                </div>
                <div class="profile-header-body">
                  <div class="profile-header-interface-num">
                    发布可用接口数量: {{ userProfile.canUseInterfaceNum }}
                  </div>
                  <div class="profile-header-interface-all-cell">
                    接口被调用总次数: {{ userProfile.interfaceTransferNum }}
                  </div>
                </div>
                <div class="profile-header-create-time">
                  创建时间: {{ userProfile.createTime }}
                </div>
              </div>
            </div>

          </a-card>

        </div>
        <div class="user-profile-body">
          <div class="body-left">
            <a-card>
              <div class="body-left-title">
                <div class="body-left-title-interface"
                     @click="handlerGetInterfaceBusinessList(userProfile.id,'interface')">接口
                </div>
              </div>
              <a-divider></a-divider>
              <div v-if="interfaceList.length===0">没有发布接口</div>
              <div v-else>
                <div v-for="item in interfaceList" :key="interfaceList">
                  <div class="body-left-item">
                    <div class="body-left-item-title" @click="handlerPushToInterfaceInfo(item.id)">
                      <div class="body-left-item-title-name">
                        {{ item.name }}
                      </div>
                      <div class="body-left-item-title-status">
                        <a-badge v-if="item.status===1" text="可用" status="success"/>
                        <a-badge v-else status="danger" text="不可用"/>
                      </div>
                    </div>
                    <div class="body-left-item-desc" @click="handlerPushToInterfaceInfo(item.id)">
                      {{ item.description }}
                    </div>
                    <div class="body-left-item-foot">
                      <div class="body-left-item-create-time">
                        发布时间：{{ item.createTime }}
                      </div>
                      <div class="body-left-item-total">
                        调用总次数： {{ item.allNum }}
                      </div>
                    </div>
                  </div>
                  <a-divider></a-divider>
                </div>
              </div>


            </a-card>
          </div>
        </div>
      </div>
    </template>
  </Container>

</template>

<script setup lang="ts">

import Container from "../../components/Container.vue";
import {onMounted, reactive} from "vue";
import router from "../../router";
import {Message} from "@arco-design/web-vue";
import {getUserProfile} from "../../services/user";
import {getInterfaceBusinessList} from "../../services/interfaceInfo";



const pageOptions = reactive({page: 1, size: 10})
const interfaceList = reactive<API.InterfaceInfoVO[]>([])


async function handlerGetUserProfile(userAccount) {
  try {
    const res = await getUserProfile(userAccount);
    if (!res.code) {
      userProfile.canUseInterfaceNum = res.data.canUseInterfaceNum;
      userProfile.createTime = res.data.createTime;
      userProfile.id = res.data.id;
      userProfile.userName = res.data.userName;
      userProfile.userAvatar = res.data.userAvatar;
      userProfile.gender = res.data.gender;
      userProfile.interfaceTransferNum = res.data.interfaceTransferNum;
      userProfile.self = res.data.self;
    } else {
      Message.error(res.message);
      console.log(res);
    }
  } catch (err) {
    Message.error("获取用户信息出错");
    console.log(err);
  }
}

async function handlerGetInterfaceBusinessList(userId: number, type: string) {
  try {
    console.log(userId);
    const res = await getInterfaceBusinessList({ type: type, userId: userId, ...pageOptions });
    if (!res.code) {
      interfaceList.length = 0;
      interfaceList.push(...res.data);
      console.log(interfaceList);
    } else {
      Message.error(res.message);
      console.log(res);
    }
  } catch (err) {
    Message.error(err.message);
    console.log(err);
  }
}

async function fetchData(userAccount) {
  await handlerGetUserProfile(userAccount);
  await handlerGetInterfaceBusinessList(userProfile.id, 'interface');
}

const userProfile = reactive<API.UserProfileVO>({});

onMounted(async () => {
  const userAccount = router.currentRoute.value.params.account;
  await fetchData(userAccount);
});

function handlerPushToInterfaceInfo(id: number) {
  router.push({
    path: '/interface/detail/' + id
  })
}

function handlerPushToUpdateUserInfo() {
  router.push("/user/updateInfo")

}
</script>

<style scoped>

.user-profile-page {
  display: flex;
  flex-direction: column;

  gap: 10px
}

.user-profile-header {
  height: 11%;
}

.profile-header-card {
  display: flex;
//justify-content: space-between; gap: 10px
}


.user-profile-body {
  height: 89%;
  display: flex;
  gap: 10px;
}

.body-left {
  width: 100%;
}



.profile-header-title {
  display: flex;
  justify-content: space-between;
}

.profile-header-avatar {
  width: 10%;
}

.profile-header-other {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-header-body {
  display: flex;
  font-size: 14px;
  gap: 15px;
}


.profile-header-username {
  font-size: 22px;
}

.name-gender {
  display: flex;
  gap: 10px;
  align-items: center;
}

.arco-card-bordered {
  border-radius: 10px;
}

.body-left-title {
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  gap: 10px;
}

.body-left-title-interface {
  cursor: pointer;
}

.body-left-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.body-left-item-title {
  display: flex;
  gap: 10px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: red;
  }
}

.body-left-item-title-status {
  font-size: 14px;
  display: flex;
  align-items: end;
}

.body-left-item-desc {
  font-size: 14px;
  cursor: pointer;
}

.body-left-item-create-time {
  font-size: 14px;
}

.body-left-item-total {
  font-size: 14px;
}

.body-left-item-foot {
  display: flex;
  gap: 10px;
}

</style>