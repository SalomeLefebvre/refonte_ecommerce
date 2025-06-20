import { AddressEntity } from "src/address/entities/address.entity";
import { CustomerEntity } from "src/customer/entities/customer.entity";

export const CUSTOMER_ID = "597ad4ef-3b68-473e-b1c0-ca38949b0776";
export const ADDRESS_1_ID = "597ad4ef-3b68-473e-b1c0-ca38949b0778";
export const ADDRESS_2_ID = "597ad4ef-3b68-473e-b1c0-ca38949b0779";

export const AddressBasicData: AddressEntity[] = [
  {
    id: ADDRESS_1_ID,
    street: "3 rue qql",
    city: "Allençons",
    zipCode: "44400",
    country: "France",
    addressType: "Shipping",
    customer: { id: CUSTOMER_ID } as CustomerEntity,
  },
  {
    id: ADDRESS_2_ID,
    street: "2 rue qql",
    city: "Bordeaux",
    zipCode: "33800",
    country: "France",
    addressType: "Shipping",
    customer: { id: CUSTOMER_ID } as CustomerEntity,
  },
];
