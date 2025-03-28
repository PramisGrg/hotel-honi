//Order Table Type
interface TTable {
  id: string;
  name: string;
  space: string;
}

interface TITem {
  createdAt: string;
  description: string;
  foodMenuCategoryId: string;
  hotelId: string;
  id: string;
  image: string;
  kotId: string;
  name: string;
  price: number;
  updatedAt: string;
  userId: string;
}

export interface TKotItems {
  foodMenuItemId: string;
  id: string;
  item: TITem;
  kotId: string;
  quantity: number;
  status: string;
}

export interface TKots {
  KotItems: TKotItems[];
  createdAt: string;
  hotelId: string;
  id: string;
  kotNumber: string;
  orderForId: string;
  ordersId: string;
  status: string;
  type: string;
  updatedAt: string;
  userId: string;
}

export interface TOrderResponseData {
  createdAt: string;
  hotelId: string;
  id: string;
  isDeleted: boolean;
  kots: TKots[];
  orderNumber: string;
  roomId: string;
  status: string;
  table: TTable;
  tableId: string;
  type: string;
  updatedAt: string;
}

export interface TOrderResponse {
  message: string;
  data: TOrderResponseData[];
}

//Get Table
export interface TTableResponseData {
  capacity: number;
  id: string;
  name: string;
  space: string | null;
  status: string;
}
export interface TTableResponse {
  message: string;
  data: TTableResponseData[];
}

//Get Dish
interface TCategory {
  id: string;
  name: string;
}
export interface TDishesResponseData {
  category: TCategory;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
}
export interface TDishesResponse {
  message: string;
  data: TDishesResponseData[];
}
