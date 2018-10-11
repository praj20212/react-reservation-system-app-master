const reservationRoutes = require('./ReservationRoutes');

module.exports = function(app) {
  reservationRoutes(app);
  // Other route groups could go here, in the future
};
