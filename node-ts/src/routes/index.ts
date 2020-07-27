import { Router } from 'express';
import appointmentRoutes from './appointment.routes';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';

const routes = Router();

routes.use('/appointment',appointmentRoutes);
routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes)


export default routes;
