export default {
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
}