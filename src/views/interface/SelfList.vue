<template>
  <Container :navbarDefault="'/myInterface'">
    <template v-slot:content>
      <a-card class="interfaces-card">
        <div class="interface-analyze-card">
          <div>
            <div ref="selfChart" id="selfChart" style="width: 100%; height: 250px;"></div>
          </div>
          <a-divider></a-divider>
        </div>
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
            <a-button type="primary" @click="handlerSearchSelfAllInterface">
              <template #icon>
                <icon-search/>
              </template>
              查询
            </a-button>
            <a-button @click="handlerResetForm">
              <template #icon>
                <icon-refresh/>
              </template>
              重置
            </a-button>
          </div>
        </div>

        <a-divider></a-divider>
        <div class="interface-list-main">
          <div class="interface-add-btn">
            <a-button type="primary" @click="handlerAddInterface">
              <template #icon>
                <icon-plus/>
              </template>
              新增
            </a-button>
            <a-button @click="handlerExportInterface">
              <template #icon>
                <icon-download/>
              </template>
              导出
            </a-button>

          </div>
          <div class="interfaces-list">
            <a-table row-key="id" :columns="interfaceInfoColumns" :data="interfaceInfoLists"
                     :pagination="paginationProps" @page-change="handlerTableChange" size="small">
              <template #optional="{ record }">
                <a-link v-if="record.status === 0" @click="interfaceOnline(record.id)">上线</a-link>
                <a-link v-else-if="record.status === 1" @click="interfaceOffLine(record.id)" status="danger">下线</a-link>
                <a-link v-else status="danger" disabled>无法修改状态</a-link>
              </template>
              <template #name="{ record }">
                <a-link @click="openInterfaceDetail(record.id)">{{ record.name }}</a-link>
              </template>
            </a-table>
          </div>
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
              <a-link @click="updateInterfaceFun">修改</a-link>
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

      <a-modal v-model:visible="deleteTipsModalVisible" @ok="handleDeleteTipsModalOk"
               @cancel="handleDeleteTipsModalCancel">
        <template #title>
          提示
        </template>
        <div>是否真的要删除，此操作不可逆！</div>
      </a-modal>


      <CreateOrUpdateModal :title="'修改接口信息'"
                           :data="updateInterfaceInfo"
                           :items="interfaceInfoUpdateOrCreateModalColumns"
                           :modalVisible="interfaceUpdateModalVisible"
                           @updateModalVisible="updateInterfaceUpdateModalVisible"
                           @handlerSubmit="handlerUpdateSubmit"
                           :okLoading="createOrUpdateOkLoading"
      ></CreateOrUpdateModal>

      <CreateOrUpdateModal :title="'新增加口'"
                           :data="createInterfaceInfo"
                           :items="interfaceInfoUpdateOrCreateModalColumns"
                           :modalVisible="interfaceCreateModalVisible"
                           @updateModalVisible="updateInterfaceCreateModalVisible"
                           @handlerSubmit="handlerCreateSubmit"
                           :okLoading="createOrUpdateOkLoading"
      ></CreateOrUpdateModal>



    </template>

  </Container>

</template>

<script setup lang="ts">

import Container from "../../components/Container.vue";
import {h, onMounted, reactive, ref} from "vue";
import {
  adminInterfaceInfoAdd, getInterfaceSelfAnalyze,
  interfaceInfoDelete,
  interfaceInfoUpdate,
  selectSelfInterfaceListByPage,
  updateInterfaceStatus, userInterfaceInfoAdd,
} from "../../services/interfaceInfo";
import {Message} from "@arco-design/web-vue";
import CreateOrUpdateModal from "../../components/CreateOrUpdateModal.vue";
import * as echarts from 'echarts';

function interfaceOnline(id: number) {
  updateInterfaceStatus({interfaceId: id, status: 1}).then((resp) => {
    if (!resp.code) {
      Message.success("操作成功")
      // 查询获取所有接口信息
      handlerSearchSelfAllInterface()
    } else {
      Message.error(resp.message)
      console.log(resp)
    }

  }).catch((err) => {
    Message.error(err.message)
    console.log(err)
  })

}

function interfaceOffLine(id: number) {
  updateInterfaceStatus({interfaceId: id, status: 0}).then((resp) => {
    if (!resp.code) {
      Message.success("操作成功")
      // 查询获取所有接口信息
      handlerSearchSelfAllInterface()
    } else {
      Message.error(resp.message)
      console.log(resp)
    }

  }).catch((err) => {
    Message.error(err.message)
    console.log(err)
  })

}


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

