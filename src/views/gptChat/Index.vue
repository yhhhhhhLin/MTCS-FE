<template>
  <Container :navbarDefault="'/gptChat'">
    <template v-slot:content>

      <div class="chat-content">

        <div class="cards-parent">
          <a-scrollbar style="height:72vh;overflow: auto; background-color: #ffffff;border-radius: 10px" ref="chatScrollbar">
            <div class="msgCards" id="chatCard">
              <template v-for="message in messages" :key="1">
                <!--                如果role是system，那么不展示出来-->
                <a-card :title="message.role" v-if="message.role=='user'" size="small">
                  <template #extra>
                    <div class="card-toolbar">
                      <!--                      修改弹出气泡的圆角-->
                      <a-tooltip content="重新编辑" mini>
                        <icon-edit/>
                      </a-tooltip>
                      <a-tooltip content="重新生成回复" mini>
                        <icon-refresh/>
                      </a-tooltip>
                    </div>
                  </template>
                  <v-md-preview :text="message.content"  @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
                </a-card>
                <a-card :title="message.role" v-else-if="message.role=='assistant'" size="small">
                  <template #extra>
                    <div class="card-toolbar">
                      <!--                      修改弹出气泡的圆角-->
                      <a-tooltip content="重新编辑" mini>
                        <icon-edit/>
                      </a-tooltip>
                      <a-tooltip content="重新生成回复" mini>
                        <icon-refresh/>
                      </a-tooltip>
                    </div>
                  </template>
                  <v-md-preview :text="message.content" @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
                </a-card>


              </template>
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
              <a-textarea :auto-size="{minRows:1,maxRows:12}" v-model="inputMsg" placeholder="请输入要提问的问题" :disabled="isDisabledInput"/>
              <a-button type="primary" @click="handlerSendMessage" :loading="buttonLoading">发送</a-button>
            </div>
          </a-card>
        </div>
      </div>

      <a-modal v-model:visible="editPromptModalVisible" title="添加prompt" @ok="editPromptBeforeOk"
               @cancel="editPromptBeforeCancel" draggable>
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
import {onMounted, reactive, ref} from "vue";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import router from "../../router";
import {Message} from "@arco-design/web-vue";

const inputMsg = ref('')
const isDisabledInput = ref(false)
const buttonLoading = ref(false)
const editPromptModalVisible = ref(false)
const oldPromptText = ref('')
const newPromptText = ref('')
const messages = reactive<API.GptMessageInfo[]>([])
const chatScrollbar = ref<any>(null);


const storageKeyPre = 'gptMessages_'
const token = localStorage.getItem('token')

let newMessage = ''

onMounted(() => {
  // 获取storage中的chatMessage数据
  const chatMessage = localStorage.getItem(storageKeyPre+token)
  // 转为数组赋值给messages
  if (chatMessage) {
    // 获取prompt
    const prompt = getPrompt(JSON.parse(chatMessage));
    oldPromptText.value = prompt
    newPromptText.value=prompt
    messages.push(...JSON.parse(chatMessage))

  }
})
function getPrompt(msg:API.GptMessageInfo[]) :string{
  if(msg.length>0 && msg[0].role === 'system') {
    return msg[0].content
  }
  return ''

}

function handlerSendMessage() {
  isDisabledInput.value = true
  buttonLoading.value = true
  // 将新的消息保存到list后面
  messages.push({
    role: 'user',
    content: inputMsg.value,
  })
  const msgLength = messages.length
  inputMsg.value = ''

  const controller = new AbortController()
  const token = localStorage.getItem('token')
  if (!token) {
    Message.error('请先登录')
    router.push('/login')
  }

  fetchEventSource(import.meta.env.VITE_BASE_HOST + import.meta.env.VITE_BASE_PRE_URL + '/gpt/gptChat', {
    method: 'POST',
    signal: controller.signal,
    headers: {
      "content-Type": "application/json",
      "token": token
    },
    body: JSON.stringify(messages),
    onmessage(msg) {


      const oneMsg = JSON.parse(msg.data)

      if (oneMsg.finish_reason === "stop") {
        isDisabledInput.value = false
        buttonLoading.value = false
        newMessage = ''
        return
      }

      const word = oneMsg.delta.content
      newMessage += word
      // 添加到Message中
      messages[msgLength] = {
        role: 'assistant',
        content: newMessage
      }


    },
    onerror(err) {
      isDisabledInput.value = false
      buttonLoading.value = false
      newMessage = '出错了....(可能是你没权限,也可能是系统错误)  '
      messages[msgLength] = {
        role: 'assistant',
        content: newMessage
      }
      // 添加错误提示给用户
      throw err
    }
  }).then(res => {
    // 保存到storage中
    localStorage.setItem(storageKeyPre+token, JSON.stringify(messages))
  })
}
function handleCopyCodeSuccess(){
  Message.success('复制成功')
}

function handlerClearMessage() {
  if (messages.length === 0) {
  } else if (messages[0].role === 'system') {
    // 把从第二条开始的位置把后面的全部清除
    messages.splice(1)
  } else {
    messages.length = 0
  }
  localStorage.setItem(storageKeyPre+token, JSON.stringify(messages))
  Message.success('聊天记录已清除')
}

function editPromptBeforeOk() {
  oldPromptText.value = newPromptText.value
  editPromptModalVisible.value = false

  if (messages.length > 0 && messages[0].role === 'system' && newPromptText.value) {
    messages[0].content = newPromptText.value
  } else if (messages.length > 0 && messages[0].role == 'system' && !newPromptText.value) {
    messages.shift()
  } else if (newPromptText.value) {
    messages.unshift({
      role: 'system',
      content: newPromptText.value
    })
  }
  // 需要更新storage
  localStorage.setItem(storageKeyPre+token, JSON.stringify(messages))
  Message.success('修改成功')

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
      padding: 15px;


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