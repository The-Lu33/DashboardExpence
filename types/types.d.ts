type Category =
  | "FOOD"
  | "SHOPPING"
  | "FREELANCE"
  | "SALARY"
  | "TRANSPORTATION"
  | "SUBSCRIPTION";
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
