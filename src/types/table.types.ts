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

//Get Space
export interface TGetSpaceResponseData {
  id: string;
  name: string;
}
export interface TGetSpaceResponse {
  message: string;
  data: TGetSpaceResponseData[];
}

//Get Table
export interface TGetTableResponseData {
  id: string;
  capcaity: string;
  status: Status;
  name: string;
}
export interface TGetTableResponse {
  message: string;
  data: TGetTableResponseData[];
}

//Get Category
export interface TGetCategoryResponseData {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface TGetCategoryResponse {
  message: string;
  data: TGetCategoryResponseData[];
}
