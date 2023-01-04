
export interface Item {
  name: string;
  description: string;
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell:number;
  }

}
