<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import { X, Trash2, CalendarDays, ShoppingBag, Clock } from 'lucide-vue-next'

const cartStore = useCartStore()
const router = useRouter()

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const proceedToCheckout = () => {
  cartStore.toggleSidebar()
  router.push('/checkout')
}
</script>

<template>
  <div v-show="cartStore.isSidebarOpen" class="fixed inset-0 z-50 overflow-hidden">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity"
      @click="cartStore.toggleSidebar"
    ></div>

    <!-- Sidebar Menu -->
    <div class="fixed inset-y-0 right-0 max-w-md w-full flex">
      <div class="w-full h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        <!-- Header -->
        <div class="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <h2 class="text-xl font-serif font-semibold text-charcoal">Your Reservation</h2>
          <button @click="cartStore.toggleSidebar" class="p-2 text-gray-400 hover:text-charcoal transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="cartStore.items.length === 0 && !cartStore.restaurantReservation.reserved" class="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
            <ShoppingBag class="w-12 h-12 text-gray-300" />
            <p>Your cart is empty.</p>
            <button @click="cartStore.toggleSidebar" class="text-luxuryGold hover:text-champagneDark font-medium transition-colors">
              Continue Browsing
            </button>
          </div>

          <div v-else class="space-y-6">
            <!-- Reservation Dates Summary IF any dates selected -->
            <div v-if="cartStore.reservationDates.checkIn && cartStore.reservationDates.checkOut" class="bg-gray-50 p-4 rounded-lg flex items-start space-x-3">
              <CalendarDays class="w-5 h-5 text-luxuryGold mt-0.5 shrink-0" />
              <div>
                <p class="text-sm font-medium text-charcoal">Dates Selected</p>
                <p class="text-xs text-gray-500 mt-1">{{ cartStore.reservationDates.checkIn }} to {{ cartStore.reservationDates.checkOut }}</p>
              </div>
            </div>

            <!-- Table Reservation Summary -->
            <div v-if="cartStore.restaurantReservation.reserved" class="bg-gray-50 p-4 rounded-lg flex items-start space-x-3 relative">
              <Clock class="w-5 h-5 text-luxuryGold mt-0.5 shrink-0" />
              <div class="flex-1">
                <p class="text-sm font-medium text-charcoal">Table Reservation</p>
                <p class="text-xs text-gray-500 mt-1">{{ cartStore.restaurantReservation.date }} at {{ cartStore.restaurantReservation.time }}</p>
                <p class="text-xs text-gray-500">{{ cartStore.restaurantReservation.guests }} Guests</p>
              </div>
              <button @click="cartStore.clearTableReservation()" class="text-red-500 hover:text-red-700 transition-colors absolute top-4 right-4">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>

            <!-- Items List -->
            <ul class="space-y-4">
              <li v-for="item in cartStore.items" :key="item.id" class="flex py-4 border-b border-gray-100 last:border-0 relative">
                <img :src="item.image" :alt="item.name" class="h-20 w-20 rounded-md object-cover border border-gray-200" />
                
                <div class="ml-4 flex-1 flex flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-charcoal">
                      <h3 class="line-clamp-2 pr-4">{{ item.name }}</h3>
                      <p class="ml-4">{{ formatCurrency(item.price * item.quantity * (item.nights || 1)) }}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">
                      <span class="capitalize">{{ item.type }}</span>
                      <span v-if="item.nights" class="ml-2 text-luxuryGold font-medium">({{ item.nights }} Nights: {{ item.checkIn }} to {{ item.checkOut }})</span>
                    </p>
                  </div>
                  
                  <div class="flex-1 flex items-end justify-between text-sm mt-3">
                    <div class="flex items-center space-x-2 border border-gray-200 rounded-md">
                      <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="px-2 py-1 text-gray-500 hover:text-charcoal">-</button>
                      <span class="font-medium text-charcoal px-2">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="px-2 py-1 text-gray-500 hover:text-charcoal">+</button>
                    </div>

                    <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartStore.items.length > 0 || cartStore.restaurantReservation.reserved" class="border-t border-gray-100 p-6 bg-gray-50 space-y-4">
          <div class="flex justify-between text-base font-medium text-charcoal">
            <p>Subtotal</p>
            <p v-if="cartStore.items.length > 0">{{ formatCurrency(cartStore.totalPrice) }}</p>
            <p v-else>$0.00</p>
          </div>
          <p class="text-xs text-gray-500">Taxes and fees will be calculated at checkout.</p>
          
          <button 
            @click="proceedToCheckout"
            class="w-full flex items-center justify-center rounded-md border border-transparent bg-charcoal px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-darkNavy focus:outline-none focus:ring-2 focus:ring-luxuryGold focus:ring-offset-2 transition-all"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
