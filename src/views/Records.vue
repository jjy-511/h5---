<template>
  <div class="records">
    <h1 style="text-align:center;font-size: 36px;">账单记录</h1>
    <List />
  </div>
</template>

<script>
import List from '@/components/List.vue'

export default {
  components: {
    List
  },
  created() {
    // 当页面加载时从 IndexedDB 中获取账单记录
    this.$store.dispatch('fetchTransactions')
  }
}
</script>

<style scoped>
.records {
  padding: 20px;
}
</style>
