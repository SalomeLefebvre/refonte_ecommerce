import { AddressEntity } from "src/address/entities/address.entity";
import { Seeder } from "./seeder.interface";
import { DataSource } from "typeorm";
import { AddressBasicData } from "../data/address.basic-data";

export class AddressSeeder implements Seeder {
  /**
   * Insérer les données de base dans la BD de test
   */
  async create(dataSource: DataSource): Promise<void> {
    const addressRepo = dataSource.getRepository(AddressEntity);
    await addressRepo.save(AddressBasicData);
  }

  /**
   * Supprimer les données de base de la BD de test
   */
  async clean(dataSource: DataSource): Promise<void> {
    const addressRepo = dataSource.getRepository(AddressEntity);
    await addressRepo.delete({});
  }
}