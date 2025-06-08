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

**Note: Delete this note and update the table of contents based on what sections you keep.**

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

![](./screenshot.jpg)

![](./screenshot.jpg)

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

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

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
