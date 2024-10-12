<template>
    <form class="transaction-form" @submit.prevent="submitTransaction">
      <div class="form-group">
        <label for="amount">金额：</label>
        <input
          id="amount"
          type="number"
          v-model="amount"
          required
          placeholder="请输入金额"
        />
      </div>
      <div class="form-group">
        <label for="type">类别：</label>
        <select id="type" v-model="type" required>
          <option value="" disabled>请选择类别</option>
          <option value="收入">收入</option>
          <option value="支出">支出</option>
        </select>
      </div>
      <div class="form-group">
        <label for="note">备注：</label>
        <input
          id="note"
          type="text"
          v-model="note"
          placeholder="请输入备注"
        />
      </div>
      <button class="submit-button" type="submit">提交</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        amount: 0,
        type: '',
        note: ''
      }
    },
    methods: {
      submitTransaction() {
        const transaction = {
          amount: this.amount,
          type: this.type,
          note: this.note,
          date: new Date().toISOString()
        }
        this.$store.dispatch('addTransaction', transaction)
        this.amount = 0
        this.note = ''
      }
    }
  }
  </script>
  
  <style scoped>
  .transaction-form {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 26px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 15px;
  font-size: 26px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4CAF50;
  outline: none;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 26px;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-button:hover {
  background-color: #388E3C;
}
  </style>
  