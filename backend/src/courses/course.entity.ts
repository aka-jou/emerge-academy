import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity("courses")
export class Course {
  // Usa el mismo slug que el catálogo del frontend (ej. "alturas", "primeros-auxilios").
  @PrimaryColumn()
  id: string

  @Column()
  type: string

  @Column()
  standard: string

  @Column()
  title: string

  @Column("text")
  description: string

  @Column()
  duration: string

  @Column()
  requirement: string

  @Column()
  venue: string

  @Column({ default: false })
  online: boolean

  @Column()
  action: string

  @Column()
  image: string

  // Precio fijo en MXN, calculado al sembrar la base de datos (antes era estimado en el cliente).
  @Column("int")
  priceMxn: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
