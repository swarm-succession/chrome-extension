/*let interval = setInterval(() => {
  document.body.style.backgroundColor = 'orange'
  if (typeof r === 'undefined') return
  initialize()
  clearInterval(interval)
}, 500)
const initialize = () => {
  
}*/
let s = document.createElement('script')
s.src = chrome.runtime.getURL('script.js')
s.onload = function() {
  this.remove()
}
;(document.head || document.documentElement).appendChild(s)
