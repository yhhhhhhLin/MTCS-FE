<template>
  <Container :navbarDefault="'/gen'">
    <template v-slot:content>
      <div class="gen-body">
        <div class="gen-title">springBoot项目初始化脚手架</div>
        <div class="project-name-div">
          <div class="project-name-title">
            <h3>authorName:</h3>
          </div>
          <div class="project-name-input">
            <input type="text" placeholder="作者名字" class="underline" v-model="dataModel.authorName">
          </div>
        </div>
        <div class="project-group-div">
          <div class="project-group-title">
            <h3>项目Group:</h3>
          </div>
          <!--          下划线输入框-->

          <div class="project-group-input">
            <input type="text" placeholder="请输入项目Group" class="underline" v-model="dataModel.groupName">
          </div>
        </div>
        <div class="project-artifact-div">
          <div class="project-artifact-title">
            <h3>项目artifact:</h3>
          </div>
          <div class="project-artifact-input">
            <input type="text" placeholder="请输入项目artifact" class="underline" v-model="dataModel.artifactName">
          </div>
        </div>
        <div class="project-dependency-div">
          <div class="project-dependency-title" @click="dependencyList = !dependencyList">
            <div class="dependency-icon-title">
              <div class="dependency-drop-icon">
                <div v-if="!dependencyList">
                  <icon-right />
                </div>
                <div v-else>
                  <icon-down />
                </div>
              </div>
              <h3>项目dependency</h3>
            </div>
            <div v-if="checkDependency.length>0">
              已选 {{checkDependency.length}}
            </div>

          </div>
          <div class="project-dependency-input">
            <div v-if="dependencyList">
              <a-checkbox-group v-model="checkDependency">
                <template v-for="item in dependencyInfos" :key="item">
                  <a-checkbox :value="item.id" @click="dataModel[item.fieldName] = true">
                    <template #checkbox="{ checked }">
                      <a-space
                          align="start"
                          class="custom-checkbox-card"
                          :class="{ 'custom-checkbox-card-checked': checked }"
                      >
                        <div className="custom-checkbox-card-mask">
                          <div className="custom-checkbox-card-mask-dot"/>
                        </div>
                        <div>
                          <div className="custom-checkbox-card-title">
                            {{item.infoName}}
                          </div>
                          <a-typography-text type="secondary">
                            {{item.infoDesc}}
                          </a-typography-text>
                        </div>
                      </a-space>
                    </template>
                  </a-checkbox>
                </template>

              </a-checkbox-group>
            </div>

          </div>
        </div>
        <div class="project-other-div">
          <div class="project-dependency-title" @click="otherList = !otherList">
            <div class="dependency-icon-title">
              <div class="dependency-drop-icon">
                <div v-if="!otherList">
                  <icon-right />
                </div>
                <div v-else>
                  <icon-down />
                </div>
              </div>
              <h3>项目其他配置</h3>
            </div>
            <div v-if="checkOther.length>0">
              已选 {{checkOther.length}}
            </div>
          </div>
          <div class="project-other-input">
            <div v-if="otherList">
              <a-checkbox-group v-model="checkOther">
                <template v-for="item in otherInfos" :key="item">
                  <a-checkbox :value="item.id" @click="dataModel[item.fieldName] = true">
                    <template #checkbox="{ checked }">
                      <a-space
                          align="start"
                          class="custom-checkbox-card"
                          :class="{ 'custom-checkbox-card-checked': checked }"
                      >
                        <div className="custom-checkbox-card-mask">
                          <div className="custom-checkbox-card-mask-dot"/>
                        </div>
                        <div>
                          <div className="custom-checkbox-card-title">
                            {{item.infoName}}
                          </div>
                          <a-typography-text type="secondary">
                            {{item.infoDesc}}
                          </a-typography-text>
                        </div>
                      </a-space>
                    </template>
                  </a-checkbox>
                </template>

              </a-checkbox-group>
            </div>

          </div>
        </div>

        <div class="gen-opt">
          <a-button type="primary" @click="handlerGen">获取模板</a-button>
        </div>

      </div>
    </template>
  </Container>
</template>

<script setup lang="ts">

import Container from "../../components/Container.vue";
import {reactive, ref} from "vue";
import {genProject} from "../../services/gen";

