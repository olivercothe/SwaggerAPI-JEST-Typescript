/**
 * UserPosts entity
 */
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated} from 'typeorm'

@Entity()
class UserPosts {

  @PrimaryGeneratedColumn()
  id: (number | undefined) = undefined

  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 40,
    nullable: true
  })
  user_id: (string | null) = null

  @Column({
    name: 'post_id',
    type: 'varchar',
    length: 40,
    nullable: true
  })
  post_id: (string | null) = null

  @Column({
    name: 'category_id',
    type: 'varchar',
    length: 40,
    nullable: true
  })
  category_id: (string | null) = null

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

export default UserPosts
