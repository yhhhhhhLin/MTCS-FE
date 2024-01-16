<template>
  <Container :navbarDefault="'1'">
    <template v-slot:content>

      <div class="chat-content">
        <div class="cards-parent">
          <a-scrollbar style="height:72vh;overflow: auto; background-color: #ffffff;border-radius: 10px">
            <div class="msgCards">
              <a-card v-for="message in messages" :key="1">
                <a-card :title="message.role">
                  <template #extra>
                    <div class="card-toolbar">
                      <icon-edit/>
                      <icon-refresh/>
                    </div>
                  </template>
                  {{ message.content }}
                </a-card>
              </a-card>
            </div>

          </a-scrollbar>

        </div>
        <div class="input-box">
          <a-card>
            <div class="toolbar">
              <div class="setting-btn" @click="editPromptModalVisible = true">
                <icon-settings size="18"/>
                <div>添加prompt</div>
              </div>

              <a-popconfirm type="warning" content="是否确定要全部清除！" @ok="handlerClearMessage">
                <div class="setting-btn" @click="">
                  <icon-eraser/>
                  清除聊天记录
                </div>
              </a-popconfirm>
            </div>
            <div class="msg-input">
              <a-textarea auto-size v-model="inputMsg" placeholder="请输入要提问的问题" :disabled="isDisabledInput"/>
              <a-button type="primary" @click="handlerSendMessage" :loading="buttonLoading">发送</a-button>
            </div>
          </a-card>
        </div>
      </div>

      <a-modal v-model:visible="editPromptModalVisible" title="添加prompt" @ok="editPromptBeforeOk" @cancel="editPromptBeforeCancel" draggable>
        可以通过prompt指定gpt的角色和回复信息格式等等
        <a-textarea
            v-model="newPromptText"
            :auto-size="{minRows:4,maxRows:4
  }" style="margin-top: 20px"/>
      </a-modal>
    </template>
  </Container>

</template>

<script setup lang="ts">

import Container from "../../components/Container.vue";
import {reactive, ref} from "vue";
import {sendMsgToGpt} from "../../services/gpt";

const inputMsg = ref('')
const isDisabledInput = ref(false)
const buttonLoading = ref(false)
const editPromptModalVisible = ref(false)
const oldPromptText = ref('')
const newPromptText = ref('')
const messages = reactive<API.GptMessageInfo[]>([])

function handlerSendMessage() {
  console.log(inputMsg.value)
  isDisabledInput.value = true
  buttonLoading.value = true
  // 将新的消息保存到list后面
  messages.push({
    role: 'user',
    content: inputMsg.value,
  })
  inputMsg.value = ''
  sendMsgToGpt(messages).then((res) => {
    console.log(res)
    // TODO 添加信息到messages中
    isDisabledInput.value = false
    buttonLoading.value = false

  })


}

function handlerClearMessage() {
  messages.length = 0
}

function editPromptBeforeOk() {
  oldPromptText.value = newPromptText.value
  editPromptModalVisible.value = false

  if (messages.length > 0 && messages[0].role === 'system' && newPromptText.value) {
    messages[0].content = newPromptText.value
  } else if(messages.length > 0 && messages[0].role == 'system' && !newPromptText.value){
    messages.shift()
  } else if (newPromptText.value) {
    messages.unshift({
      role: 'system',
      content: newPromptText.value
    })
  }

}

function editPromptBeforeCancel() {
  editPromptModalVisible.value = false
  newPromptText.value = oldPromptText.value

}


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

  .input-box {
    .toolbar {
      height: 100%;
      margin-bottom: 10px;
      display: flex;
      gap: 15px;

      .setting-btn {
        display: flex;
        width: 100px;
        border-radius: 5px;
      }

      .setting-btn:hover {
        cursor: pointer;
        background-color: #f5f5f5;
        transform: scale(1.03);
      }

    }

  }


}

.msg-input {
  display: flex;
  gap: 10px;
}

.arco-textarea-wrapper {
  border-radius: 10px;
}

.arco-card-bordered {
  border-radius: 10px;
}

.arco-btn-size-medium {
  border-radius: 10px;
}

.card-toolbar {
  display: flex;
  gap: 10px;
}
.arco-modal-body {
  padding: 1px 20px 24px 20px;
}


</style>