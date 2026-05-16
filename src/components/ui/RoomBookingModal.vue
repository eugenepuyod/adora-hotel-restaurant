<script setup>
import { ref, computed, watch } from 'vue'
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  room: Object
})

const emit = defineEmits(['close', 'reserve'])

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const checkIn = ref(null)
const checkOut = ref(null)

// Normalize date wrapper for comparison (YYYY-MM-DD)
const formatDate = (d) => {
  if (!d) return ''
  const offset = d.getTimezoneOffset()
  d = new Date(d.getTime() - (offset*60*1000))
  return d.toISOString().split('T')[0]
}

const bookedDatesRaw = computed(() => props.room?.bookedDates || [])

const isDateDisabled = (year, month, day) => {
  const dateStr = formatDate(new Date(year, month, day))
  const todayStr = formatDate(today)
  
  // Past dates
  if (dateStr < todayStr) return true
  
  // Booked dates
  for (const range of bookedDatesRaw.value) {
    if (dateStr >= range.start && dateStr <= range.end) {
      return true
    }
  }
  return false
}

// Generate calendar grid
const calendarGrid = computed(() => {
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  
  let days = []
  
  // Empty prefixes
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dStr = formatDate(new Date(currentYear.value, currentMonth.value, i))
    days.push({
      day: i,
      dateString: dStr,
      disabled: isDateDisabled(currentYear.value, currentMonth.value, i)
    })
  }
  return days
})

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const monthName = computed(() => {
  const d = new Date(currentYear.value, currentMonth.value, 1)
  return d.toLocaleString('default', { month: 'long', year: 'numeric' })
})

const selectDate = (dayObj) => {
  if (!dayObj || dayObj.disabled) return

  const selectedDate = new Date(currentYear.value, currentMonth.value, dayObj.day)
  const selectedStr = formatDate(selectedDate)

  if (!checkIn.value || (checkIn.value && checkOut.value)) {
    checkIn.value = selectedStr
    checkOut.value = null
  } else if (checkIn.value && !checkOut.value) {
    if (selectedStr < checkIn.value) {
      checkIn.value = selectedStr
    } else {
      // Validate if range overlaps any booked dates
      let overlap = false
      for (const range of bookedDatesRaw.value) {
        if (
          (checkIn.value <= range.start && selectedStr >= range.start) ||
          (checkIn.value <= range.end && selectedStr >= range.end)
        ) {
          overlap = true
          break
        }
      }

      if (overlap) {
        alert("The selected range includes days that are already booked. Please choose another duration.")
        checkOut.value = null
      } else {
        checkOut.value = selectedStr
      }
    }
  }
}

// Helpers for visual calendar highlighting
const isDateSelected = (dStr) => dStr === checkIn.value || dStr === checkOut.value
const isDateInRange = (dStr) => checkIn.value && checkOut.value && dStr > checkIn.value && dStr < checkOut.value

// Reset state when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    checkIn.value = null
    checkOut.value = null
    currentMonth.value = today.getMonth()
    currentYear.value = today.getFullYear()
  }
})

const confirmReservation = () => {
  if (checkIn.value && checkOut.value) {
    emit('reserve', { checkIn: checkIn.value, checkOut: checkOut.value })
  }
}
</script>

<template>
  <transition name="modal-fade">
    <div v-show="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-charcoal/70 backdrop-blur-sm" @click="emit('close')"></div>

        <div v-if="room" class="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg border border-gray-100 relative">
          
          <button @click="emit('close')" class="absolute top-4 right-4 p-2 text-gray-400 hover:text-charcoal transition-colors">
            <X class="w-5 h-5" />
          </button>

          <div class="flex items-start mb-6">
            <img :src="room.image" class="w-24 h-24 object-cover rounded-md" />
            <div class="ml-4 flex-1">
              <h3 class="text-2xl font-serif text-charcoal font-semibold">{{ room.name }}</h3>
              <p class="text-luxuryGold font-medium mt-1">${{ room.price }} <span class="text-xs text-gray-400 font-normal">/ night</span></p>
              <p class="text-xs text-gray-400 mt-2 flex items-center">
                <CalendarIcon class="w-3 h-3 mr-1" /> Select Check-in and Check-out
              </p>
            </div>
          </div>

          <!-- Calendar Header -->
          <div class="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <button @click="prevMonth" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-charcoal">
              <ChevronLeft class="w-5 h-5" />
            </button>
            <h4 class="text-lg font-medium text-charcoal">{{ monthName }}</h4>
            <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-charcoal">
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>

          <!-- Days Header -->
          <div class="grid grid-cols-7 gap-1 text-center mb-2">
            <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-xs font-semibold uppercase text-gray-400 tracking-wider">
              {{ day }}
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1">
            <div 
              v-for="(dayObj, idx) in calendarGrid" 
              :key="idx" 
              class="h-10 w-full flex items-center justify-center text-sm rounded cursor-pointer transition-colors relative"
              :class="[
                !dayObj ? 'cursor-default pointer-events-none' : '',
                dayObj?.disabled ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'text-charcoal',
                !dayObj?.disabled && dayObj ? 'hover:bg-champagne/30 hover:text-luxuryGold font-medium' : '',
                dayObj && isDateSelected(dayObj.dateString) ? 'bg-luxuryGold text-white hover:bg-champagneDark shadow' : '',
                dayObj && isDateInRange(dayObj.dateString) ? 'bg-champagne/40' : ''
              ]"
              @click="selectDate(dayObj)"
            >
              <span v-if="dayObj">{{ dayObj.day }}</span>
              <!-- Small dot indicator for booked dates -->
              <span v-if="dayObj?.disabled && dayObj.dateString >= formatDate(today)" class="absolute bottom-1 w-1 h-1 rounded-full bg-red-400"></span>
            </div>
          </div>

          <!-- Selection details -->
          <div class="mt-8 flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-100">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-widest font-semibold">Check-in</p>
              <p class="text-sm font-medium mt-1">{{ checkIn || 'Select Date' }}</p>
            </div>
            <div class="text-gray-300 mx-4">→</div>
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-widest font-semibold">Check-out</p>
              <p class="text-sm font-medium mt-1">{{ checkOut || 'Select Date' }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-6">
            <button 
              @click="confirmReservation"
              :disabled="!checkIn || !checkOut"
              class="w-full py-4 text-sm uppercase tracking-widest font-semibold transition-colors disabled:cursor-not-allowed flex items-center justify-center"
              :class="checkIn && checkOut ? 'bg-charcoal text-white shadow-xl hover:bg-darkNavy' : 'bg-gray-200 text-gray-400'"
            >
              Add to Reservation
            </button>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
