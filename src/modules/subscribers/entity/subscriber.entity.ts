import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

export type NewSubscriber = Omit<SubscriberEntity, "subscriptionTime" | "id" | "verificationCode" | "emailVerified">

export enum Frequency {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly'
}

@Entity()
export class SubscriberEntity {

    @ApiProperty({
        description: 'The subscriber ID',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The subscriber name',
    })
    @Column()
    name: string;

    @ApiProperty({
        description: 'The subscriber email',
    })
    @Column({length: 255, unique: true})
    email: string;

    @ApiProperty({
        description: 'The frequency of newsletters',
    })
    @Column()
    frequency: Frequency;

    @ApiProperty({
        description: 'The subscriber country code',
    })
    @Column({length: 3})
    country: string;

    @ApiHideProperty()
    @Exclude()
    @Column({default: false})
    emailVerified: boolean;

    @ApiHideProperty()
    @Exclude()
    @Column({length: 6, nullable: true})
    verificationCode: string;

    @ApiProperty({
        description: 'The time of subscription',
    })
    @CreateDateColumn()
    subscriptionTime: Date;


    constructor(subscriber: Partial<SubscriberEntity> = {}) {
        // noinspection TypeScriptValidateTypes
        Object.assign(this, subscriber);
    }
}
