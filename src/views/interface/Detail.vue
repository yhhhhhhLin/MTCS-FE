<template>

  <Container :navbar-default="'/interface/square'">
    <template v-slot:content>
      <div class="interface-detail-page">
        <div class="interface-detail-desc">
          <a-card>
            <a-descriptions bordered title="接口详细信息" size="medium">
              <a-descriptions-item v-for="item of interfaceInfoDrawerColumns" :label="item.label" :span="item.span">
                <div v-if="item.label==='接口状态'">
                  <span v-if="interfaceDrawerDetail[item.dataIndex]===1">可用</span>
                  <span v-else>不可用</span>

                </div>
                <span v-else>{{ interfaceDrawerDetail[item.dataIndex] ?? '无' }}</span>
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </div>
        <div class="interface-detail-remaining">
          <div class="rem-num-credits">
            <div class="remNum">
              剩余调用次数: {{ interfaceDrawerDetail.remNum ?? 0 }}
            </div>
            <div class="credits">
              剩余积分: {{ interfaceDrawerDetail.credits ?? 0 }}
            </div>
          </div>
          <a-button type="primary" @click="getFreeNum">获取免费调用次数</a-button>
        </div>
        <div class="interface-test">
          <a-card title="接口调试">
            <div class="interface-test-param-content">
              <div class="get-params-card">
                <div class="get-params-title">
                  get请求参数
                </div>
                <div class="get-params-content">
                  <a-form :model="testParams" :style="{width:'600px'}">
                    <a-form-item v-for="(requestParm,index) of testParams.getRequestParams"
                                 :field="`posts[${index}].value`"
                                 :label="`get请求参数-${index}`" style="width: 100%" :key="index">
                      <a-row :gutter="8">
                        <a-col :span="12">
                          <a-form-item field="getParams.key" validate-trigger="input" no-style>
                            <a-input v-model="requestParm.requestParmK" placeholder="请输入参数key"/>
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item field="together.lastname" validate-trigger="input" no-style>
                            <a-input v-model="requestParm.requestParmV" placeholder="请输入参数value"/>
                          </a-form-item>
                        </a-col>
                      </a-row>
                      <a-button @click="handleDelete(index)" :style="{marginLeft:'10px'}">删除</a-button>
                    </a-form-item>
                  </a-form>
                  <div>
                    <a-button @click="handleAdd" type="primary">添加get请求参数</a-button>
                  </div>
                </div>
              </div>
              <div class="post-params-card">
                <div class="post-params-title">post请求参数</div>
                <div class="post-params-content">
                  <a-textarea v-model="testParams.requestParams" auto-size/>
                </div>
              </div>
              <div class="test-btn">
                <a-button type="primary" @click="handleTest">测试</a-button>
              </div>

            </div>
          </a-card>
        </div>

        <div class="interface-test-result">
          <a-card title="返回结果">
            <pre>{{testResult}}</pre>
          </a-card>
        </div>
      </div>

    </template>
  </Container>
</template>

<script setup lang="ts">
import Container from "../../components/Container.vue";
import {onMounted, reactive, ref} from "vue";
import router from "../../router";
import {
  getInterfaceDetail,
  getInterfaceExperience,
  getRemCountAndCredits,
  invokeInterface
} from "../../services/interfaceInfo";
import {Message} from "@arco-design/web-vue";

