<template>
  <Container :navbarDefault="'/admin/interfaceList'">
    <template v-slot:content>
      <a-card class="interfaces-card">
        <div class="select-form-card">
          <div class="select-form">
            <a-form :model="selectForm" layout="inline" label-align="left">
              <div class="select-form-item">
                <a-form-item field="name" label="接口名称" label-col-flex="60px">
                  <a-input allow-clear v-model="selectForm.name" placeholder="请输入要查询的接口名称"/>
                </a-form-item>
                <a-form-item field="请求方法" label="请求方法">
                  <a-select v-model="selectForm.method" placeholder="请选择请求方法" allow-clear>
                    <a-option value="GET">GET</a-option>
                    <a-option value="POST">POST</a-option>
                    <a-option value="PUT">PUT</a-option>
                    <a-option value="DELETE">DELETE</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item field="description" label="接口描述">
                  <a-input v-model="selectForm.description" allow-clear placeholder="请输入要查询的接口描述"/>
                </a-form-item>
                <a-form-item field="uri" label="请求的uri">
                  <a-input v-model="selectForm.uri" placeholder="请输入要查询的接口uri" allow-clear/>
                </a-form-item>
                <a-form-item field="host" label="请求host">
                  <a-input v-model="selectForm.host" placeholder="请输入要查询的接口请求host" allow-clear/>
                </a-form-item>
                <a-form-item field="status" label="接口状态">
                  <a-select v-model="selectForm.status" placeholder="请选择接口状态" :options="interfaceStatusOptions"
                            :field-names="fieldNames" allow-clear>
                  </a-select>
                </a-form-item>

              </div>
            </a-form>
          </div>
          <a-divider direction="vertical"/>
          <div class="select-form-button">
            <a-button type="primary" @click="handlerSearchAllInterface">
              <template #icon>
                <icon-search/>
              </template>
              查询
            </a-button>
            <a-button>
              <template #icon>
                <icon-reset/>
              </template>
              重置
            </a-button>
          </div>
        </div>

        <a-divider></a-divider>
        <div class="interfaces-list">
          <a-table row-key="id" :columns="interfaceInfoColumns" :data="interfaceInfoLists"
                   :pagination="selectForm" size="small">
            <template #optional="{ record }">
              <a-button @click="Message.info('暂未实现')">操作</a-button>
            </template>
            <template #name="{ record }">
              <a-link @click="openInterfaceDetail(record.id)">{{ record.name }}</a-link>
            </template>
          </a-table>

        </div>
      </a-card>
      <a-drawer :width="540" :drawer-style="{'border-radius': '7px'}" :visible="interfaceDetailVisible"
                hide-cancel @cancel="handleDrawerCancel" unmountOnClose>
        <template #title>
          <div class="drawer-title">
            <div class="drawer-title-msg">
              接口详细信息
            </div>
            <div class="drawer-title-opt">
              <a-link status="danger" @click="deleteTipsModalVisible = true">删除</a-link>
              <a-link @click="interfaceUpdateModalVisible = true">修改</a-link>
            </div>

          </div>
        </template>
        <template #footer>
          <div></div>
        </template>

        <a-descriptions>
          <a-descriptions-item v-for="item of interfaceInfoDrawerColumns" :label="item.label" :span="item.span">

            <pre>{{ interfaceDrawerDetail[item.dataIndex] ?? '无' }}</pre>

          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>

      <a-modal v-model:visible="deleteTipsModalVisible" @ok="handleDeleteTipsModalOk" @cancel="handleDeleteTipsModalCancel">
        <template #title>
          提示
        </template>
        <div>是否真的要删除，此操作不可逆！</div>
      </a-modal>

      <InterfaceUpdateModal :interfaceInfo="interfaceInfoLists[4]" :interfaceUpdateModalVisible="interfaceUpdateModalVisible"></InterfaceUpdateModal>

    </template>

  </Container>

</template>

<script setup lang="ts">

import Container from "../../../../components/Container.vue";
import {onMounted, reactive, ref} from "vue";
import {getInterfaceList} from "../../../../services/interfaceInfo";
import {Message} from "@arco-design/web-vue";
import InterfaceUpdateModal from "../../../../components/InterfaceUpdateModal.vue";


