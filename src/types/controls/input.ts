export interface InputBlockProps
  extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
  > {
  id: string;
  value: string;
  label?: string;
  type: string;
  validation: (value: string) => string;
}
