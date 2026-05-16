<script setup>
import { Facebook, Instagram, Twitter } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-darkNavy text-white w-full border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <router-link to="/" class="flex flex-col mb-4">
            <span class="text-2xl font-serif font-semibold text-luxuryGold tracking-wider uppercase">Adora</span>
            <span class="text-[0.65rem] tracking-[0.2em] text-gray-300 font-medium uppercase mt-0.5">Hotel & Restaurant</span>
          </router-link>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            Experience uncompromised luxury and unparalleled comfort right in the heart of the city. Make your reservation today.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors"><Facebook class="w-5 h-5"/></a>
            <a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors"><Instagram class="w-5 h-5"/></a>
            <a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors"><Twitter class="w-5 h-5"/></a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white font-medium uppercase tracking-wider text-sm mb-6">Explore</h4>
          <ul class="space-y-3">
            <li><router-link to="/rooms" class="text-gray-400 hover:text-luxuryGold transition-colors text-sm">Rooms & Suites</router-link></li>
            <li><a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors text-sm">Dining Options</a></li>
            <li><a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors text-sm">Spa & Wellness</a></li>
            <li><a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors text-sm">Upcoming Events</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-medium uppercase tracking-wider text-sm mb-6">Legal</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors text-sm">Terms & Conditions</a></li>
            <li><a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors text-sm">Privacy Policy</a></li>
            <li><a href="#" class="text-gray-400 hover:text-luxuryGold transition-colors text-sm">Cancellation Policy</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-medium uppercase tracking-wider text-sm mb-6">Contact Us</h4>
          <ul class="space-y-4 text-sm text-gray-400">
            <li>123 Luxury Avenue, Metropolis Center</li>
            <li>+1 (555) 123-4567</li>
            <li>reservations@adorahotel.com</li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} Adora Hotel & Restaurant. All rights reserved.</p>
        <div class="mt-4 md:mt-0 flex space-x-6">
          <p>Designed with <span class="text-luxuryGold">&hearts;</span> for premium comfort.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
