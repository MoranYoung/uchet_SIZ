
export type Department = {
  id: string;
  departmentName: string;
};

export type Position = {
  id: string;
  positionName: string;
};

export type Employee = {
  id: string;
  tabNumber: string;
  fullName: string;
  departmentId: string;
  positionId: string;
  hireDate: string;
  dismissDate?: string;
  clothingSize: string;
  shoeSize: string;
  height: string;
  headSize: string;
};

export type PpeItemType = 'спецодежда' | 'спецобувь' | 'СИЗ' | 'СиОС';

export type PpeItem = {
  id: string;
  itemName: string;
  itemType: PpeItemType;
  unit: string;
  isSeasonal: boolean;
  defaultWearMonths: number;
};

export type Warehouse = {
  id: string;
  warehouseName: string;
  location?: string;
};

export type Stock = {
  id: string;
  warehouseId: string;
  ppeItemId: string;
  size?: string;
  wearPercent: number;
  quantity: number;
};

export type PpeNorm = {
  id: string;
  positionId: string;
  departmentId?: string;
  ppeItemId: string;
  quantity: number;
  wearMonths: number;
  season?: string;
  validFrom: string;
  validTo?: string;
};

export type OrderStatus = 'черновик' | 'согласован' | 'в работе' | 'закрыт';

export type InternalOrder = {
  id: string;
  orderNumber: string;
  orderDate: string;
  departmentId: string;
  status: OrderStatus;
};

export type InternalOrderLine = {
  id: string;
  orderId: string;
  ppeItemId: string;
  size?: string;
  requiredQty: number;
  availableQty: number;
  toOrderQty: number;
};

export type MovementType = 'ISSUE' | 'RETURN' | 'TRANSFER' | 'WRITE_OFF' | 'EXTEND';

export type Movement = {
  id: string;
  movementNumber: string;
  movementDate: string;
  movementType: MovementType;
  employeeId?: string;
  fromWarehouseId?: string;
  toWarehouseId?: string;
  comment?: string;
};

export type MovementLine = {
  id: string;
  movementId: string;
  ppeItemId: string;
  size?: string;
  quantity: number;
  wearPercent: number;
  wearStartDate?: string;
  plannedEndDate?: string;
  baseIssueLineId?: string;
};
