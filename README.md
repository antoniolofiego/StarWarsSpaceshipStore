# Star Wars Spaceship Store

A small project to practice a React interview-like assignment, inspired by @techieeliot's suggestion as he shared the same assignment. Initially it started just as an experiment for `react-hot-toast` but it expanded to encompass the assignment itself.

## Notes/Tech Stack

- This took me around 2 hours for the main logic and another couple of hours for adjustments and small clean-ups
- Next.js
- Tailwind CSS for styling
- `react-hot-toast` for notifications
- `swr` as the data fetching library
- React Context for state management
- Jest/RTL and Cypress for testing

## Features

- Display all starships in the Star Wars API as cards, purchaseable or not based on price availability.
- Pagination with cached results and jump to page.
- Shopping cart handling with React Context
- Modify shopping cart seamlessly from the available ships or from the shopping cart itself
- Display shopping cart total
- Button to remove all ships of one type from cart
- Button to clear the whole cart
- DARK THEME!
- E2E testing with Cypress on most functionalities


## Setup

1. Clone the repo git clone https://github.com/antoniolofiego/StarWarsSpaceshipStore

2. yarn install or npm install to install npm packages

3. Run app by using yarn start or npm run start, then open http://localhost:3000 to view it in the browser.

4. Run the tests with `npm run cypress`

A live version of the app is available at https://star-wars-spaceship-store.vercel.app/.
Thanks for taking the time to look through this project 👍
