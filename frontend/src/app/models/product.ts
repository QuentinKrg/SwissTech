import { Categories } from './categories';

export class Product {
    id_Product: number;
    ProductName: string;
    ProductColor: string;
    ProductDescription: string;
    ProductUnitPrice: number;
    ImageName: string;
    ImagePath: string;
    ManufacturerName: string;
    isActive: boolean;
    CategoryName: string;
    Categories: Categories[];
}