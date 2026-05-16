import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isSidebarOpen: false,
    reservationDates: {
      checkIn: null,
      checkOut: null
    },
    restaurantReservation: {
      date: null,
      time: null,
      guests: null,
      reserved: false
    }
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity * (item.nights || 1)), 0),
    hasRooms: (state) => state.items.some(item => item.type === 'room'),
    hasFood: (state) => state.items.some(item => item.type === 'food'),
  },
  actions: {
    addToCart(product) {
      let nights = 1
      if (product.type === 'room' && product.checkIn && product.checkOut) {
        const ci = new Date(product.checkIn)
        const co = new Date(product.checkOut)
        const diffTime = Math.abs(co - ci)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        nights = diffDays > 0 ? diffDays : 1
      }

      // Check if exact same item with same dates exists
      const existingProduct = this.items.find(item => 
        item.id === product.id && 
        item.checkIn === product.checkIn && 
        item.checkOut === product.checkOut
      )
      
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1, nights })
      }
      this.isSidebarOpen = true
    },
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(p => p.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (item && quantity === 0) {
        this.removeFromCart(productId)
      }
    },
    setDates(checkIn, checkOut) {
      if (checkIn) this.reservationDates.checkIn = checkIn
      if (checkOut) this.reservationDates.checkOut = checkOut
    },
    reserveTable(date, time, guests) {
      if (date) this.restaurantReservation.date = date
      if (time) this.restaurantReservation.time = time
      if (guests) this.restaurantReservation.guests = guests
      this.restaurantReservation.reserved = true
    },
    clearTableReservation() {
      this.restaurantReservation = { date: null, time: null, guests: null, reserved: false }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    clearCart() {
      this.items = []
      this.reservationDates = { checkIn: null, checkOut: null }
      this.clearTableReservation()
    }
  }
})
