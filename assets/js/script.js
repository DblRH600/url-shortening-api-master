// import API_KEY/Token
// import { token } from '../js/secrets' ??-404 error trying to read secrets file?
const token = '287dd8fc75980c43beee2bf866c727a4fab1eefa'
const maxSearches = 5

// define variables to connect/use with functions
const urlInput = document.getElementById('url-input')
const errorMessage = document.getElementById('error-message')
const enableBtn = document.getElementById('url-btn')
const urlOutput = document.getElementById('urlOutput')

function getUrlInput () {
  return urlInput.value.trim().toLowerCase()
}

// local storage interaction
function saveURLToLocalStorage (originalURL, shortenedURL) {
  const savedURLs = JSON.parse(localStorage.getItem('urlHistory')) || []
  savedURLs.push({ original: originalURL, short: shortenedURL })
  localStorage.setItem('urlHistory', JSON.stringify(savedURLs))
}

function loadURLHistory () {
  const savedURLs = JSON.parse(localStorage.getItem('urlHistory')) || []

  savedURLs.forEach(entry => {
    const storedData = { link: entry.short }
    displayToURLHistory(entry.original, storedData)
  })
}

// api fetch function
async function createURL (urlLink) {
  resetMonthlySearchLimit()

  const apiURL = 'https://api-ssl.bitly.com/v4/shorten'
  const currentCount = getSearchCount()

  if (currentCount >= maxSearches) {
    errorMessage.textContent = 'Monthly limit reached.'
    updateCountdownDisplay()
    return
  }

  try {
    const res = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // application/x-www-form-urlencoded
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        long_url: urlLink
        //  body:  new URLSearchParams({
        // long_url domain: "bit.ly",
        // group_guid: "Ba1bc23dE4F",
      })
    })

    if (res.ok) {
      const data = await res.json()
      displayToURLHistory(urlLink, data)
      saveURLToLocalStorage(urlLink, data.link)
      incrementSearchCount()

      errorMessage.textContent = ''
    } else {
      const errorData = await res.json()

      if (errorData.message && errorData.message.includes('LIMIT')) {
        localStorage.setItem('searchCount', maxSearches)
      }

      errorMessage.textContent = errorData.message || 'Failed to shorten URL'
      console.error(`Error attempting to shorten URL: ${res.statusText}`)
    }
  } catch (err) {
    errorMessage.textContent =
      'Network error or API is unreachable at this time.'
    console.error(err)
  }

  updateCountdownDisplay()

  // console.log(data)
}

// createURL()

// check & search the DOM for elements to be displayed
document.addEventListener('DOMContentLoaded', () => {
  resetMonthlySearchLimit()
  updateCountdownDisplay()
  loadURLHistory()
  setupMenuToggle()
  setupScrollHeader()
})

// confirm url is valid
function isValidURL (url) {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

// isValidURL()

// create & display url on the page after retrieval
function displayToURLHistory (originalURL, urlData) {
  const urlItem = document.createElement('div')
  urlItem.classList.add('item')

  urlItem.innerHTML = `
    <p class='original-url'>${originalURL}</p>
    
    <hr>
    
    <div class='short-url'>
      <p>${urlData.link}</p>
      <button class='copy-url-btn'>Copy</button>
    </div>`

  urlOutput.appendChild(urlItem)

  urlItem.querySelector('.copy-url-btn').addEventListener('click', e => {
    let copyURL = urlData.link
    navigator.clipboard.writeText(copyURL)

    e.target.style.backgroundColor = 'var(--neutral-color-dark-2)'
    e.target.textContent = 'Copied!'

    setTimeout(() => {
      e.target.style.backgroundColor = 'var(--primary-color-1)'
      e.target.textContent = 'Copy'
    }, 2000)
  })
}

enableBtn.addEventListener('click', () => {
  let userURL = getUrlInput()

  if(!userURL.trim()) {
    // button clicked with-out entering a url link
    errorMessage.textContent = 'Pleae enter a URL link.'
    errorMessage.classList.add('error')
    urlInput.classList.add('error')
    return
  }

  if (!isValidURL(userURL)) {
    // check for valid url entry
    errorMessage.classList.add('error')
    urlInput.classList.add('error')
  } else {
    errorMessage.classList.remove('error')
    urlInput.classList.remove('error')
    urlInput.value = ''
    urlOutput.classList.add('activate')
    createURL(userURL)
  }
})

// console.log(selectElement('.mobile-nav'))

// Grab elements -- acknowledgement to John from 'Coding Addict'
  const selectElement = selector => {
    const element = document.querySelector(selector)
    if (element) return element
    throw new Error(`Selector: ${selector} not found`)
  }

//Nav styles on scroll
function setupScrollHeader () {
  
  const headerElement = selectElement('#header')

  const scrollHeader = () => {
    if (window.scrollY >= 15) {
      headerElement.classList.add('activated')
    } else {
      headerElement.classList.remove('activated')
    }
  }

  window.addEventListener('scroll', scrollHeader)
}

// Open menu & search pop-up
function setupMenuToggle () {
  
  const menuToggle = selectElement('#menu-btn')
  const mobileMenu = selectElement('#menu')

  const toggleMenu = () => {
    mobileMenu.classList.toggle('activated')
    menuToggle.classList.toggle('activated')
  }

  menuToggle.addEventListener('click', toggleMenu)
}

// due to monthly limit create a function to return the count & reset it
function getSearchCount () {
  return Number(localStorage.getItem('searchCount') || 0)
}

function incrementSearchCount () {
  const currentCount = getSearchCount()
  const newCount = currentCount + 1

  console.log('Incrementing search count to: ', newCount)

  localStorage.setItem('searchCount', newCount)
  updateCountdownDisplay()
}

function resetMonthlySearchLimit () {
  const currentMonth = new Date().getMonth()
  const savedMonth = localStorage.getItem('searchMonth')

  console.log('Saved month:', savedMonth, 'Current month:', currentMonth)

  if (savedMonth === null || Number(savedMonth) !== currentMonth) {
    localStorage.setItem('searchMonth', currentMonth)
    localStorage.setItem('searchCount', 0)
    console.log('Resetting count for new month')
  }

  updateCountdownDisplay()
}

function updateCountdownDisplay () {
  const used = getSearchCount()
  const searchesRemaining = maxSearches - used
  const searchCountdown = document.getElementById('displayed-countdown')

  console.log(`used: ${used}, remaining: ${searchesRemaining}`)
  // default display
  searchCountdown.textContent = `There are ${searchesRemaining} of ${maxSearches} shortenings remaining this month.`

  // reset
  searchCountdown.style.color = 'var(--neutral-color-dark-2)'

  if (searchesRemaining === 1) {
    searchCountdown.style.color = 'var(--secondary-color-2)'
    searchCountdown.textContent += ' - Approaching monthly limit.'
  }

  if (searchesRemaining === 0) {
    searchCountdown.style.color = 'var(--secondary-color)'
    searchCountdown.textContent = `Total number shortentings per month is ${maxSearches}. Limit has been reached or exceeded!`
  }
}
