export interface NewTaskProps {
  uid: string;
}

export interface NewTaskAddProps extends NewTaskProps {
  handleActive: () => void;
}
