import { createStore } from 'vuex'
import { openDB } from 'idb'

const dbPromise = openDB('budget-app', 1, {
  upgrade(db) {
    const store = db.createObjectStore('transactions', {
      keyPath: 'id',
      autoIncrement: true
    })
    store.createIndex('date', 'date')
  }
})

export default createStore({
  state: {
    transactions: [],
    balance: 0
  },
  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions
    },
    updateBalance(state) {
      const income = state.transactions
        .filter(t => t.type === '收入')
        .reduce((sum, t) => sum + t.amount, 0)
      const expense = state.transactions
        .filter(t => t.type === '支出')
        .reduce((sum, t) => sum + t.amount, 0)
      state.balance = income - expense
    }
  },
  actions: {
    async addTransaction({ dispatch }, transaction) {
      const db = await dbPromise
      await db.add('transactions', transaction)
      dispatch('fetchTransactions')
    },
    async fetchTransactions({ commit }) {
      const db = await dbPromise
      const transactions = await db.getAll('transactions')
      commit('setTransactions', transactions)
      commit('updateBalance')
    },
    async deleteTransaction({ dispatch }, id) {
      const db = await dbPromise
      await db.delete('transactions', id)
      dispatch('fetchTransactions')
    }
  }
})
