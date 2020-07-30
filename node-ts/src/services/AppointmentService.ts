import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import AppError from '../errors/AppError';

interface CreateAppointmentDTO {
    provider_id: string;
    date: Date;
}

class AppointmentService {
    /**
     * Criar agendamentos
     */
    public async create({
        date,
        provider_id,
    }: CreateAppointmentDTO): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const findedAppointment = await appointmentRepository.findByDate(date);

        if (findedAppointment) {
            throw new AppError('This appointment is already booked.');
        }

        const appointment = await appointmentRepository.save({
            provider_id,
            date,
        });

        return appointment;
    }

    /**
     * Listar agendamentos
     */
    public getAppointmentsById(id: string): Promise<Appointment[]> {
        const appointmentRepository = getCustomRepository(
            AppointmentsRepository,
        );
        return appointmentRepository.find({
            where: {
                provider_id: id,
            },
        });
    }
}

export default AppointmentService;
