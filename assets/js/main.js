const app = document.querySelector('#app')
const hamburger = app.querySelector('.hamburger')
const nav = app.querySelector('#nav')
const headerLinks = app.querySelectorAll('#header a')
const navLinks = app.querySelectorAll('#nav a')
const heat = app.getAttribute('data-heat')

// toggle data-nav-status on hamburger click
hamburger.addEventListener('click', function () {
  let navStatus = app.getAttribute('data-nav-status')
  navStatus = navStatus === 'closed' ? 'open' : 'closed'
  app.setAttribute('data-nav-status', navStatus)
})

// add event listener to links inside #nav using navLinks
navLinks.forEach(function (navLink) {
  navLink.addEventListener('click', function () {
    const clickedHeat = navLink.getAttribute('data-heat')
    app.setAttribute('data-heat', clickedHeat)
    app.setAttribute('data-nav-status', 'closed')
  })
})

// add event listener to links inside #nav using navLinks
headerLinks.forEach(function (headerLink) {
  headerLink.addEventListener('click', function () {
    const clickedHeaderHeat = headerLink.getAttribute('data-heat')
    app.setAttribute('data-heat', clickedHeaderHeat)
    app.setAttribute('data-nav-status', 'closed')
  })
})
