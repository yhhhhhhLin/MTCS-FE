<template>
  <Container :navbar-default="'/interface/square'">
    <template v-slot:content>
      <a-card >
        <div class="interface-square-page">
          <div class="interface-square-title">
            接口广场
          </div>
          <div class="interface-square-content">
            <div class="interface-square-cards">

              <div  v-for="interfaceInfo in interfaceList">
                <a-card hoverable class="interface-square-card" @click="openInterfaceDetail(interfaceInfo.id)">
                  <div class="card-body-icon">
                    <div class="card-icon">
                      <icon-code-sandbox />
                    </div>
                    <div class="card-body">
                      <div class="name-and-status">
                        <div class="interfaceInfo-title">
                          {{interfaceInfo.name}}
                        </div>
                        <div class="interface-status">
                        <span v-if="interfaceInfo.status === 1" style="background-color: #E8FFEA;color: #00B42A;padding: 0px 8px" >
                          <icon-check-circle-fill />
                         可用
                        </span>
                          <span v-else style="background-color: #FFECE8;color:#F53F3F ;padding: 0px 8px">
                          <icon-check-circle-fill />
                          不可用
                        </span>
                        </div>
                      </div>
                      <div class="interfaceInfo-desc">
                        {{interfaceInfo.description}}
                      </div>
                    </div>

                  </div>
                </a-card>
              </div>
            </div>
          </div>
        </div>
      </a-card>

    </template>

  </Container>

</template>
<script setup lang="ts">

import Container from "../../components/Container.vue";
import {onMounted, reactive} from "vue";
import {getInterfaceList} from "../../services/interfaceInfo";
import {Message} from "@arco-design/web-vue";
import router from "../../router";


const selectForm = reactive({
  current: 1,
  pageSize: 50,
  name: null,
  status: null
})
const interfaceList = reactive<API.InterfaceInfo[]>([])

onMounted(()=>{

  getInterfaceList(selectForm).then(res=>{
    interfaceList.length = 0
    interfaceList.push(...res.data.records)
    console.log(res.data.records)
  }).catch((res)=>{
    Message.error(res.message)
    console.log(res)
  })
})

function openInterfaceDetail(id:number){
  // 跳转
  console.log(id)
  router.push({
    path: '/interface/detail/'+id,
  })
}

</script>

<style scoped>
.interface-square-page{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.interface-square-title{
  font-size: 16px;
}
.interface-square-content{
  font-size: 14px;
}
.interface-square-cards{
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
}
.interface-square-card{
  width: 250px;
  height: 150px;

}


.name-and-status{
  display: flex;
  gap: 10px;
}
.interfaceInfo-desc{
  font-size: 12px;
  line-height: 18px;
}
.card-body{
  display: flex;
  flex-direction: column;
  gap: 13px;
}
.card-body-icon{
  display: flex;
  gap: 8px;
}

.arco-card-bordered {
  border-radius: 10px;
}

</style>