export interface User{
  mail:string,
  name:string,
  uid:string,
  decks:any
}
export interface TaskType{
  taskName:string
  completed: boolean
  date: string
  id:number
}
export interface ColonType{
  tasks: TaskType[]
  colonName:string
  id:number
}
export interface DeckType{
  colons:ColonType[]
  id:number
}
