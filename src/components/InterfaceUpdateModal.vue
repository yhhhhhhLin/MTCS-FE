<template>
  <a-modal :visible="props.interfaceUpdateModalVisible" title="Modal Form" @cancel="handleUpdateInterfaceInfoCancel" @ok="handleUpdateInterfaceInfoSubmit" @before-ok="handleUpdateInterfaceInfoSubmit">
    <a-form :model="props.interfaceInfo"  @submit="handleUpdateInterfaceInfoSubmit">
      <a-form-item field="name" label="Username" validate-trigger="blur">
        <a-input v-model="props.interfaceInfo.name" placeholder="Please enter your username..."/>
      </a-form-item>
      <a-form-item field="description" label="description" validate-trigger="blur">
        <a-input-password v-model="props.interfaceInfo.description" placeholder="Please enter your password..."/>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button html-type="submit">Submit</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>

  <a-button @click="ok" type="primary">OK</a-button>
</template>

<script setup lang="ts">
import { defineProps , defineEmits } from 'vue';

const props = defineProps({
  interfaceInfo: {
    type: Object,
    default: {
      name: '',
      description: '',
      url: '',
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
  console.log(props.interfaceInfo);
  // 触发一个自定义事件来通知父组件更新 visible 的值
  this.emits('update:interfaceUpdateModalVisible', false);
};





const handleUpdateInterfaceInfoCancel = () => {
  emits('update:interfaceUpdateModalVisible', false);
  // 使用 nextTick 确保在更新之后再打印
    console.log("是否展示为：" + props.interfaceUpdateModalVisible);
}
</script>

<style scoped>

</style>

