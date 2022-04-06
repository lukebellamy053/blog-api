import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class SubscriberEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({length: 255})
    email: string;

    @Column({default: false})
    emailVerified: boolean;

    @CreateDateColumn()
    subscriptionTime: Date;
}