const checkDependency = ref<String[]>([])
const checkOther = ref<String[]>([])
const dependencyList = ref(false)
const otherList = ref(false)
import { saveAs } from 'file-saver';

const dependencyInfos = reactive<API.genModelInfo[]>([
  {id: 1 ,infoName: "SpringBoot-web",infoDesc: "springBoot-web的依赖，包含springBoot-web和test",fieldName:"needBootWeb"},
  {id: 2,infoName: "SpringBoot Aop",infoDesc:"springBoot aop依赖",fieldName: "needBootAop"},
  {id: 3, infoName: "Mysql",infoDesc:"Mysql数据库依赖",fieldName: "needMysql"},
  {id: 4, infoName: "Mybatis-Plus",infoDesc:"mybatis-plus依赖,数据库框架",fieldName: "needMybatisPlus"},
  {id: 5, infoName: "Mybatis",infoDesc:"mybatis依赖，数据库框架",fieldName: "needMybatis"},
  {id: 6, infoName: "Redis",infoDesc:"redis依赖，数据库框架",fieldName: "needRedis"},
  {id: 7, infoName: "Gson",infoDesc:"gson依赖，谷歌的json解析库",fieldName: "needGson"},
  {id: 8, infoName: "FastJson",infoDesc:"fastJson依赖，json解析库",fieldName: "needFastJson"},
  {id: 9, infoName: "Hutool",infoDesc:"hutool依赖，工具类，有多种现成的工具类",fieldName: "needHutool"},
  {id: 10, infoName: "Knife4j",infoDesc:"knife4j依赖，接口文档",fieldName: "needKnife4j"},
])


const otherInfos = reactive<API.genModelInfo[]>([
  {id: 1 ,infoName: "表单实例代码",infoDesc: "包括对应controller-service-mapper和sql语句",fieldName:"needPostExample"},
  {id: 2,infoName: "User实例代码",infoDesc:"有权限校验实例代码和拦截器实例代码",fieldName: "needUserExample"},
  {id: 3, infoName: "cors配置文件",infoDesc:"跨域配置文件",fieldName: "needCors"},
])

const dataModel = reactive<API.DataModel>({artifactName: "backed",groupName:"shop.linyh"})

function handlerGen() {
  genProject(dataModel).then((resp)=>{
    // 创建一个新的Blob对象，使用从后端收到的数据
    let filename = dataModel.artifactName+".zip";
    _customDownLoadZipGet(resp.data, filename);
  }).catch((err)=>{
    console.log("发送失败"+err)
  })
}
const _customDownLoadZipGet = (data, fileName) => {
  const blob = new Blob([data]);
  const downloadElement = document.createElement("a");
  const href = window.URL.createObjectURL(blob);
  //后台再header中传文件名
  downloadElement.href = href;
  downloadElement.download = fileName;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};


</script>


<style scoped>
.arco-card-bordered {
  border-radius: 10px;
}
.gen-title{
  font-size: 16px;
  padding-bottom: 20px;

}

.gen-body {
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  border-radius: 10px;
  width: 95%;
  height: 98%;
  padding: 20px 40px;
}

.project-name-div {
  display: flex;
  align-items: center;
  gap: 30px;

  .project-name-input {

  }
}

.project-group-div {
  display: flex;
  align-items: center;
  gap: 30px;
}

.project-artifact-div {
  display: flex;
  align-items: center;
  gap: 30px;
}

.project-dependency-title{
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  justify-content: space-between;
  padding-right: 100px;
}
.dependency-icon-title{
  display: flex;
  gap: 5px;
  align-items: center;
}

.project-name-title{
  width: 110px;
}
.project-artifact-title{
  width: 110px;
}
.project-group-title{
  width: 110px;
}

.underline {
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2); /* 默认下划线样式较透明 */
  outline: none;
  width: 400px;
  padding: 10px 0;
  transition: border-bottom 0.3s; /* 添加过渡效果让下划线变化更平滑 */
}

.underline:focus {
  border-bottom: 2px solid rgba(0, 0, 0, 0.8); /* 获得焦点时下划线更黑 */
}

.custom-checkbox-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-checkbox-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.custom-checkbox-card:hover,
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked .custom-checkbox-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}

.dependency-drop-div{
  display: flex;
  background-color: #F2F3F5;
}

.gen-opt{
  display: flex;
  justify-content: flex-end;
  padding-right: 100px;
}

</style>