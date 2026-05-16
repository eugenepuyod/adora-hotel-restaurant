<script setup>
import { ref } from 'vue'
import { ShoppingCart, CalendarDays, Clock, Users, CheckCircle2 } from 'lucide-vue-next'
import { diningMenu } from '../data/mock'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const date = ref(cartStore.restaurantReservation.date || '')
const time = ref(cartStore.restaurantReservation.time || '')
const guests = ref(cartStore.restaurantReservation.guests || 2)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const reserveTable = () => {
  if (date.value && time.value && guests.value) {
    cartStore.reserveTable(date.value, time.value, guests.value)
    // Optional: Smooth scroll down to menu
  } else {
    alert("Please fill in all table reservation details.")
  }
}

const addFoodItem = (item) => {
  cartStore.addToCart(item)
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <h3 class="text-luxuryGold font-semibold tracking-wider uppercase text-sm">Gastronomic Excellence</h3>
        <h2 class="text-4xl font-serif text-charcoal mt-2">Adora Dining Reservation</h2>
        <div class="w-16 h-0.5 bg-luxuryGold mx-auto mt-6"></div>
        <p class="text-gray-500 mt-6 max-w-2xl mx-auto">
          Reserve your table at our world-renowned restaurant. Secure your spot and optionally pre-order our exquisite chef specialties.
        </p>
      </div>

      <!-- Table Reservation Form -->
      <div class="bg-white p-8 rounded-lg shadow-lg border border-gray-100 max-w-4xl mx-auto mb-16">
        <div v-if="cartStore.restaurantReservation.reserved" class="text-center py-6">
          <CheckCircle2 class="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 class="text-2xl font-serif text-charcoal mb-2">Table Reserved!</h3>
          <p class="text-gray-500 font-medium">
            Your table for {{ guests }} is held on {{ date }} at {{ time }}.
          </p>
          <p class="text-sm text-gray-400 mt-4">Now you may proceed to checkout or select dishes to pre-order below.</p>
          
          <button @click="cartStore.clearTableReservation()" class="mt-6 text-luxuryGold text-sm font-semibold hover:underline">
            Modify Reservation?
          </button>
        </div>
        
        <form v-else @submit.prevent="reserveTable" class="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div class="w-full">
            <label class="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <CalendarDays class="w-4 h-4 mr-2" /> Date
            </label>
            <input type="date" v-model="date" class="w-full border-b-2 border-gray-200 focus:border-luxuryGold bg-transparent py-2 outline-none text-charcoal font-medium" required />
          </div>
          
          <div class="w-full">
            <label class="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <Clock class="w-4 h-4 mr-2" /> Time
            </label>
            <select v-model="time" class="w-full border-b-2 border-gray-200 focus:border-luxuryGold bg-transparent py-2 outline-none text-charcoal font-medium" required>
              <option value="" disabled>Select Time</option>
              <option value="17:00">5:00 PM</option>
              <option value="18:30">6:30 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="21:30">9:30 PM</option>
            </select>
          </div>
          
          <div class="w-full">
            <label class="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <Users class="w-4 h-4 mr-2" /> Guests
            </label>
            <input type="number" min="1" max="12" v-model="guests" class="w-full border-b-2 border-gray-200 focus:border-luxuryGold bg-transparent py-2 outline-none text-charcoal font-medium" required />
          </div>
          
          <button type="submit" class="bg-charcoal text-white hover:bg-darkNavy w-full py-3 uppercase tracking-wider text-sm font-semibold transition-colors mt-4 md:mt-0 shadow">
            Hold Table
          </button>
        </form>
      </div>

      <!-- Pre-order Food Section -->
      <transition name="fade">
        <div v-if="cartStore.restaurantReservation.reserved">
          <div class="text-center mb-12">
            <h3 class="text-2xl font-serif text-charcoal">Pre-order Menu (Optional)</h3>
            <p class="text-gray-500 mt-2">Elevate your dining experience by pre-selecting our finest dishes.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="item in diningMenu" :key="item.id" class="bg-white border border-gray-100 shadow hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div class="h-56 overflow-hidden">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-3">
                  <h4 class="text-lg font-serif text-charcoal font-semibold pr-2">{{ item.name }}</h4>
                  <p class="text-luxuryGold font-medium">{{ formatCurrency(item.price) }}</p>
                </div>
                <p class="text-gray-500 text-sm font-light flex-1 mb-6">{{ item.description }}</p>
                <button 
                  @click="addFoodItem(item)"
                  class="w-full inline-flex items-center justify-center space-x-2 bg-gray-50 hover:bg-charcoal hover:text-white text-charcoal border border-gray-200 hover:border-charcoal py-2 transition-colors duration-300"
                >
                  <ShoppingCart class="w-4 h-4" />
                  <span class="uppercase tracking-wider text-xs font-semibold">Pre-order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
