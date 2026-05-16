<script setup>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import CartSidebar from './components/ui/CartSidebar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans bg-gray-50 text-charcoal">
    <Navbar />
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
    
    <CartSidebar />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
