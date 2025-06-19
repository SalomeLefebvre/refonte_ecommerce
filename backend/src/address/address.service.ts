import { Injectable } from "@nestjs/common";
import { AddressRepository } from "./repositories/address.repository";

@Injectable()
export class AddressService {
    constructor(private readonly _addressRepository: AddressRepository){}

}