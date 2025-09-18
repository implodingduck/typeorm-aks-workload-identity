import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Employees {

    @PrimaryGeneratedColumn()
    EmployeeID: number

    @Column()
    FirstName: string

    @Column()
    LastName: string

    @Column()
    HireDate: Date

    @Column()
    Salary: number

}
