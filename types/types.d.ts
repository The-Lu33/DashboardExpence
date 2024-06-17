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
  type_move: TypeMovement | string;
  category: Category | string;
  description: string;
  mount: float | number | string;
  time: string;
  date: string;
}

export interface UserInterface {
  id: string;
  name: string;
  last_name: string;
  email: string;
  img: string;
}
