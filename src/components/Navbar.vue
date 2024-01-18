<template>
  <a-menu
      :style="{  height: '100%' }"
      show-collapse-button
      @collapse="onCollapse"
      :default-selected-keys=[props.default]
  >
    <!--        利用for循环将router里面的路由展示出来-->
        <div v-for="route in refRoutes" :key="route.path">
          <div v-if="route?.meta?.fixedNav">
    <!--        有子菜单的-->
            <div v-if="route?.children?.length">

              <a-sub-menu key="route.path">
                <template #title>{{route.name}}</template>
                <div v-for="routeChildren in route.children" :key="route.path">
                  <a-menu-item :key="route.path+'/'+routeChildren.path" data-obj="1" @click="router.push(route.path+'/'+routeChildren.path)">
                    <template #icon v-if="routeChildren?.meta?.icon">
                      <component :is=routeChildren.meta.icon />
                    </template>
                    {{routeChildren.name}}
                  </a-menu-item>
                </div>
              </a-sub-menu>

            </div>
    <!--        没有子菜单的-->
            <div v-else>
              <a-menu-item :key="route.path" data-obj="1" @click="router.push(route.path)">
                <template #icon v-if="route?.meta?.icon">
                  <component :is=route.meta.icon />
                </template>
                {{route.name}}
              </a-menu-item>
            </div>
          </div>
        </div>




    <!--    <a-menu-item key="0" data-obj="1" @click="router.push('/')">-->
    <!--      <template #icon>-->
    <!--        <icon-home></icon-home>-->
    <!--      </template>-->
    <!--      首页-->
    <!--    </a-menu-item>-->
    <!--    <a-menu-item key="1" data-obj="1" @click="router.push('/gptChat')">-->
    <!--      <template #icon>-->
    <!--        <icon-computer/>-->
    <!--      </template>-->
    <!--      GPT聊天-->
    <!--    </a-menu-item>-->
    <!--    <a-sub-menu key="2">-->
    <!--      &lt;!&ndash; TODO icon&ndash;&gt;-->
    <!--      &lt;!&ndash; <template #icon><icon-apps></icon-apps></template> &ndash;&gt;-->
    <!--      <template #title>下拉式</template>-->
    <!--      <a-menu-item key="2_0">下拉菜单 1</a-menu-item>-->
    <!--      <a-menu-item key="2_1">下拉菜单 2</a-menu-item>-->
    <!--      <a-menu-item key="2_2" disabled>Menu 3</a-menu-item>-->
    <!--    </a-sub-menu>-->
    <!--    <a-menu-item key="3" data-obj="3" @click="router.push('/admin')">-->
    <!--      <template #icon>-->
    <!--        <icon-computer/>-->
    <!--      </template>-->
    <!--      管理员页面测试-->
    <!--    </a-menu-item>-->
  </a-menu>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {defineExpose, onMounted, reactive, ref} from "vue";
import {routes} from "../router";

const router = useRouter();
const refRoutes = reactive(routes);
const index1 = ref(0);
const index2 = ref(1);

onMounted(() => {
  console.log(refRoutes)
});

const props = defineProps({
  default: {
    type: String,
    default: '0'
  },
  onCollapse: Function
});


const onCollapse = ref((val, type) => {
  if (props.onCollapse) {
    props.onCollapse(val, type)
  }
});

defineExpose({onCollapse});
</script>
<style scoped>


</style>
