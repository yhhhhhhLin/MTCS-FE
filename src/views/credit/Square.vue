<template>
  <Container :navbarDefault="'/credit/square'">
    <template v-slot:content>

      <a-card title="购买积分">
        <div class="credit-products-square">
          <a-radio-group v-model="checkCredit">
            <template v-for="item in 10" :key="item" class="credit-product-items">
              <a-radio :value="item">
                <template #radio="{ checked }">
                  <a-space
                      align="start"
                      class="custom-radio-card"
                      :class="{ 'custom-radio-card-checked': checked }"
                  >
                    <div class="custom-radio-card-mask">
                      <div class="custom-radio-card-mask-dot"/>
                    </div>
                    <div>
                      <div class="credit-product-item-title">
                        <div class="credit-product-item-title-text">
                          这是商品 {{ item }}
                        </div>
                        <div class="credit-product-item-title-price">
                          19.{{item}}
                        </div>
                      </div>
                      <a-typography-text type="secondary">
                        <div class="credit-product-item-body">
                          <div class="credit-product-item-body-img">
                            <img src="../../assets/credit-product-img.png" style="width: 100%" height="200px" alt="这是图">
                          </div>

                        </div>

                      </a-typography-text>
                    </div>
                  </a-space>
                </template>
              </a-radio>
            </template>
          </a-radio-group>

          <a-button @click="showCheckCreditId" type="primary">获取当前id</a-button>
        </div>


      </a-card>


    </template>

  </Container>

</template>

<script setup lang="ts">


import Container from "../../components/Container.vue";
import {ref} from "vue";

const checkCredit = ref(0);


function showCheckCreditId() {
  alert(checkCredit.value)
}

</script>

<style scoped>

.credit-products-square {
  display: flex;
  flex-wrap: wrap;

  .credit-product-item {
    flex-basis: 20%;
    margin: 5px;
    height: 200px;
    transition: transform 0.3s;
  }

}

.credit-product-item:hover {
  transform: scale(1.03); /* 当鼠标悬停在弹性项上时，将弹性项的大小缩放为原来的 1.1 倍 */
}


.arco-card-bordered {
  border-radius: 10px;
  flex-direction: column;


}


.custom-radio-card {
  padding: 10px 16px;
  margin-bottom: 20px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.credit-product-item-title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--color-text-1);
  margin-bottom: 8px;
}
.credit-product-item-title-text{
  font-size: 17px;
  font-weight: bold;

}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .credit-product-item-title,
.custom-radio-card-checked .credit-product-item-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}

</style>
