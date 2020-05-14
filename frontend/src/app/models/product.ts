import { Categories } from './categories';

export class Product {
    id_Product: number;
    ProductName: string;
    ProductColor: string;
    ProductColorId: number;
    ProductDescription: string;
    ProductUnitPrice: number;
    ProductSize: number;
    ImageName: string;
    ImagePath: string;
    ManufacturerId: number;
    ManufacturerName: string;
    isActive: boolean;
    CategoryName: string;
    CategoryId: number;
    Categories: Categories[];
}