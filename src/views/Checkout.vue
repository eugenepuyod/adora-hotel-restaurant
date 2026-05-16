<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { CheckCircle2, CreditCard, Building2, Smartphone } from 'lucide-vue-next'

const cartStore = useCartStore()
const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  paymentMethod: 'mastercard'
})

const isProcessing = ref(false)
const isSuccess = ref(false)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const taxAmount = computed(() => cartStore.totalPrice * 0.12)
const grandTotal = computed(() => cartStore.totalPrice + taxAmount.value)

const processCheckout = () => {
  // Simple validation
  if (!form.value.firstName || !form.value.email) {
    alert("Please fill in required guest details.")
    return
  }
  
  isProcessing.value = true

  // Mock processing delay
  setTimeout(() => {
    isProcessing.value = false
    isSuccess.value = true
    cartStore.clearCart()
  }, 2000)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Success State -->
      <div v-if="isSuccess" class="bg-white p-12 text-center shadow-lg border border-gray-100 rounded-lg max-w-2xl mx-auto transform animate-[fade-in-up_0.5s_ease-out_forwards]">
        <CheckCircle2 class="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 class="text-3xl font-serif text-charcoal mb-4">Reservation Confirmed!</h2>
        <p class="text-gray-500 mb-8">Thank you, {{ form.firstName }}. Your booking and order have been successfully processed via <span class="font-semibold capitalize">{{ form.paymentMethod }}</span>. A confirmation email has been sent to {{ form.email }}.</p>
        <button @click="goHome" class="bg-charcoal text-white hover:bg-darkNavy px-8 py-3 uppercase tracking-wider text-sm font-semibold transition-colors">
          Return to Home
        </button>
      </div>

      <!-- Checkout Form -->
      <div v-else-if="cartStore.items.length > 0 || cartStore.restaurantReservation.reserved">
        <h1 class="text-3xl font-serif text-charcoal mb-8">Checkout</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Left Column: Forms -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- Guest Details -->
            <div class="bg-white p-8 shadow-sm border border-gray-100 rounded-lg">
              <h3 class="text-xl font-serif text-charcoal mb-6 border-b border-gray-100 pb-4">Guest Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input type="text" v-model="form.firstName" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-luxuryGold focus:border-luxuryGold border p-2" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" v-model="form.lastName" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-luxuryGold focus:border-luxuryGold border p-2" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" v-model="form.email" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-luxuryGold focus:border-luxuryGold border p-2" required />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" v-model="form.phone" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-luxuryGold focus:border-luxuryGold border p-2" />
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white p-8 shadow-sm border border-gray-100 rounded-lg">
              <h3 class="text-xl font-serif text-charcoal mb-6 border-b border-gray-100 pb-4">Payment Method</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- MasterCard -->
                <label class="relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors" :class="form.paymentMethod === 'mastercard' ? 'border-luxuryGold bg-champagne/10' : 'border-gray-200 hover:bg-gray-50'">
                  <input type="radio" v-model="form.paymentMethod" value="mastercard" class="sr-only" />
                  <CreditCard class="w-6 h-6 text-charcoal mr-3" />
                  <span class="font-medium text-charcoal">MasterCard</span>
                  <div v-if="form.paymentMethod === 'mastercard'" class="absolute right-4 w-4 h-4 bg-luxuryGold rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </label>

                <!-- BDO -->
                <label class="relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors" :class="form.paymentMethod === 'bdo' ? 'border-luxuryGold bg-champagne/10' : 'border-gray-200 hover:bg-gray-50'">
                  <input type="radio" v-model="form.paymentMethod" value="bdo" class="sr-only" />
                  <Building2 class="w-6 h-6 text-blue-800 mr-3" />
                  <span class="font-medium text-charcoal">BDO Bank Transfer</span>
                  <div v-if="form.paymentMethod === 'bdo'" class="absolute right-4 w-4 h-4 bg-luxuryGold rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </label>

                <!-- PayPal -->
                <label class="relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors" :class="form.paymentMethod === 'paypal' ? 'border-luxuryGold bg-champagne/10' : 'border-gray-200 hover:bg-gray-50'">
                  <input type="radio" v-model="form.paymentMethod" value="paypal" class="sr-only" />
                  <span class="font-bold text-blue-600 italic mr-3">PayPal</span>
                  <span class="font-medium text-charcoal">PayPal</span>
                  <div v-if="form.paymentMethod === 'paypal'" class="absolute right-4 w-4 h-4 bg-luxuryGold rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </label>

                <!-- GCash -->
                <label class="relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors" :class="form.paymentMethod === 'gcash' ? 'border-luxuryGold bg-champagne/10' : 'border-gray-200 hover:bg-gray-50'">
                  <input type="radio" v-model="form.paymentMethod" value="gcash" class="sr-only" />
                  <Smartphone class="w-6 h-6 text-blue-500 mr-3" />
                  <span class="font-medium text-charcoal">GCash</span>
                  <div v-if="form.paymentMethod === 'gcash'" class="absolute right-4 w-4 h-4 bg-luxuryGold rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </label>
              </div>

              <!-- Mock Form Details depending on selection -->
              <div v-if="form.paymentMethod === 'mastercard'" class="mt-6 space-y-4 border-t border-gray-100 pt-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input type="text" placeholder="**** **** **** ****" class="w-full border-gray-300 rounded-md shadow-sm border p-2" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" class="w-full border-gray-300 rounded-md shadow-sm border p-2" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input type="text" placeholder="***" class="w-full border-gray-300 rounded-md shadow-sm border p-2" />
                  </div>
                </div>
              </div>

              <div v-if="form.paymentMethod === 'bdo' || form.paymentMethod === 'gcash'" class="mt-6 border-t border-gray-100 pt-6">
                <div class="bg-gray-50 p-4 rounded text-sm text-gray-600">
                  <p>You will be redirected to the secure {{ form.paymentMethod === 'bdo' ? 'BDO' : 'GCash' }} portal to complete your transaction after clicking complete booking.</p>
                </div>
              </div>

            </div>
          </div>

          <!-- Right Column: Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white p-6 shadow-sm border border-gray-100 rounded-lg sticky top-24">
              <h3 class="text-xl font-serif text-charcoal mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
              
              <div v-if="cartStore.restaurantReservation.reserved" class="mb-4 pb-4 border-b border-gray-100">
                <p class="font-medium text-charcoal mb-1">Table Reservation</p>
                <p class="text-gray-500 text-xs">{{ cartStore.restaurantReservation.date }} at {{ cartStore.restaurantReservation.time }} ({{ cartStore.restaurantReservation.guests }} Guests)</p>
              </div>

              <ul v-if="cartStore.items.length > 0" class="space-y-4 mb-6">
                <li v-for="item in cartStore.items" :key="item.id" class="flex justify-between items-start text-sm">
                  <div class="flex-1 pr-4">
                    <p class="font-medium text-charcoal">{{ item.name }}</p>
                    <p class="text-gray-500 text-xs mt-1">
                      Qty: {{ item.quantity }}
                      <span v-if="item.nights" class="ml-2 font-medium text-luxuryGold">({{ item.nights }} Nights: {{ item.checkIn }} - {{ item.checkOut }})</span>
                    </p>
                  </div>
                  <p class="font-medium text-charcoal">{{ formatCurrency(item.price * item.quantity * (item.nights || 1)) }}</p>
                </li>
              </ul>

              <div class="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600 mb-4">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span class="font-medium text-charcoal">{{ formatCurrency(cartStore.totalPrice) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Taxes & Fees (12%)</span>
                  <span class="font-medium text-charcoal">{{ formatCurrency(taxAmount) }}</span>
                </div>
              </div>

              <div class="border-t border-gray-100 pt-4 flex justify-between items-center mb-8">
                <span class="font-serif text-lg text-charcoal font-semibold">Total</span>
                <span class="font-serif text-xl text-luxuryGold font-semibold">{{ formatCurrency(grandTotal) }}</span>
              </div>

              <button 
                @click="processCheckout"
                :disabled="isProcessing"
                class="w-full bg-charcoal hover:bg-darkNavy text-white py-4 uppercase tracking-wider text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                <div v-if="isProcessing" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {{ isProcessing ? 'Processing...' : 'Complete Booking' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h2 class="text-3xl font-serif text-charcoal mb-4">Your Cart is Empty</h2>
        <p class="text-gray-500 mb-8">It looks like you haven't made any reservations or orders yet.</p>
        <div class="flex justify-center space-x-4">
          <router-link to="/rooms" class="bg-charcoal text-white hover:bg-darkNavy px-8 py-3 uppercase tracking-wider text-sm font-semibold transition-colors">
            Browse Rooms
          </router-link>
          <router-link to="/restaurant" class="bg-luxuryGold text-white hover:bg-champagneDark px-8 py-3 uppercase tracking-wider text-sm font-semibold transition-colors">
            Book a Table
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>
