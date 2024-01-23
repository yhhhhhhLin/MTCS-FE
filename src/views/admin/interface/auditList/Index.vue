<template>
  <Container :navbarDefault="'/admin/auditInterfaceList'">
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
                  <a-input v-model="selectForm.apiDescription" allow-clear placeholder="请输入要查询的接口描述"/>
                </a-form-item>
                <a-form-item field="uri" label="请求的uri">
                  <a-input v-model="selectForm.uri" placeholder="请输入要查询的接口uri" allow-clear/>
                </a-form-item>
                <a-form-item field="host" label="请求host">
                  <a-input v-model="selectForm.host" placeholder="请输入要查询的接口请求host" allow-clear/>
                </a-form-item>
                <a-form-item field="status" label="接口审核状态">
                  <a-select v-model="selectForm.status" placeholder="请选择审核状态" :options="interfaceStatusOptions"
                            :field-names="fieldNames" allow-clear>
                  </a-select>
                </a-form-item>
              </div>
            </a-form>
          </div>
          <a-divider direction="vertical"/>
          <div class="select-form-button">
            <a-button type="primary" @click="handlerSearchAllAuditInterface">
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

          <div class="interfaces-list">
            <a-table row-key="id" :columns="interfaceInfoColumns" :data="interfaceInfoLists"
                     :pagination="paginationProps" @page-change="handlerTableChange" size="small">
              <template #optional="{ record }">
                <!--                如果是被拒绝了，那么就只能是同意，如果是同意的那么就是拒绝，如果都不是，那么就可以拒绝也可以同意-->
                <div class="pass-or-reject-btn">
                  <div v-if="record.status === 5 || record.status === 9">
                    <a-link status="danger"
                            @click="handlerRejectInterfaceAudit(record.id)">拒绝
                    </a-link>
                  </div>
                  <div v-else-if="record.status === 4">
                    <a-link @click="passInterfaceAudit(record.id)">通过</a-link>
                  </div>
                  <div v-else>
                    <a-link status="danger"
                            @click="handlerRejectInterfaceAudit(record.id)">拒绝
                    </a-link>
                    <a-link @click="passInterfaceAudit(record.id)">通过</a-link>
                  </div>
                </div>
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
              审核接口的接口详细信息
            </div>
          </div>
        </template>
        <template #footer>

          <div v-if="interfaceDrawerDetail.status === 5 || interfaceDrawerDetail.status === 9">
            <a-link status="danger"
                    @click="handlerRejectInterfaceAudit(interfaceDrawerDetail.id)">拒绝
            </a-link>
          </div>
          <div v-else-if="interfaceDrawerDetail.status === 4">
            <a-link @click="passInterfaceAudit(interfaceDrawerDetail.id)">通过</a-link>
          </div>
          <div v-else>
            <a-link status="danger"
                    @click="handlerRejectInterfaceAudit(interfaceDrawerDetail.id)">拒绝
            </a-link>
            <a-link @click="passInterfaceAudit(interfaceDrawerDetail.id)">通过</a-link>
          </div>
        </template>

        <a-descriptions>
          <a-descriptions-item v-for="item of interfaceInfoDrawerColumns" :label="item.label" :span="item.span">
            <pre v-if="item.dataIndex==='status'">{{ mapStatus.get(interfaceDrawerDetail[item.dataIndex]) }}</pre>
            <pre v-else>{{ interfaceDrawerDetail[item.dataIndex] ?? '无' }}</pre>

          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>

      <a-modal v-model:visible="rejectTipsModalVisible" @ok="handleRejectAuditTipsModalOk"
               @cancel="handleRejectTipsModalCancel">
        <template #title>
          输入拒绝原因
        </template>
        <a-input placeholder="请输入拒绝原因" v-model="rejectReason"></a-input>
        <!--        <div>是否真的要删除，此操作不可逆！</div>-->
      </a-modal>

    </template>

  </Container>

</template>

<script setup lang="ts">

import Container from "../../../../components/Container.vue";
import {onMounted, reactive, ref} from "vue";
import {
  getAuditInterface,
  updateAuditInterfaceStatus,
  updateInterfaceStatus,
} from "../../../../services/interfaceInfo";
import {Message} from "@arco-design/web-vue";

