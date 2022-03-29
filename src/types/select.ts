export interface SelectProps {
  id: string;
  values: string[];
  onChange: (el: string) => void;
  selected: string;
}
