import { DataSource } from "typeorm";

export interface Seeder {
    create(_datasource: DataSource): void;
    clean(_datasource: DataSource): void;
}