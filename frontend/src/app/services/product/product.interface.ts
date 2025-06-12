export interface IProduct {
    id: string;
    name: string;
    description_short: string;
    description_long: string;
    price: number;
    currency: string;
    stock: number;
    category: string;
    images: string[];
}