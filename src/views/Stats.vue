<template>
    <div class="stats">
      <h1 style="font-size: 36px;">统计数据</h1>
      <div class="chart-container">
        <!-- 条形图展示收入与支出的对比 -->
        <canvas id="barChart"></canvas>
      </div>
      <div class="chart-container">
        <!-- 饼图展示支出分类 -->
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js/auto'
  
  export default {
    computed: {
      income() {
        return this.$store.state.transactions
          .filter(t => t.type === '收入')
          .reduce((sum, t) => sum + t.amount, 0)
      },
      expense() {
        return this.$store.state.transactions
          .filter(t => t.type === '支出')
          .reduce((sum, t) => sum + t.amount, 0)
      },
      categoryExpenses() {
        return this.$store.state.transactions
          .filter(t => t.type === '支出')
          .reduce((categories, t) => {
            if (!categories[t.note]) categories[t.note] = 0
            categories[t.note] += t.amount
            return categories
          }, {})
      }
    },
    mounted() {
      // 渲染条形图和饼图
      this.renderBarChart()
      this.renderPieChart()
    },
    methods: {
      renderBarChart() {
        const ctx = document.getElementById('barChart').getContext('2d')
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['收入', '支出'],
            datasets: [
              {
                label: '金额',
                data: [this.income, this.expense],
                backgroundColor: ['green', 'red']
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })
      },
      renderPieChart() {
        const ctx = document.getElementById('pieChart').getContext('2d')
        const data = Object.values(this.categoryExpenses)
        const labels = Object.keys(this.categoryExpenses)
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels,
            datasets: [
              {
                data,
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .stats {
    font-size: 26px;
    padding: 20px;
    text-align: center;
  }
  
  .chart-container {
    font-size: 26px;
    max-width: 1600px;
    width: 100%;
    margin: 0 auto;
  }
  </style>
  