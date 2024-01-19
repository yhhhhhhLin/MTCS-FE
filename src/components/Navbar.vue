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
<!--              如果是admin菜单，那么需要用户是admin角色才可以展示-->
              <div v-if="route?.meta?.requireAuth && userInfoStore.user.userRole==='admin'">
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
              <div v-else-if="!route?.meta?.requireAuth">
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

<!--              <a-sub-menu key="route.path">-->
<!--                <template #title>{{route.name}}</template>-->
<!--                <div v-for="routeChildren in route.children" :key="route.path">-->
<!--                  <a-menu-item :key="route.path+'/'+routeChildren.path" data-obj="1" @click="router.push(route.path+'/'+routeChildren.path)">-->
<!--                    <template #icon v-if="routeChildren?.meta?.icon">-->
<!--                      <component :is=routeChildren.meta.icon />-->
<!--                    </template>-->
<!--                    {{routeChildren.name}}-->
<!--                  </a-menu-item>-->
<!--                </div>-->
<!--              </a-sub-menu>-->

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


  </a-menu>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {defineExpose, onMounted, reactive, ref} from "vue";
import {routes} from "../router";
import {useUserInfoStore} from "../store/userInfo.ts";

const router = useRouter();
const refRoutes = reactive(routes);
const userInfoStore = useUserInfoStore();
const index1 = ref(0);
const index2 = ref(1);


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