const interfaceInfoUpdateOrCreateModalColumns: any[] = [
  {
    label: '接口名称',
    dataIndex: 'name',
    placeholder: '请输入接口名称',
    type: 'input',
  },
  {
    label: '接口方法',
    dataIndex: 'method',
    placeholder: '请输入接口方法',
    type: 'select',
    options: [
      {
        label: 'Get',
        value: 'GET'
      },
      {
        label: 'Post',
        value: 'POST'
      },
      {
        label: 'Put',
        value: 'PUT'
      },
      {
        label: 'Delete',
        value: 'DELETE'
      }
    ],
  },
  {
    label: '接口描述',
    dataIndex: 'apiDescription',
    placeholder: '请输入接口描述',
    type: 'textarea',
  },
  {
    label: '需要的积分',
    dataIndex: 'pointsRequired',
    placeholder: '请输入接口名称',
    type: 'input',
  },
  {
    label: '接口host',
    dataIndex: 'host',
    placeholder: '请输入接口host',
    type: 'input',
  },
  {
    label: '接口uri',
    dataIndex: 'uri',
    placeholder: '请输入接口uri',
    type: 'input',
  },
  {
    label: 'post请求参数',
    dataIndex: 'requestParams',
    placeholder: '请输入接口post请求参数',
    type: 'textarea',
  },
  {
    label: 'get请求参数',
    dataIndex: 'getRequestParams',
    placeholder: '请输入接口get请求参数',
    type: 'textarea',
  },
  {
    label: '请求头信息',
    dataIndex: 'requestHeader',
    placeholder: '请输入接口requestHeader',
    type: 'textarea',
  },
  {
    label: '响应头信息',
    dataIndex: 'responseHeader',
    placeholder: '请输入接口responseHeader',
    type: 'textarea',
  }
]

