/**
 * Users entity
 */
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated} from 'typeorm'

@Entity()
class Users {

  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  user_id: string | undefined

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true
  })
  email: (string | null) = null

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 40,
    nullable: true
  })
  first_name: (string | null) = null

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 40,
    nullable: true
  })
  last_name: (string | null) = null

  @Column({
    name: 'role',
    type: 'varchar', 
    length: 15,
    default: "advisor",
    nullable: false
  })
  role: string | undefined

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

export default Users