const selectForm = reactive({
  current: 1,
  pageSize: 10,
  name: null,
  method: null,
  description: null,
  uri: null,
  host: null,
  status: null
})
const interfaceInfoLists = reactive<API.InterfaceInfo[]>([])

const fieldNames = {value: 'value', label: 'text'}
let interfaceDrawerDetail = reactive<any>({
  name: '',
  method: '',
  requestParams: '',
  getRequestParams: '',
  description: '',
  uri: '',
  host: '',
  requestHeader: '',
  responseHeader: '',
  pointsRequired: 0,
  status: 0,
  userId: '',
  createTime: '',
})

const interfaceStatusOptions = reactive<any[]>([
  {
    value: 0,
    text: '不可用'
  },
  {
    value: '1',
    text: '可用'
  },
]);

const interfaceInfoDrawerColumns: any[] = [
  {
    label: '接口名称',
    dataIndex: 'name',
    span: '2'
  },
  {
    label: '接口方法',
    dataIndex: 'method',
    span: '2'
  },
  {
    label: '需要的积分',
    dataIndex: 'pointsRequired',
    span: '2'
  },
  {
    label: '接口状态',
    dataIndex: 'status',
    span: '2'
  },
  {
    label: '接口host',
    dataIndex: 'host',
    span: '2'
  },
  {
    label: '接口uri',
    dataIndex: 'uri',
    span: '2'
  },
  {
    label: '接口描述',
    dataIndex: 'description',
    span: '5'
    // ellipsis: true,
  },

  {
    label: 'post请求参数',
    dataIndex: 'requestParams',
    span: '5'
  },
  {
    label: 'get请求参数',
    dataIndex: 'getRequestParams',
    span: '5'

  },
]
const interfaceInfoColumns = [
  {
    title: '接口名称',
    slotName: 'name',
  },
  {
    title: '接口描述',
    dataIndex: 'description',
    // ellipsis: true,
  },
  {
    title: '接口方法',
    dataIndex: 'method',
  },
  {
    title: '接口uri',
    dataIndex: 'uri',
  },
  {
    title: '接口host',
    dataIndex: 'host',
  },
  {
    title: '需要的积分',
    dataIndex: 'pointsRequired',
  },

  {
    title: '接口状态',
    dataIndex: 'status',
    render: (value: any) => {
      if (value?.record?.status === 1) {
        return '可用'
      } else {
        return '不可用'
      }
    }
  },

  {
    title: '操作',
    slotName: 'optional',

  }
]

const interfaceDetailVisible = ref(false)
const deleteTipsModalVisible = ref(false)
const interfaceUpdateModalVisible = ref(false)

function handlerSearchAllInterface(){
  getInterfaceList(selectForm).then((res) => {
    // interfaceInfoLists.slice(0,...res.data.records)
    interfaceInfoLists.length=0
    interfaceInfoLists.push(...res.data.records)
    Message.success('获取接口信息成功')
    console.log(res)
  }).catch((err) => {
    Message.error('获取接口信息失败')
    console.log(err)
  })

}


onMounted(() => {
  // 获取所有接口信息
  handlerSearchAllInterface()
})

function openInterfaceDetail(interfaceInfoId: string) {
  console.log(interfaceInfoId)
  interfaceInfoLists.forEach(interfaceInfo => {
    if (interfaceInfo.id === interfaceInfoId) {
      console.log(interfaceInfo)
      interfaceDrawerDetail = interfaceInfo
    }
  })
  interfaceDetailVisible.value = true
}

function handleDrawerCancel(){
  interfaceDetailVisible.value = false
}

function handleDeleteTipsModalOk(){
  deleteTipsModalVisible.value = false
  console.log('删除某一个接口'+interfaceDrawerDetail.id)
}
function handleDeleteTipsModalCancel(){
  deleteTipsModalVisible.value = false
}



</script>

<style scoped>
.interfaces-card {
  display: flex;
  gap: 10px;
}

.select-form-card {
  display: flex;
}

.select-form {
  display: flex;
  gap: 10px;
  width: 90%;
}

.select-form-item {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 10px;
}

.select-form-button {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: end;
}

.drawer-title {
  width: 470px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.drawer-title-opt{
  display: flex;
  gap: 10px;
}


.arco-card-bordered {
  border-radius: 10px;
  flex-direction: column;
}

.arco-form-layout-inline {
  flex-direction: column;

}

.ope-btn {
  margin-right: 10px;
}

</style>