# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Acknowledgments](#acknowledgments)

## Overview

Integrate with the [bitly](https://app.bitly.com/) URL shortening API and play with browser storage in this landing page challenge.

Your challenge is to integrate with the [bitly API](https://dev.bitly.com/) to create shortened URLs and display them like in the designs.

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

![](../url-shortening-api-master/assets/images/Solution_Desktop.jpg)

![](../url-shortening-api-master/assets/images/Solution_Mobile.jpg)

![](../url-shortening-api-master/assets/images/Solution_Mobile_1.jpg)

### Links

- Solution URL: [GitHub: url-shortening-api-master](https://github.com/DblRH600/url-shortening-api-master)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

**Note:** Monthly limit is ***5*** Links. All were used trying to test the site.

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<!-- url section -->
      <section class="url-section-container">
        <div class="url-container">
          <input
            type="text"
            class="url-input"
            id="url-input"
            placeholder=" Shorten a link here..."
            required
          />
          <button id="url-btn" class="url-btn">Shorten It&#33;</button>
          <span id="error-message" class="error-message"></span>
        </div>
      </section>
```
```css
/* advanced statistics section */
.statistics-container {
  background-color: var(--primary-background-color);
  padding-bottom: 4rem;
}
.statistics-container .statistics-text {
  text-align: center;
  margin-bottom: 6rem;
}
.statistics-container .statistics-title {
  color: var(--neutral-color-dark-2);
  margin-bottom: 0.75rem;
}
.statistics-container .statistics-comment {
  color: var(--neutral-color-dark-1);
  max-width: 30rem;
  margin: auto;
  font-weight: 500;
}
.statistics-container .statistics-card::before {
  content: "";
  display: block;
  background-color: var(--primary-color-1);
  width: 100%;
  height: 0.5rem;
  position: absolute;
  top: 50%;
}
.statistics-container .statistics-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--gap);
  position: relative;
}
.statistics-container .statistics-card .statistic {
  background-color: var(--neutral-color-light-1);
  padding: 4rem 1.5rem 1.5rem;
  align-self: center;
  position: relative;
  border-radius: 0.75rem;
}
.statistics-container .statistics-card .statistic-image {
  background-color: var(--neutral-color-dark-2);
  padding: 1rem;
  position: absolute;
  top: -1.9rem;
  border-radius: 50%;
}
.statistics-container .statistics-card .statistic-subtitle {
  margin-bottom: 1rem;
}
/* :nth-child() helps to target elements based on position w/in a parent */
.statistics-container .statistics-card .statistic:nth-child(2) {
  margin-top: 4rem;
}
.statistics-container .statistics-card .statistic:nth-child(3) {
  margin-top: 8rem;
}
```
```js
// api fetch function
async function createURL (urlLink) {
  const apiURL = 'https://api-ssl.bitly.com/v4/shorten'

  const res = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify ({
      'url': urlLink
    })
  })

  if (res.ok) {
    const data = await res.json()
    displayToURLHistory(urlLink, data)
  } else {
    console.error(`Error attempting to shorten URL: ${res.statusText}`)
  }

  console.log(data)
}
```

### Continued development

Encountered an error importing the token from a separate **.js** file; I want to research further to understand why the token could not be imported. 

Had trouble getting the ***menu button*** to work when the screen is small. A better understanding of **click events**, **addEventListners**, and connecting **functions** to HTML when using ***hidden elements***.

### Useful resources

- [MDN](https://developer.mozilla.org/en-US/) - MDN was useful in understanding the meaning of **elements**, **methods**, **functions**, and how they should be used / implemented.

- [w3schools](https://www.w3schools.com/) - w3schools was useful in understanding how to style **elements** and **functions** utilizing CSS coding and JavaScript coding.

- [Documentation: The Bitly API](https://dev.bitly.com/?_gl=1*18syhe2*_gcl_au*MzI4MzI3MzM5LjE3NDkyMjY0MzcuMTcwMTE2NjY1NC4xNzQ5MjI5MTQ3LjE3NDkyMjkyMTE.) - This is site helped with my understanding of how to use the API for this website.

## Acknowledgments

I want express aprpeciation to Abraham Tavarez for helping me to understand how to connect the ***API Token*** from *bitly.com*. 
