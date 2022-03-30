import { ChangeEvent } from "react";

export interface SelectProps {
  id: string;
  values: string[];
  handleChange: (el: ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
}
