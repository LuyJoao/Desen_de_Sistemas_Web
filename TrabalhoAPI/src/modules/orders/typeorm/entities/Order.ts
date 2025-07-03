import Customer from "@modules/customers/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import OrdersProducts from "./OrdersProducts";

@Entity('orders')
export default class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => Customer)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;
    @OneToMany(() => OrdersProducts, orders_products => orders_products.order, {cascade: true})
    orders_products: OrdersProducts[];
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn()
    updated_at: Date;
}