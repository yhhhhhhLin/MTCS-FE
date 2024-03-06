<template>
  <Container :navbarDefault="'/credit/square'">
    <template v-slot:content>

      <a-card title="购买积分">
        <div class="credit-products-square">
          <a-radio-group v-model="checkCredit">
            <template v-for="creditProduct in creditProducts" :key="creditProduct.id" class="credit-product-items">
              <a-radio :value="creditProduct.id">
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
                          {{ creditProduct.description }}
                        </div>
                        <div class="credit-product-item-title-price">
                          ￥ {{ creditProduct.price }}
                        </div>
                      </div>
                      <a-typography-text type="secondary">
                        <div class="credit-product-item-body">
                          <div class="credit-product-item-body-img">
                            <a-image
                                width="200" height="200px"
                                :src="creditProduct.picture"
                            />
                          </div>

                        </div>

                      </a-typography-text>
                    </div>
                  </a-space>
                </template>
              </a-radio>
            </template>
          </a-radio-group>
          <div class="credit-product-opt">
            <div class="credit-product-opt-buy">
              <a-button @click="showOrderModal" type="primary">购买</a-button>
            </div>
          </div>

        </div>


      </a-card>

      <a-modal v-model:visible="creditProductOrderVisible"
               @ok="handlerOrderSubmit"
               @cancel="handleOrderCancel"
               ok-text="提交订单"
      >
        <template #title>
          订单页面
        </template>
        <div class="order-confirmed-body">
          <div class="order-confirmed-body-num-title">
            <span> 商品名称： {{ nowCreditProduct?.description }}</span>
          </div>

          <div class="order-confirmed-body-price">
            <span>商品单价： {{ nowCreditProduct?.price }}</span>
          </div>

        <div class="order-confirmed-body-pay-type">
          支付方式：
          <a-radio-group v-model="nowPayType">
            <a-radio value="1">
              <div class="order-confirmed-body-pay-type-img">
                <img src="../../assets/alpayImg.png" style="width: 100px;height: 100px" alt="支付宝支付">
              </div>
            </a-radio>
            <a-radio value="2" disabled>
              <div class="order-confirmed-body-pay-type-img">
                <img src="../../assets/wechatImg.png" style="width: 100px;height: 100px" alt="微信支付">
              </div>
            </a-radio>
          </a-radio-group>

          <a-divider type="vertical"/>
          <span>
            微信支付
          </span>


        </div>

          <div class="order-confirmed-body-end">
            <div class="order-confirmed-body-num">
              <a-input-number :style="{width:'110px'}"
                              mode="button"
                              v-model="nowCreditProductNum"
                              min="1"
                              max="10"
                              size="small"
                              :default-value="1"
                              class="input-demo"/>
            </div>

            <div class="order-confirmed-body-total">
              总价：￥{{ nowCreditProduct?.price * nowCreditProductNum}}
            </div>

          </div>
        </div>
      </a-modal>

    </template>


  </Container>

</template>

<script setup lang="ts">


import Container from "../../components/Container.vue";
import {onMounted, reactive, ref} from "vue";
import {createCreditProductOrder, getCreditProductList, payCreditProductOrder} from "../../services/creditProducts";
import {Message} from "@arco-design/web-vue";

const checkCredit = ref(0);

const creditProducts = reactive<API.CreditProduct[]>([])
const creditProductOrderVisible = ref(false)
const nowCreditProduct = ref<API.CreditProduct>(null)
const nowCreditProductNum = ref(1)
const nowPayType = ref(1)

onMounted(() => {
  // 获取所有的积分商品
  getCreditProductList().then(res => {
    creditProducts.push(...res.data)
  })
})


function showOrderModal() {
  creditProducts.map((creditProduct) => {
    if (creditProduct.id === checkCredit.value) {
      nowCreditProduct.value = creditProduct
    }
  })
  nowCreditProductNum.value = 1
  creditProductOrderVisible.value = true
}

function handlerOrderSubmit() {
  creditProductOrderVisible.value = false
  createCreditProductOrder({productId:checkCredit.value,num:nowCreditProductNum.value,payType: nowPayType.value})
      .then(res => {
        // 返回订单号后，需要创建支付
        if(!res.code){
          Message.info("正在跳转到支付地址中...")
          payCreditProductOrder({orderNum: res.data.orderNo,type: nowPayType.value}).then((res)=>{
            console.log(res)
          }).catch(err => {
            Message.error(err)
          })

        }else{
          Message.error(res.message)
        }
      }).catch(err => {
        console.log(err)
  })

}

function handleOrderCancel() {
  creditProductOrderVisible.value = false
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


.credit-product-item-title-text {
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

.credit-product-opt {
  display: flex;
  justify-content: end;
  width: 100%;
  margin: 0 70px;
}

.order-confirmed-body{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-confirmed-body-pay-type-img{
  display: flex;
  flex-direction: column;
}

.order-confirmed-body-num-title{
  font-size: 20px;
  font-weight: bold;
}

.order-confirmed-body-end{
  display: flex;
  gap: 10px;
  justify-content: end;
  .order-confirmed-body-total{
    display: flex;
    align-items: end;
  }
}
</style>
