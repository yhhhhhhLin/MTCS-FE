<template>
  <a-modal :visible="props.modalVisible" width="600px" :mask-closable=false :title="props.title"
           @cancel="handleCancel" @ok="handleSubmit"
           :ok-loading="okLoading">
    <div v-if="data">
      <a-form :model="props.data" @submit="handleSubmit">
        <a-form-item v-for="item of items" :field="item.dataIndex" :label="item.label" validate-trigger="blur">
          <!--        判断不同的类型-->
          <div v-if="item.type==='input'">
            <div class="form-input">
              <a-input v-model="props.data[item.dataIndex]" :placeholder="item.placeholder"/>
            </div>
          </div>
          <div v-else-if="item.type==='select'">
            <a-select :placeholder="item.placeholder" v-model="props.data[item.dataIndex]">
              <a-option v-for="option of item.options" :value="option.value">{{ option.label }}</a-option>
            </a-select>
          </div>
          <div v-else-if="item.type==='textarea'">
            <div class="form-textarea"></div>
            <a-textarea v-model="props.data[item.dataIndex]" :placeholder="item.placeholder" auto-size/>
          </div>
          <div v-else>无</div>
        </a-form-item>
      </a-form>
    </div>
    <div v-else>无</div>

  </a-modal>

</template>

<script setup lang="ts">
import {defineEmits, defineProps} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '表单'
  },
  data: {
    type: Object,
    default: {}
  },
  items: {
    type: Object,
    default: [
      {
        label: '',
        dataIndex: '',
        placeholder: '',
        type: '',
        options: [
          {
            label: '',
            value: ''
          }
        ],

      },
    ]
  },
  modalVisible: {
    type: Boolean,
    default: false
  },
  okLoading: {
    type: Boolean,
    default: false
  }
});

// 定义自定义事件
const emits = defineEmits(['updateModalVisible', 'handlerSubmit']);
const handleCancel = () => {
  emits('updateModalVisible', false);
}
const handleSubmit = () => {
  // 触发一个自定义事件来通知父组件更新 visible 的值
  emits('handlerSubmit', props.data)
}


</script>

<style scoped>
.arco-input-wrapper {
  width: 400px;
}

.form-textarea {
  width: 400px;
}

.form-input {
  width: 400px;
}

</style>

