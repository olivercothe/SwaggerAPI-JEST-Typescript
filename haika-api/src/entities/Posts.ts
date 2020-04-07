/**
 * Posts entity
 */
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated} from 'typeorm'

@Entity()
class Posts {

  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  post_id: string | undefined

  @Column({
    name: 'images',
    type: 'varchar',
    array: true,
  })
  images: string[] | undefined

  @Column({
    name: 'list',
    type: 'varchar',
    array: true,
  })
  list: string[] | undefined

  @Column({
    name: 'state',
    type: 'varchar',
    length: 20,
    nullable: true
  })
  state: (string | null) = null

  @Column({
    name: 'link',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  link: (string | null) = null

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

export default Posts