const interfaceInfoDrawerColumns = [
  {
    label: '接口名称',
    dataIndex: 'name',
    span: 1
  },
  {
    label: '请求方法',
    dataIndex: 'method',
    span: 3
  },
  {
    label: '接口详细',
    dataIndex: 'description',
    span: 3
  },
  {
    label: '接口状态',
    dataIndex: 'status',
    span: 1,
  },
  {
    label: '接口总调用次数',
    dataIndex: 'allNum',
    span: 1
  },
  {
    label: '一次所需积分',
    dataIndex: 'pointsRequired',
    span: 3,
  },
  {
    label: '接口host',
    dataIndex: 'host',
    span: 2
  },
  {
    label: '接口地址',
    dataIndex: 'uri',
    span: 2
  },
  {
    label: '请求体参数',
    dataIndex: 'requestParams',
    span: 2
  },
  {
    label: 'get请求参数',
    dataIndex: 'getRequestParams',
    span: 2
  },
  {
    label: '请求头',
    dataIndex: 'requestHeader',
    span: 2
  },
  {
    label: '响应头',
    dataIndex: 'responseHeader',
    span: 2
  },
  {
    label: '创建时间',
    dataIndex: 'createTime',
    span: 1
  },
];
const interfaceDrawerDetail = reactive({
  name: '',
  description: '',
  method: '',
  uri: '',
  host: '',
  status: '',
  createTime: '',
  requestParams: '',
  getRequestParams: '',
  requestHeader: '',
  responseHeader: '',
  allNum: 0,
  remNum: 0,
  credits: 0,
  pointsRequired: 0,
})
const testResult = ref('')

function getRemNumAndCredits() {
  console.log('开始获取请求次数')
  getRemCountAndCredits({interfaceId: router.currentRoute.value.params.id})
      .then((resp)=>{
        if(!resp.code){
          interfaceDrawerDetail.remNum = resp.data.remNum
          interfaceDrawerDetail.credits = resp.data.credits
        }
      })
}

onMounted(() => {
  const id = router.currentRoute.value.params.id
  // 获取接口详细信息
  getInterfaceDetail({interfaceId: id})
      .then((res) => {
        if(!res.code){
          interfaceDrawerDetail.name = res.data.name
          interfaceDrawerDetail.description = res.data.description
          interfaceDrawerDetail.method = res.data.method
          interfaceDrawerDetail.uri = res.data.uri
          interfaceDrawerDetail.host = res.data.host
          interfaceDrawerDetail.status = res.data.status
          interfaceDrawerDetail.createTime = res.data.createTime
          interfaceDrawerDetail.requestParams = res.data.requestParams
          interfaceDrawerDetail.getRequestParams = res.data.getRequestParams
          interfaceDrawerDetail.requestHeader = res.data.requestHeader
          interfaceDrawerDetail.responseHeader = res.data.responseHeader
          interfaceDrawerDetail.allNum = res.data.allNum
          interfaceDrawerDetail.pointsRequired = res.data.pointsRequired
          getRemNumAndCredits()
        }else{
          Message.error(res.message)
        }
      })
      .catch((res) => {
        console.log(res)
      })


  console.log('id为：' + id)
})
const testParams = reactive({
  getRequestParams: [],
  requestParams: '',
  id: router.currentRoute.value.params.id
})
const handleAdd = () => {
  testParams.getRequestParams.push({
    requestParmK: '',
    requestParmV: '',
  })
  console.log(testParams.getRequestParams)
};

function handleTest() {
  invokeInterface(testParams).then((resp) => {
    if(resp?.code){
      Message.error(resp?.message)
    }else {
      Message.success('测试成功')
      testResult.value = resp
      getRemNumAndCredits()
    }
  }).catch((err) => {
    Message.error(err)
  })
}
function getFreeNum(){
  getInterfaceExperience({id:testParams.id}).then((res) => {
    if(!res.code){
      interfaceDrawerDetail.remNum = Number(res.data.remNum)
      Message.success('获取积分成功')
    }else{
      Message.error(res.message)
    }
  }).catch((err)=>{
    Message.error('获取失败')
    console.log(err)
  })
}

const handleDelete = (index) => {
  testParams.getRequestParams.splice(index, 1)
}

</script>

<style scoped>
.interface-detail-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.interface-detail-remaining {
  display: flex;
  justify-content: space-between;
}

.interface-detail-remaining {
  margin-top: 10px;
  font-size: 17px;
}

.get-params-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.interface-test-param-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-params-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rem-num-credits{
  display: flex;
  gap: 10px;
}

.arco-card-bordered {
  border-radius: 10px;
}

.arco-btn-size-medium {
  border-radius: 5px;
}

.test-btn {
  display: flex;
  justify-content: end;
}
</style>