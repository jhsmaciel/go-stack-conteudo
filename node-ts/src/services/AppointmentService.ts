
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface CreateAppointmentDTO {
    provider_id: string,
    date: Date,
}

class AppointmentService {
    /**
     * Criar agendamentos
     */
    public async create({ date, provider_id }: CreateAppointmentDTO): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(AppointmentsRepository);

        const findedAppointment = await appointmentRepository.findByDate(date);

        if(findedAppointment) {
            throw new Error('This appointment is already booked!')
        }

        const appointment = await appointmentRepository.save({
            provider_id,
            date,
        })

        return appointment;
    }

    /**
     * Listar agendamentos
     */
    public listAppointments(): Promise<Appointment[]> {
        const appointmentRepository = getCustomRepository(AppointmentsRepository);
        return appointmentRepository.find()
    }
}

export default AppointmentService;
