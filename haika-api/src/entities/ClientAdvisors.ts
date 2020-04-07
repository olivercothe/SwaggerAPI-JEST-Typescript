/**
 * ClientAdvisors entity
 */
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated} from 'typeorm'

@Entity()
class ClientAdvisors {

  @PrimaryGeneratedColumn()
  id: (number | undefined) = undefined

  @Column({
    name: 'client_user_id',
    type: 'varchar',
    length: 40,
    nullable: true
  })
  client_user_id: (string | null) = null

  @Column({
    name: 'advisor_user_id',
    type: 'varchar',
    length: 40,
    nullable: true
  })
  advisor_user_id: (string | null) = null

  @CreateDateColumn({
    type: 'timestamp'
  })
  created_at: (Date | null) = null

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updated_at: (Date | null) = null
}

export default ClientAdvisors
