import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Session } from '../../types';

@Entity()
export class Sessions {
  @ObjectIdColumn({ type: 'uuid' })
  public _id: string;
  @Column()
  public expires: Date;
  @Column()
  public session: Session;
}
