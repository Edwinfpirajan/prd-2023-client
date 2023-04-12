/// <reference types="vite/client" />

export { }
declare global {
  interface Window {
    modalContainer: any
  }
}
window.modalContainer = window.modalContainer || {}