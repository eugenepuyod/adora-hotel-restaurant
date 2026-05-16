<script setup>
import { ref, computed } from 'vue'
import { ShoppingCart } from 'lucide-vue-next'
import { allRooms } from '../data/mock'
import { useCartStore } from '../stores/cart'
import RoomBookingModal from '../components/ui/RoomBookingModal.vue'

const cartStore = useCartStore()

const checkIn = ref(cartStore.reservationDates.checkIn || '')
const checkOut = ref(cartStore.reservationDates.checkOut || '')

const activeRooms = ref([...allRooms])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const searchAvailability = () => {
  if (!checkIn.value || !checkOut.value) {
    alert("Please select both check-in and check-out dates to search availability.")
    return
  }
  
  if (checkIn.value >= checkOut.value) {
    alert("Check-out date must be after check-in date.")
    return
  }

  // Filter overlapping logic
  const ci = checkIn.value
  const co = checkOut.value

  activeRooms.value = allRooms.filter(room => {
    let overlap = false
    for (const range of (room.bookedDates || [])) {
      if (
        (ci <= range.start && co >= range.start) ||
        (ci <= range.end && co >= range.end) ||
        (ci >= range.start && co <= range.end) // inside existing booking
      ) {
        overlap = true
        break
      }
    }
    return !overlap
  })
}

// Modal State
const isModalOpen = ref(false)
const selectedRoom = ref(null)

const openModal = (room) => {
  selectedRoom.value = room
  isModalOpen.value = true
}

const handleReserve = (dates) => {
  if (selectedRoom.value && dates.checkIn && dates.checkOut) {
    cartStore.setDates(dates.checkIn, dates.checkOut)
    cartStore.addToCart({
      ...selectedRoom.value,
      checkIn: dates.checkIn,
      checkOut: dates.checkOut
    })
    isModalOpen.value = false
    selectedRoom.value = null
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h3 class="text-luxuryGold font-semibold tracking-wider uppercase text-sm">Find Your Perfect Stay</h3>
        <h2 class="text-4xl font-serif text-charcoal mt-2">Rooms & Suites</h2>
        <div class="w-16 h-0.5 bg-luxuryGold mx-auto mt-6"></div>
        <p class="text-gray-500 mt-6 max-w-2xl mx-auto">
          From cozy standard rooms to our magnificent penthouse, Adora offers a diverse range of accommodations to suit your needs.
        </p>
      </div>

      <!-- Date Picker Bar -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-12 max-w-4xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6 border border-gray-100 relative z-10">
        <div class="flex-1 w-full">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Check-in Date</label>
          <input type="date" v-model="checkIn" class="w-full border-b-2 border-gray-200 focus:border-luxuryGold bg-transparent py-2 outline-none text-charcoal font-medium" />
        </div>
        <div class="flex-1 w-full">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Check-out Date</label>
          <input type="date" v-model="checkOut" class="w-full border-b-2 border-gray-200 focus:border-luxuryGold bg-transparent py-2 outline-none text-charcoal font-medium" />
        </div>
        <button 
          @click="searchAvailability"
          class="bg-charcoal text-white hover:bg-darkNavy px-8 py-3 uppercase tracking-wider text-sm font-semibold transition-colors shrink-0 shadow"
        >
          Search Availability
        </button>
      </div>

      <div v-if="activeRooms.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="room in activeRooms" :key="room.id" class="group bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col relative z-0">
          <div class="relative h-64 overflow-hidden">
            <img :src="room.image" :alt="room.name" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            <div v-if="room.price > 500" class="absolute top-4 left-4 bg-charcoal text-white text-xs px-3 py-1 font-semibold uppercase tracking-wider">Premium</div>
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <div class="flex justify-between items-end mb-4">
              <h4 class="text-xl font-serif text-charcoal font-semibold">{{ room.name }}</h4>
              <p class="text-luxuryGold text-lg font-medium">{{ formatCurrency(room.price) }}<span class="text-xs text-gray-400"> / night</span></p>
            </div>
            <p class="text-gray-500 font-light text-sm mb-8 flex-1">{{ room.description }}</p>
            <button 
              @click="openModal(room)"
              class="w-full inline-flex items-center justify-center space-x-2 bg-gray-50 hover:bg-charcoal hover:text-white text-charcoal border border-gray-200 hover:border-charcoal py-3 transition-colors duration-300"
            >
              <ShoppingCart class="w-4 h-4" />
              <span class="uppercase tracking-wider text-xs font-semibold">Reserve Room</span>
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-20 bg-white border border-gray-100 rounded-lg shadow-sm">
        <h3 class="text-2xl font-serif text-charcoal">No available rooms found.</h3>
        <p class="text-gray-500 mt-4">We are fully booked during the selected dates. Please try altering your check-in or check-out timelines.</p>
        <button @click="activeRooms = [...allRooms]" class="mt-8 bg-luxuryGold hover:bg-champagneDark text-white px-8 py-3 uppercase tracking-wider text-sm font-semibold transition-colors">
          View All Rooms
        </button>
      </div>

    </div>

    <RoomBookingModal 
      :is-open="isModalOpen" 
      :room="selectedRoom" 
      @close="isModalOpen = false" 
      @reserve="handleReserve" 
    />
  </div>
</template>
