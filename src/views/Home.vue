<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ShoppingCart } from 'lucide-vue-next'
import { featuredRooms, promotions } from '../data/mock'
import { useCartStore } from '../stores/cart'
import RoomBookingModal from '../components/ui/RoomBookingModal.vue'

const cartStore = useCartStore()

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

const heroImages = [
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
]
const currentImageIndex = ref(0)
let slideInterval = null

onMounted(() => {
  slideInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length
  }, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>

<template>
  <div>
    <!-- Hero Banner -->
    <section class="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <transition-group name="banner-fade">
          <img 
            v-for="(img, index) in heroImages" 
            :key="img"
            v-show="currentImageIndex === index"
            :src="img" 
            alt="Adora Hotel Luxury" 
            class="absolute inset-0 w-full h-full object-cover"
          />
        </transition-group>
        <div class="absolute inset-0 bg-charcoal/40 mix-blend-multiply pointer-events-none z-10"></div>
        <div class="absolute inset-0 hero-gradient pointer-events-none z-10"></div>
      </div>
      
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
        <h3 class="text-luxuryGold tracking-[0.3em] uppercase text-sm md:text-base font-semibold translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_0.5s_forwards]">Welcome to Adora</h3>
        <h1 class="text-5xl md:text-7xl font-serif text-white font-bold leading-tight translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_1s_forwards]">
          Discover Unrivaled <br/> Elegance
        </h1>
        <p class="text-lg md:text-xl text-gray-200 font-light translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_1.5s_forwards]">
          Experience a sanctuary of sophistication and exceptional culinary delights.
        </p>
        <div class="pt-8 opacity-0 animate-[fade-in-up_1s_ease-out_2s_forwards]">
          <router-link to="/rooms" class="inline-block bg-luxuryGold hover:bg-champagneDark text-white px-8 py-4 uppercase tracking-wider font-semibold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
            Book Your Stay
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Rooms -->
    <section class="py-24 bg-white" id="featured-rooms">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h3 class="text-luxuryGold font-semibold tracking-wider uppercase text-sm">Finest Accommodations</h3>
          <h2 class="text-4xl font-serif text-charcoal mt-2">Featured Rooms</h2>
          <div class="w-16 h-0.5 bg-luxuryGold mx-auto mt-6"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div v-for="room in featuredRooms" :key="room.id" class="group bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
            <div class="relative h-64 overflow-hidden">
              <img :src="room.image" :alt="room.name" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div class="p-8 flex-1 flex flex-col">
              <div class="flex justify-between items-end mb-4">
                <h4 class="text-xl font-serif text-charcoal font-semibold">{{ room.name }}</h4>
                <p class="text-luxuryGold text-lg font-medium">{{ formatCurrency(room.price) }}<span class="text-xs text-gray-400">/night</span></p>
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
      </div>
    </section>

    <!-- Promotions Section -->
    <section class="py-24 bg-gray-50" id="dining">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h3 class="text-luxuryGold font-semibold tracking-wider uppercase text-sm">Culinary & Wellness</h3>
          <h2 class="text-4xl font-serif text-charcoal mt-2">Exclusive Promotions</h2>
          <div class="w-16 h-0.5 bg-luxuryGold mx-auto mt-6"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div v-for="promo in promotions" :key="promo.id" class="flex flex-col md:flex-row bg-white shadow-lg overflow-hidden group">
            <div class="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
              <img :src="promo.image" :alt="promo.name" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute top-4 left-4 bg-white/90 backdrop-blur text-charcoal text-xs px-3 py-1 font-semibold uppercase tracking-wider">Special Offer</div>
            </div>
            <div class="p-8 md:w-1/2 flex flex-col justify-center">
              <h4 class="text-2xl font-serif text-charcoal font-semibold mb-2">{{ promo.name }}</h4>
              <p class="text-luxuryGold text-xl font-medium mb-4">{{ formatCurrency(promo.price) }}</p>
              <p class="text-gray-500 font-light text-sm mb-8">{{ promo.description }}</p>
              <button 
                @click="addToCart(promo)"
                class="self-start inline-flex items-center justify-center space-x-2 bg-charcoal hover:bg-darkNavy text-white py-3 px-6 transition-colors duration-300"
              >
                <ShoppingCart class="w-4 h-4" />
                <span class="uppercase tracking-wider text-xs font-semibold">Add to Booking</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Coming Soon Events Section -->
    <section class="py-24 relative bg-darkNavy text-white" id="events">
      <!-- Decor background -->
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
      
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h3 class="text-luxuryGold font-semibold tracking-wider uppercase text-sm">Experience More</h3>
        <h2 class="text-4xl font-serif mt-2 mb-6">Upcoming Events</h2>
        <div class="w-16 h-0.5 bg-luxuryGold mx-auto my-6"></div>
        <p class="text-gray-300 max-w-2xl mx-auto mb-16">
          We are preparing an exquisite lineup of events. Stay tuned for grand galas, wine tasting nights, and exclusive live performances.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <!-- Event 1 -->
          <div class="bg-white/5 border border-white/10 p-8 glass-card">
            <p class="text-luxuryGold text-sm font-semibold uppercase tracking-wider mb-2">Summer 2026</p>
            <h4 class="text-xl font-serif mb-4">Adora Anniversary Gala</h4>
            <p class="text-sm text-gray-400 font-light">Join us in celebrating another year of excellence. Formal attire required.</p>
            <span class="inline-block mt-4 text-xs font-semibold px-2 py-1 border border-white/20 uppercase">Coming Soon</span>
          </div>
          
          <!-- Event 2 -->
          <div class="bg-white/5 border border-white/10 p-8 glass-card">
            <p class="text-luxuryGold text-sm font-semibold uppercase tracking-wider mb-2">Fall 2026</p>
            <h4 class="text-xl font-serif mb-4">Masterclass Wine Tasting</h4>
            <p class="text-sm text-gray-400 font-light">An exclusive evening guiding you through Mediterranean vineyards' best creations.</p>
            <span class="inline-block mt-4 text-xs font-semibold px-2 py-1 border border-white/20 uppercase">Coming Soon</span>
          </div>

          <!-- Event 3 -->
          <div class="bg-white/5 border border-white/10 p-8 glass-card md:col-span-2 lg:col-span-1">
            <p class="text-luxuryGold text-sm font-semibold uppercase tracking-wider mb-2">Winter 2026</p>
            <h4 class="text-xl font-serif mb-4">Jazz & Dine Under Stars</h4>
            <p class="text-sm text-gray-400 font-light">Live acoustic jazz on our newly renovated rooftop lounge.</p>
            <span class="inline-block mt-4 text-xs font-semibold px-2 py-1 border border-white/20 uppercase">Coming Soon</span>
          </div>
        </div>
      </div>
    </section>

    <RoomBookingModal 
      :is-open="isModalOpen" 
      :room="selectedRoom" 
      @close="isModalOpen = false" 
      @reserve="handleReserve" 
    />
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}
.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
}
</style>
