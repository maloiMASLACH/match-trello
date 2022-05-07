export interface ChangeDeskNameProps {
  handleChanging: () => void;
}

export interface ChangeColumnProps extends ChangeDeskNameProps {
  uid: string;
}

export interface ChangeTaskProps extends ChangeDeskNameProps {
}
