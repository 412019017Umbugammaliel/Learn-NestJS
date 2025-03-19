import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

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
    
    @Column({type: 'varchar', length: 255})
    password:string;

    @CreateDateColumn({nullable: true})
    created_at?: Date;

    @UpdateDateColumn({nullable: true})
    updated_at?: Date;
    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {  // Pastikan hanya meng-hash jika ada perubahan password
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}