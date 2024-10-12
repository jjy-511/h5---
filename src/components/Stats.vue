<template>
    <div>
    <canvas id="barChart"></canvas>
    <canvas id="pieChart"></canvas>
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
    this.renderBarChart()
    this.renderPieChart()
    },
    methods: {
    renderBarChart() {
    new Chart(document.getElementById('barChart'), {
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
    }
    })
    },
    renderPieChart() {
    const data = Object.values(this.categoryExpenses)
    const labels = Object.keys(this.categoryExpenses)
    new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
    labels,
    datasets: [
    {
    data,
    backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
    }
    ]
    }
    })
    }
    }
    }
    </script>