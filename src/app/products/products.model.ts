export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  addedToCart?: boolean;

  constructor(
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
    addedToCart?: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
    this.addedToCart = addedToCart ?? false;
  }
}