const interfaceDetailVisible = ref(false)
const rejectTipsModalVisible = ref(false)
const wantToRejectAuditId = ref()
const rejectReason = ref("")
const selectForm = reactive({
  current: 1,
  pageSize: 10,
  name: null,
  method: null,
  apiDescription: null,
  uri: null,
  host: null,
  status: null
})
const interfaceInfoLists = reactive<API.AuditInterfaceInfo[]>([])
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
    value: '1',
    text: '审核提交'
  },
  {
    value: '2',
    text: 'gpt审核没通过'
  },
  {
    value: '3',
    text: 'gpt审核通过'
  },
  {
    value: '4',
    text: '人工审核失败'
  },
  {
    value: '5',
    text: '人工审核通过(待发布)'
  },
  {
    value: '9',
    text: '已经发布'
  }
]);

const mapStatus = new Map([
  [1, '审核提交'],
  [2, 'gpt审核没通过'],
  [3, 'gpt审核通过'],
  [4, '人工审核失败'],
  [5, '人工审核通过(待发布)'],
  [9, '已经发布']
])
const fieldNames = {value: 'value', label: 'text'}


onMounted(() => {
  // 获取所有接口信息
  handlerSearchAllAuditInterface()
  Message.success('获取接口信息成功')
})

function handlerRejectInterfaceAudit(id: number) {
  wantToRejectAuditId.value = id
  rejectTipsModalVisible.value = true

}

const paginationProps = reactive({
  pageSize: 10,
  current: 1,
  total: 0,
  showTotal: (total: number) => `总 ${total} 条`,
})

function handlerTableChange(data) {
  paginationProps.current = data
  handlerSearchAllAuditInterface()
}

function interfaceOffLine(id: number) {
  updateInterfaceStatus({interfaceId: id, status: 0}).then((resp) => {
    if (!resp.code) {
      Message.success("操作成功")
      // 查询获取所有接口信息
      handlerSearchAllAuditInterface()
    } else {
      Message.error(resp.message)
      console.log(resp)
    }

  }).catch((err) => {
    Message.error(err.message)
    console.log(err)
  })

}


function handlerSearchAllAuditInterface() {
  selectForm.pageSize = paginationProps.pageSize
  selectForm.current = paginationProps.current

  getAuditInterface(selectForm).then((res) => {
    // interfaceInfoLists.slice(0,...res.data.records)
    interfaceInfoLists.length = 0
    interfaceInfoLists.push(...res.data.records)
    paginationProps.total = res.data.total
  }).catch((err) => {
    Message.error('获取接口信息失败')
    console.log(err)
  })

}

function handlerResetForm() {
  selectForm.current = 1;
  selectForm.pageSize = 10;
  selectForm.name = null;
  selectForm.method = null;
  selectForm.apiDescription = null;
  selectForm.uri = null;
  selectForm.host = null;
  selectForm.status = null
}


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


function handleRejectTipsModalCancel() {
  rejectTipsModalVisible.value = false
  rejectReason.value = ''
}

// TODO
function handleRejectAuditTipsModalOk() {
  updateAuditInterfaceStatus({auditId: wantToRejectAuditId.value, status: 4,description: rejectReason.value}).then((resp) => {
    if(!resp.code){
      Message.success("操作成功")
    }else{
      Message.error(resp.message)
    }
  }).catch((err)=>{
    Message.error(err.message)
    console.log(err)
  }).finally(()=>{
    rejectTipsModalVisible.value = false
    rejectReason.value = ''
    handlerSearchAllAuditInterface()
  })
}

function passInterfaceAudit(id:number) {
  updateAuditInterfaceStatus({auditId: id, status: 5}).then((resp) => {
    if(!resp.code){
      Message.success("操作成功")
    }else{
      Message.error(resp.message)
    }
  }).catch((err)=>{
    Message.error(err.message)
    console.log(err)
  }).finally(()=>{
    handlerSearchAllAuditInterface()
  })
}

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
    dataIndex: 'apiDescription',
    span: 5,

  },
  {
    label: '审核建议',
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
    dataIndex: 'apiDescription',
    ellipsis: true,
    width: 200,
    // ellipsis: true,
  },
  {
    title: '接口方法',
    dataIndex: 'method',
    width: 90
  },
  {
    title: '审核建议',
    dataIndex: 'description',
    width: 470
  },
  {
    title: '接口状态',
    dataIndex: 'status',
    render: (value: any) => {
      return mapStatus.get(value.record.status)
    },
  },

  {
    title: '操作',
    slotName: 'optional',
    width: 120

  }
]

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

.pass-or-reject-btn {
  display: flex;
}


</style>