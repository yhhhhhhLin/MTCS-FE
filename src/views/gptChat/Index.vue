<template>
  <Container :navbarDefault="'1'">
    <template v-slot:content>
      <div class="chat-content">
        <div class="cards-parent">
          <a-scrollbar style="height:72vh;overflow: auto; background-color: #ffffff">
            <div class="msgCards">
              <a-card title="user">
                <template #extra>
                  <div class="card-toolbar">
                    <icon-edit />
                    <icon-refresh />
                  </div>
                </template>
                这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1这是消息1
              </a-card>

              <a-card title="gpt" >
                <template #extra>
                  <div class="card-toolbar">
                    <icon-refresh />
                    <icon-edit />
                  </div>
                </template>
                这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2这是消息2
              </a-card>
              <a-card title="user" >
                <template #extra>
                  <div class="card-toolbar">
                    <icon-refresh />
                    <icon-edit />
                  </div>
                </template>
                这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3
              </a-card>

              <a-card title="gpt">
                <template #extra>
                  <div class="card-toolbar">
                    <icon-refresh />
                    <icon-edit />
                  </div>
                </template>
                这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3
              </a-card>
<!--              <a-card>-->
<!--                这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3-->
<!--              </a-card>-->
<!--              <a-card>-->
<!--                这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3-->
<!--              </a-card>-->
<!--              <a-card>-->
<!--                这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3-->
<!--              </a-card>-->
<!--              <a-card>-->
<!--                这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3-->
<!--              </a-card>-->
<!--              <a-card>-->
<!--                这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3-->
<!--              </a-card>-->
<!--              <a-card>-->
<!--                这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3这是消息3-->
<!--              </a-card>-->
            </div>

          </a-scrollbar>

        </div>
        <div class="input-box">
          <a-card>
            <div class="toolbar">
              <div class="setting-btn">
                <icon-settings size="18"/>
                <div>添加prompt</div>
              </div>

              <div class="clear-btn">
                <icon-eraser />
                清除聊天记录
              </div>
            </div>
            <div class="msg-input">
              <a-textarea auto-size/>
              <a-button type="primary">发送</a-button>
            </div>
          </a-card>
        </div>
      </div>
    </template>
  </Container>

</template>

<script setup lang="ts">

import Container from "../../components/Container.vue";
</script>


<style scoped>
.chat-content {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;

  .cards-parent {
    height: 80%;

    .msgCards {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  .input-box{
    .toolbar{
      height: 100%;
      margin-bottom: 10px;
      display: flex;
      gap: 15px;
      .setting-btn{
        display: flex;
        width: 100px;
      }

      .setting-btn:hover{
        cursor: pointer;
        background-color: #f5f5f5;
        transform: scale(1.03);
      }

      .clear-btn{
        display: flex;
        width: 100px;
      }
      .clear-btn:hover{
        cursor: pointer;
        background-color: #f5f5f5;
        transform: scale(1.03);
      }
    }

  }


}

.msg-input{
  display: flex;
  gap: 10px;
}

.arco-textarea-wrapper {
  border-radius: 5px;
}

.arco-card-bordered {
  border-radius: 10px;
}
.arco-btn-size-medium{
  border-radius: 5px;
}

.card-toolbar{
  display: flex;
  gap: 10px;
}



</style>