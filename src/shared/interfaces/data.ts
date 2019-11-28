export interface DTOProps {
  img: string;
  text: string;
  date: string;
  booked: number | boolean;
}

export interface DataDB {
  id: number;
  img: string;
  text: string;
  date: string;
  booked: boolean | number;
}
