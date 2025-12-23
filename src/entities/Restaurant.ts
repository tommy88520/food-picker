// src/entities/Restaurant.ts
import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("restaurants")
export class Restaurant {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  categories: string[]; // e.g. ["breakfast", "lunch"]

  @Column({ default: "" })
  address: string;

  // 預留給 Google Maps 的座標
  @Column("json")
  location: {
    lat: number;
    lng: number;
  };

  @Column()
  rating: number;

  @Column()
  userId: string; // 🚀 對應使用者的 ID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}