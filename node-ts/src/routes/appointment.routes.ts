import { Router } from 'express';
import AppointmentServices from '../services/AppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/', async (request, response) => {
    const appointmentServices = new AppointmentServices();
    const appointments = await appointmentServices.getAppointmentsById(
        response.locals.user.id,
    );
    return response.status(200).json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
    const { date } = request.body;
    const appointmentServices = new AppointmentServices();
    const appointment = await appointmentServices.create({
        date,
        provider_id: response.locals.user.id,
    });
    return response.status(201).json(appointment);
});

export default appointmentsRoutes;
