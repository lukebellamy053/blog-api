import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

export type NewSubscriber = Omit<SubscriberEntity, "subscriptionTime" | "id" | "verificationCode" | "emailVerified">

@Entity()
export class SubscriberEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({length: 255, unique: true})
    email: string;

    @Column()
    frequency: string;

    @Column({length: 3})
    country: string;

    @Column({default: false})
    emailVerified: boolean;

    @Column({length: 6, nullable: true})
    verificationCode: string;

    @CreateDateColumn()
    subscriptionTime: Date;
}
