<template>
    <div class="transaction-list">
      <div class="filter-section">
        <label for="type">按类型筛选：</label>
        <select v-model="filters.type" id="type">
          <option value="">全部</option>
          <option value="收入">收入</option>
          <option value="支出">支出</option>
        </select>
  
        <label for="note">按备注筛选：</label>
        <input type="text" v-model="filters.note" id="note" placeholder="输入备注" />
  
        <label for="date">按日期筛选：</label>
        <input type="date" v-model="filters.date" id="date" />
      </div>
  
      <ul>
        <li v-for="(transaction, index) in paginatedTransactions" :key="index" class="transaction-item">
          <div class="transaction-details">
            <p class="transaction-info">
              <span class="transaction-date">{{ transaction.date }}</span>
              <span class="transaction-type">{{ transaction.type }}:</span>
              <span class="transaction-amount">{{ transaction.amount }}元</span>
              <span v-if="transaction.note" class="transaction-note">({{ transaction.note }})</span>
            </p>
          </div>
          <button class="delete-button" @click="deleteTransaction(transaction.id)">删除</button>
        </li>
      </ul>
  
      <!-- 分页按钮 -->
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 5, // 每页显示 5 条数据
        filters: {
          type: '', // 筛选类型
          note: '', // 筛选备注
          date: '', // 筛选日期
        },
      };
    },
    computed: {
        transactions() {
    // 获取并筛选交易记录
    return this.$store.state.transactions.filter(t => {
      // 格式化存储的日期为 YYYY-MM-DD 格式
      const formattedDate = new Date(t.date).toISOString().split('T')[0];
      return (
        (!this.filters.type || t.type === this.filters.type) && // 按类型筛选
        (!this.filters.note || t.note.includes(this.filters.note)) && // 按备注筛选
        (!this.filters.date || formattedDate === this.filters.date) // 按日期筛选
      );
    });
  },
      totalPages() {
        // 总页数
        return Math.ceil(this.transactions.length / this.itemsPerPage);
      },
      paginatedTransactions() {
        // 分页后的交易数据
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = this.currentPage * this.itemsPerPage;
        return this.transactions.slice(start, end);
      },
    },
    methods: {
      deleteTransaction(id) {
        this.$store.dispatch('deleteTransaction', id);
      },
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
    },
    created() {
      this.$store.dispatch('fetchTransactions');
    },
  };
  </script>
  
  <style scoped>
  .transaction-list {
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    padding: 26px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .filter-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .transaction-item:last-child {
    border-bottom: none;
  }
  
  .transaction-details {
    font-size: 24px;
    flex-grow: 1;
  }
  
  .transaction-info {
    font-size: 24px;
    color: #333;
  }
  
  .transaction-date {
    font-size: 24px;
    color: #888;
    margin-right: 10px;
  }
  
  .transaction-type {
    font-size: 24px;
    font-weight: bold;
    color: #4CAF50;
  }
  
  .transaction-amount {
    color: purple;
    font-size: 24px;
    margin-left: 5px;
  }
  
  .transaction-note {
    font-size: 24px;
    color: #666;
    font-style: italic;
    margin-left: 5px;
  }
  
  .delete-button {
    font-size: 24px;
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .delete-button:hover {
    background-color: #d32f2f;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .pagination button {
    font-size: 26px;
    margin: 0 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .pagination button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  </style>
  