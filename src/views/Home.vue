<template>
  <div class="home">
    <h1>进行记账</h1>
    <Form />
    <p>当前余额：{{ balance }} 元</p>
  </div>
</template>

<script>
import Form from '@/components/Form.vue'

export default {
  components: {
    Form
  },
  computed: {
    balance() {
      return this.$store.state.balance
    }
  },
  created() {
    // 获取当前的账单数据并计算余额
    this.$store.dispatch('fetchTransactions')
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
</style>
