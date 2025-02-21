<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const tg = ref(null);
const products = ref([
  { id: 1, name: "MacBook Pro", price: 1500, quantity: 1 },
  { id: 2, name: "iPhone 14", price: 999, quantity: 1 },
  { id: 3, name: "AirPods Pro", price: 249, quantity: 1 }
]);

const cart = ref([]);

const addToCart = (product) => {
  const item = cart.value.find((p) => p.id === product.id);
  if (item) {
    item.quantity++;
  } else {
    cart.value.push({ ...product });
  }
};

const removeFromCart = (product) => {
  cart.value = cart.value.filter((p) => p.id !== product.id);
};

// Отправка заказа в бэкенд
const sendOrder = async () => {
  if (!tg.value) {
    console.error("Telegram WebApp API не загружен");
    return;
  }

  const orderData = {
    user: tg.value.initDataUnsafe?.user || "Unknown User",
    items: cart.value
  };

  try {
    await axios.post("https://your-backend.com/api/orders", orderData);
    tg.value.showAlert("✅ Заказ оформлен!");
    cart.value = []; // Очищаем корзину
  } catch (error) {
    tg.value.showAlert("❌ Ошибка при оформлении заказа");
  }
};

// Загружаем Telegram API
onMounted(() => {
  if (typeof window.Telegram !== "undefined" && window.Telegram.WebApp) {
    tg.value = window.Telegram.WebApp;
    tg.value.expand(); // Разворачиваем WebView
    console.log("✅ Telegram WebApp API загружен", tg.value);
  } else {
    console.error("❌ Telegram WebApp API не найден");
  }
});
</script>

<template>
  <div class="app">
    <h1>🛒 Магазин</h1>

    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product">
        <h3>{{ product.name }}</h3>
        <p>💰 {{ product.price }}$</p>
        <button @click="addToCart(product)">Добавить в корзину</button>
      </div>
    </div>

    <h2>🛍️ Корзина</h2>
    <div v-if="cart.length">
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - {{ item.quantity }} шт. ({{ item.price * item.quantity }}$)
          <button @click="removeFromCart(item)">❌</button>
        </li>
      </ul>
      <button @click="sendOrder" class="order-btn">Оформить заказ</button>
    </div>
    <p v-else>Корзина пуста</p>
  </div>
</template>

<style>
.app {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}
.product-list {
  display: flex;
  justify-content: center;
  gap: 15px;
}
.product {
  border: 1px solid #ccc;
  padding: 10px;
  width: 150px;
}
.order-btn {
  background-color: #0088cc;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>
