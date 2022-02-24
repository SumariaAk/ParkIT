
import parkingspaces from './parkingspaces.js';
import signupRouter from './user.js';
import loginRouter from './login.js';
import bookings from './bookings.js';

export default (app) => {
  /** Contacts routes */
  app.use('/', signupRouter);
  app.use('/', loginRouter);
  app.use('/', parkingspaces);
  app.use('/', bookings );
};
