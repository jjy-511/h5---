<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">个人记账本@55220831蒋金佑</h1>
      <nav class="app-nav">
        <router-link to="/" exact-active-class="active">我要记账</router-link>
        <router-link to="/records" exact-active-class="active">账单记录</router-link>
        <router-link to="/stats" exact-active-class="active">统计图表</router-link>
      </nav>
    </header>
    <main class="app-content">
      <router-view />
    </main>
    <footer class="app-footer">
      <p>轻松管理你的收支，让生活更轻松！</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 应用容器 */
#app {
  font-family: Arial, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 40px;
  font-weight: bold;
}

.app-nav a {
  color: white;
  font-size: 30px;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.app-nav a:hover,
.app-nav .active {
  background-color: #388E3C;
}

.app-content {
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  background-image: url('D:\55220831jjy\src\assets\吉林大学.jpg');
  background-size: 60%; 
  background-position: center;
  background-repeat: no-repeat;
}

.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 28px;
}
</style>
