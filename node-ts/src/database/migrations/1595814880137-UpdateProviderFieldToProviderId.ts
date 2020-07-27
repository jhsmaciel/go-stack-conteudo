import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Column} from "typeorm";

export default class UpdateProviderFieldToProviderId1595814880137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider')
        await queryRunner.addColumn('appointments', new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            })
        );
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'FKAppointments',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'FKAppointments');
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn('appointments', new TableColumn({
                name: 'provider',
                type: 'varchar',
            })
        );
    }
}
