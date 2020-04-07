/**
 * Categories entity
 */
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated} from 'typeorm'

@Entity()
class Categories {

  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  category_id: string | undefined

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  category: (string | null) = null

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

export default Categories
