export interface SelectProps extends
  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  id: string;
  values: string[];
}
