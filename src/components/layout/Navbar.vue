<script setup>
import { ShoppingBag, Menu, X } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart'
import { ref } from 'vue'

const cartStore = useCartStore()
const isMenuOpen = ref(false)

const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value
</script>

<template>
  <header class="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex flex-col items-center">
            <span class="text-2xl font-serif font-semibold text-luxuryGold tracking-wider uppercase">Adora</span>
            <span class="text-[0.65rem] tracking-[0.2em] text-charcoal font-medium uppercase mt-0.5">Hotel & Restaurant</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link to="/" class="text-charcoal hover:text-luxuryGold transition-colors font-medium text-sm tracking-wide uppercase">Home</router-link>
          <router-link to="/rooms" class="text-charcoal hover:text-luxuryGold transition-colors font-medium text-sm tracking-wide uppercase">Rooms & Suites</router-link>
          <router-link to="/restaurant" class="text-charcoal hover:text-luxuryGold transition-colors font-medium text-sm tracking-wide uppercase">Dining</router-link>
          <a href="/#events" class="text-charcoal hover:text-luxuryGold transition-colors font-medium text-sm tracking-wide uppercase">Events</a>
        </nav>

        <!-- Cart & Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <button @click="cartStore.toggleSidebar" class="relative p-2 text-charcoal hover:text-luxuryGold transition-colors">
            <ShoppingBag class="w-6 h-6" />
            <span v-if="cartStore.totalItems > 0" class="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-luxuryGold rounded-full border-2 border-white">
              {{ cartStore.totalItems }}
            </span>
          </button>
          
          <button @click="toggleMenu" class="md:hidden p-2 text-charcoal">
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div v-show="isMenuOpen" class="md:hidden bg-white border-b border-gray-100 absolute w-full pb-4 shadow-lg top-20">
      <div class="flex flex-col space-y-2 px-4 pt-2">
        <router-link to="/" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:bg-gray-50 hover:text-luxuryGold">Home</router-link>
        <router-link to="/rooms" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:bg-gray-50 hover:text-luxuryGold">Rooms & Suites</router-link>
        <router-link to="/restaurant" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:bg-gray-50 hover:text-luxuryGold">Dining</router-link>
        <a href="/#events" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:bg-gray-50 hover:text-luxuryGold">Events</a>
      </div>
    </div>
  </header>
</template>