const interfaceInfoDrawerColumns: any[] = [
  {
    label: '接口名称',
    dataIndex: 'name',
    span: 2
  },
  {
    label: '接口方法',
    dataIndex: 'method',
    span: 2
  },
  {
    label: '需要的积分',
    dataIndex: 'pointsRequired',
    span: 2
  },
  {
    label: '接口状态',
    dataIndex: 'status',
    span: 2
  },
  {
    label: '接口host',
    dataIndex: 'host',
    span: 2
  },
  {
    label: '接口uri',
    dataIndex: 'uri',
    span: 2
  },
  {
    label: '接口描述',
    dataIndex: 'description',
    span: 5,

  },

  {
    label: 'post请求参数',
    dataIndex: 'requestParams',
    span: 5
  },
  {
    label: 'get请求参数',
    dataIndex: 'getRequestParams',
    span: 5

  },
]
const interfaceInfoColumns = [
  {
    title: '接口名称',
    slotName: 'name',
    width: 150
  },
  {
    title: '接口描述',
    dataIndex: 'description',
    ellipsis: true,
    width: 250,
    // ellipsis: true,
  },
  {
    title: '接口方法',
    dataIndex: 'method',
    width: 90
  },
  {
    title: '接口host',
    dataIndex: 'host',
    width: 200
  },
  {
    title: '接口uri',
    dataIndex: 'uri',
    width: 200
  },
  {
    title: '需要的积分',
    dataIndex: 'pointsRequired',
    width: 80
  },

  {
    title: '接口状态',
    dataIndex: 'status',
    render: (value: any) => {
      if (value?.record?.status === 1) {
        return h('span', {class: 'interface-status'}, h('span', {class: 'interface-status arco-badge-status-dot arco-badge-status-processing'}), '   开启')
        // return h('a-badge', {status: 'processing'}, '可用')
      } else if(value.record.status==0){
        return h('span', {class: 'interface-status'}, h('span', {class: 'interface-status arco-badge-status-dot arco-badge-status-danger'}), ' 关闭')
      }else if (value?.record?.status === 2) {
        return h('span', {class: 'interface-status'}, h('span', {class: 'arco-badge-status-dot arco-badge-color- #FF7D00',style:'background-color: rgb(255, 180, 0);'}), ' 审核中')
      }else if(value?.record?.status === 3){
        return h('span', {class: 'interface-status'}, h('span', {class: 'arco-badge-status-dot arco-badge-color-#FF5722',style:'background-color: rgb(255, 87, 34);'}), ' 存在违规内容，重新提交')
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
const interfaceCreateModalVisible = ref(false)
const createOrUpdateOkLoading = ref(false)
let updateInterfaceInfo = reactive<any>({})
let createInterfaceInfo = reactive<any>({})

function handlerSearchSelfAllInterface() {
  selectForm.pageSize=paginationProps.pageSize
  selectForm.current=paginationProps.current

  selectSelfInterfaceListByPage(selectForm).then((res) => {
    // interfaceInfoLists.slice(0,...res.data.records)
    interfaceInfoLists.length = 0
    interfaceInfoLists.push(...res.data.records)
    paginationProps.total = Number(res.data.total??0)
  }).catch((err) => {
    Message.error('获取接口信息失败')
    console.log(err)
  })

}

const paginationProps = reactive({
  pageSize: 10,
  current: 1,
  total: 0,
  showTotal: (total: number) => `总 ${total} 条`,
})

function handlerResetForm() {
  selectForm.current = 1;
  selectForm.pageSize = 10;
  selectForm.name = null;
  selectForm.method = null;
  selectForm.description = null;
  selectForm.uri = null;
  selectForm.host = null;
  selectForm.status = null
}

function handlerSearchSelfInterfaceAnalyze() {
  getInterfaceSelfAnalyze({total: 5, current: 1}).then((res) => {
    // 转为echarts格式
    const pieChartsData = res.data.map((item: any) => {
      return {
        name: item.name,
        value: item.allNum
      }
    })
    console.log(pieChartsData)
    echarts.init(document.getElementById("selfChart")).setOption({
          title: {
            text: '调用次数前5接口',
            // subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [{
            type: 'pie',
            radius: '50%',
            data: pieChartsData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }],
        }
    )
  })
}

onMounted(() => {
  // 获取所有接口信息
  handlerSearchSelfAllInterface()
  handlerSearchSelfInterfaceAnalyze()
  Message.success('获取个人所有接口信息成功')
})

function openInterfaceDetail(interfaceInfoId: string) {
  interfaceInfoLists.forEach(interfaceInfo => {
    if (interfaceInfo.id === interfaceInfoId) {
      interfaceDrawerDetail = interfaceInfo
    }
  })
  interfaceDetailVisible.value = true
}

function handleDrawerCancel() {
  interfaceDetailVisible.value = false
}

function handleDeleteTipsModalOk() {
  interfaceInfoDelete({id: interfaceDrawerDetail.id})
      .then(resp => {
        if (!resp.code) {
          Message.success('删除接口成功')
          deleteTipsModalVisible.value = false
          interfaceDetailVisible.value = false
          handlerSearchSelfAllInterface()
        } else {
          Message.error(resp.message)
          console.log(resp)
        }
      })
      .catch((err) => {
        Message.error('删除接口失败')
        console.log(err)
      })
}

function handleDeleteTipsModalCancel() {
  deleteTipsModalVisible.value = false
}


function updateInterfaceUpdateModalVisible(val: any) {
  interfaceUpdateModalVisible.value = val
}

function updateInterfaceCreateModalVisible(val: any) {
  interfaceCreateModalVisible.value = val
}


function updateInterfaceFun(val) {
  interfaceUpdateModalVisible.value = true
  updateInterfaceInfo = reactive({...interfaceDrawerDetail});
  updateInterfaceInfo.apiDescription = interfaceDrawerDetail.description
}

function handlerAddInterface() {
  interfaceCreateModalVisible.value = true
}


function handlerExportInterface() {
  Message.info('暂未实现')
}

function initInterfaceInfo() {
  createInterfaceInfo.name = ''
  createInterfaceInfo.apiDescription = ''
  createInterfaceInfo.method = ''
  createInterfaceInfo.host = ''
  createInterfaceInfo.uri = ''
  createInterfaceInfo.pointsRequired = 0
  createInterfaceInfo.requestParams = ''
  createInterfaceInfo.getRequestParams = ''
  createInterfaceInfo.requestHeader = ''
  createInterfaceInfo.responseHeader = ''
  createInterfaceInfo.status = 1

}

function handlerCreateSubmit(data) {
  createOrUpdateOkLoading.value = true
  userInterfaceInfoAdd(createInterfaceInfo)
      .then(resp => {
        if (!resp.code) {
          Message.success(resp.data)
          interfaceCreateModalVisible.value = false
          initInterfaceInfo()
        } else {
          Message.error(resp.message)
          console.log(resp)
        }
        createOrUpdateOkLoading.value = false
      })
      .catch((err) => {
        Message.error('创建接口失败')
        console.log(err)
      })
}

// TODO 需要重新审核
function handlerUpdateSubmit(data) {
  Message.info('暂未实现')
  // console.log(data)
  // createOrUpdateOkLoading.value = true
  // interfaceInfoUpdate(updateInterfaceInfo)
  //     .then((resp) => {
  //       if (!resp.code) {
  //         Message.success('更新接口成功')
  //         handlerSearchSelfAllInterface()
  //         interfaceDrawerDetail = reactive({...updateInterfaceInfo})
  //         interfaceUpdateModalVisible.value = false
  //       } else {
  //         Message.error(resp.message)
  //         console.log(resp)
  //       }
  //       createOrUpdateOkLoading.value = false
  //     })
  //     .catch((err) => {
  //       Message.error('更新接口失败')
  //       console.log(err)
  //     })
}

function handlerTableChange(data) {
  paginationProps.current = data
  handlerSearchSelfAllInterface()
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

.drawer-title-opt {
  display: flex;
  gap: 10px;
}

.interface-list-main {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.interface-add-btn {
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
