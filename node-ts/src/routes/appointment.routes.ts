import { Router } from 'express';
import AppointmentServices from '../services/AppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
const appointmentsRoutes = Router();


appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/', async (request, response) => {
    console.log(response.locals.user)
    const appointmentServices = new AppointmentServices();
    const appointments = await appointmentServices.getAppointmentsById(response.locals.user.id)
    return response.status(200).json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
    try {
        const { date } = request.body;
        const appointmentServices = new AppointmentServices();
        const appointment = await appointmentServices.create({ date, provider_id: response.locals.user.id });
        return response.status(201).json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message})
    }
});

export default appointmentsRoutes;
