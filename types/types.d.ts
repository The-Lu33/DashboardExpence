type Category = "food" | "shopping" | "freelance";
type TypeMovement = "INCOME" | "EXPENSE";
export interface ItemMovementInterface {
  id: string;
  typeMove: TypeMovement | string;
  category: Category | string;
  description: string;
  mount: float | number | string;
  time: string;
  date: string;
}
