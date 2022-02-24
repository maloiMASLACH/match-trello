export interface InputBlockProps {
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  type: string;
}
