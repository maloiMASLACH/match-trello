export interface CheckIsCorrectProps {
  mail: string,
  name: string,
  password: string,
  confirmPas: string,
  setVisibly: React.Dispatch<React.SetStateAction<boolean>>
}
