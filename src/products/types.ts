export interface IFilterProducts {
  latest?: string;
  brand?: string;
  featured?: string;
  page?: number;
}

export interface IProduct {
  name: string;
  price: number;
  description: string;
  instock: boolean;
  img: string;
  categories: string[];
  rating?: number;
  color: string[];
  brand: string;
  weight: string;

  configure: {
    ram: string;
    hardDisk: string;
    cpu: string;
    screen: string;
    camera: string;
    battery: string;
    os: string;
    gpu: string;
  };
}
