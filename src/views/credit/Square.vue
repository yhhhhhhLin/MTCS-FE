<template>
  <Container :navbarDefault="'/credit/square'">
    <template v-slot:content>
      <a-card>
        <p>
          购买积分
        </p>
        <div class="credit-products-square">
          <a-card v-for="i in 10" :key="i" class="credit-product-item">
            <div class="credit-item-body">
              <div class="credit-item-body-title">
                测试商品 {{i}}

              </div>
              <div class="credit-item-body-disc">

              </div>
              <div class="credit-item-body-price">

              </div>
              <div class="credit-item-body-picture">

              </div>
              <div class="credit-item-body-checkbox">
                <a-checkbox v-model="checkCredit"></a-checkbox>
              </div>



            </div>
          </a-card>
        </div>
      </a-card>



    </template>

  </Container>

</template>

<script setup lang="ts">


import Container from "../../components/Container.vue";
import {ref} from "vue";

const checkCredit = ref(false);
</script>

<style scoped>

.credit-products-square{
  display: flex;
  flex-wrap: wrap;
    .credit-product-item{
      flex-basis: 20%;
      margin: 5px;
      height: 200px;
      transition:  transform 0.3s;
  }

}
.credit-product-item:hover {
  transform: scale(1.03); /* 当鼠标悬停在弹性项上时，将弹性项的大小缩放为原来的 1.1 倍 */
}


.arco-card-bordered {
  border-radius: 10px;
  flex-direction: column;


}

</style>
