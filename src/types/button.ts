export interface StartButtonProps
  extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  text: string;
  disabled: boolean;
  handleClick: () => void;
}
