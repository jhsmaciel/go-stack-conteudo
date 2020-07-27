import Appointment from '../models/Appointment'
import { Repository, EntityRepository } from 'typeorm';

interface CreateAppointmentDTO {
    provider: string,
    date: Date,
}

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date) {
        const findAppointment = await this.findOne({
            where: { date, }
        })
        return findAppointment;
    }
}

export default AppointmentsRepository
