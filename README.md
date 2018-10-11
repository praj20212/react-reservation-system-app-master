# react-reservation-system-app-master
Assignment on Node.js, React.js and Redux

## Reservation System APP

 * Reservation System APP
 * The `Reservation System APP` directory contains the source codes. `api` contains the api.
 * `src` contains files.
 * `build` contains sources launched in the web browser version of Reservation System APP.

## Installation
1. `git clone https://github.com/hari1008/reservation_system.git
2. Navigate to directory in command-prompt/terminal
3. Execute the command to install:  npm install
4. Run the project using the command: npm start
5. Open http://localhost:8000/

 
 ## Start a local web server (optional)

You can run a webserver and see your changes live in your web browser:

  1. Run command `npm run start`
  2. Visit http://localhost:8000/

## Reservation System API's

### Following are Endpoints supported

1 - http://localhost:8000/api/reservations (GET) - To fetch all reservations
2 - http://localhost:8000/api/reservation (POST) -  {name, hotelName, arrivalDate, departureDate}
3 - http://localhost:8000/api/reservations/:id (PUT) -  {name, hotelName, arrivalDate, departureDate}
3 - http://localhost:8000/api/reservation/:id(GET) - to fetch specific reservation record
4 - http://localhost:8000/api/reservations?hotelName=Mariot&arrivalDate=2017-11-12&departureDate=2017-11-21

## Pagination support

5 - http://localhost:8000/api/reservations?page=1&size=2
