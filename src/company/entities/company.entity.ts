import { Team } from 'src/team/entities/team.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  companyName: string;

  @Column()
  companyCEO: string;

  @Column()
  companyAddress: string;

  @Column({ type: 'timestamp', default: 'now()' })
  inceptionDate: Date;

  @OneToMany((type) => Team, (team) => team.company)
  team: Team[];
}
