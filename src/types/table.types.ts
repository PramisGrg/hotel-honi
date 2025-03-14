//Get Room
enum Status {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}
export interface TGetRoomResponseData {
  id: string;
  name: string;
  capacity: number;
  price: string;
  status: Status;
  description: string;
}
export interface TGetRoomResponse {
  data: TGetRoomResponseData[];
  message: string;
}
