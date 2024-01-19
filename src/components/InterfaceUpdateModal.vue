<template>
  <a-modal :visible="props.interfaceUpdateModalVisible" width="600px" :mask-closable=false title="Modal Form" @cancel="handleUpdateInterfaceInfoCancel" @ok="handleUpdateInterfaceInfoSubmit" @before-ok="handleUpdateInterfaceInfoSubmit">
    <a-form :model="props.interfaceInfo"  @submit="handleUpdateInterfaceInfoSubmit">
      <a-form-item field="name" label="Username" validate-trigger="blur">
        <a-input v-model="props.interfaceInfo.name" placeholder="Please enter your username..."/>
      </a-form-item>
      <a-form-item field="description" label="description" validate-trigger="blur">
        <a-input v-model="props.interfaceInfo.description" placeholder="Please enter your description..."/>
      </a-form-item>
      <a-form-item field="url" label="uri" validate-trigger="blur">
        <a-input v-model="props.interfaceInfo.uri" placeholder="Please enter your url..."/>
      </a-form-item>
      <a-form-item field="method" label="method" validate-trigger="blur">
<!--        选择框-->
        <a-select v-model="props.interfaceInfo.method" placeholder="Please select your method...">
          <a-option value="GET">GET</a-option>
          <a-option value="POST">POST</a-option>
          <a-option value="PUT">PUT</a-option>
          <a-option value="DELETE">DELETE</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="host" label="host" validate-trigger="blur">
        <a-input v-model="props.interfaceInfo.host" placeholder="Please enter your host..."/>
      </a-form-item>
      <a-form-item field="requestParams" label="requestParams" validate-trigger="blur">
        <a-textarea  v-model="props.interfaceInfo.requestParams" auto-size />
      </a-form-item>
      <a-form-item field="getRequestParams" label="getRequestParams" validate-trigger="blur">
        <a-textarea  v-model="props.interfaceInfo.getRequestParams" auto-size />
      </a-form-item>
      <a-form-item field="requestHeader" label="requestHeader" validate-trigger="blur">
        <a-textarea  v-model="props.interfaceInfo.requestHeader" auto-size />
      </a-form-item>
      <a-form-item field="responseHeader" label="responseHeader" validate-trigger="blur">
        <a-textarea  v-model="props.interfaceInfo.responseHeader" auto-size />
      </a-form-item>
      <a-form-item field="pointsRequired" label="pointsRequired" validate-trigger="blur">
        <a-input v-model="props.interfaceInfo.pointsRequired" placeholder="Please enter your pointsRequired..."/>
      </a-form-item>

    </a-form>
  </a-modal>

</template>

<script setup lang="ts">
import { defineProps , defineEmits } from 'vue';

const props = defineProps({
  interfaceInfo: {
    type: Object,
    default: {
      name: '',
      description: '',
      uri: '',
      method: '',
      host: '',
      status: 0,
      requestParams: '',
      getRequestParams: '',
      requestHeader: '',
      responseHeader: '',
      pointsRequired: 0
    }
  },
  interfaceUpdateModalVisible: {
    type: Boolean,
    default: false
  }
});


const emits = defineEmits();
const handleUpdateInterfaceInfoSubmit = () => {
  console.log(props.interfaceInfo)
  // 触发一个自定义事件来通知父组件更新 visible 的值
  emits('updateInterfaceUpdateModalVisible', false);
};





const handleUpdateInterfaceInfoCancel = () => {
  emits('updateInterfaceUpdateModalVisible', false);
  // 使用 nextTick 确保在更新之后再打印
}
</script>

<style scoped>

</style>

