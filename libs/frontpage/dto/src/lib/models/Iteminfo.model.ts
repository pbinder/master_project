import { Item } from "./Item.model";

export interface Iteminfo {
  type:string;
  version: string;
  basic: object;
  data: {
    [id:number]: Item
  }
}
