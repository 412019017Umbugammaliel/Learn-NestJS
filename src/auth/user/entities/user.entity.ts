import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')

export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    nik:string;
    
    @Column({type: 'varchar', length: 300})
    name:string;
    
    @Column({type: 'varchar', length: 300})
    email:string;
    
    @Column({type: 'varchar', length: 300})
    bagian:string;
    
    @Column({ default: 'user' })
    role: string;

    @CreateDateColumn({nullable: true})
    created_at?: Date;

    @UpdateDateColumn({nullable: true})
    updated_at?: Date;

}