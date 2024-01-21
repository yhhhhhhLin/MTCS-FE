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

              <div class="interface-square-card" v-for="i in 10">
                <a-card hoverable>
                  <div class="interfaceInfo-title">
                    标题
                  </div>
                  <div class="interfaceInfo-desc">
                    第{{i}}个描述
                  </div>
                  <div class="interface-price">
                    第{{i}}价格
                  </div>
                  <div class="interface-status">
                    这里是状态
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

</style>