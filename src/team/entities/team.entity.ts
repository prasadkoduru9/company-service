import { Company } from './../../company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  teamName: string;

  @Column()
  teamLeadName: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Company, (company: Company) => company.team, {
    cascade: true,
  })
  @JoinColumn()
  company: Company;
}
