
import { Department, Position, Employee, PpeItem, Warehouse, Stock, PpeNorm, Movement } from './types';

export const departments: Department[] = [
  { id: 'd1', departmentName: 'Цех №1' },
  { id: 'd2', departmentName: 'Склад готовой продукции' },
  { id: 'd3', departmentName: 'Администрация' },
  { id: 'd4', departmentName: 'Транспортный отдел' },
];

export const positions: Position[] = [
  { id: 'p1', positionName: 'Сварщик' },
  { id: 'p2', positionName: 'Слесарь' },
  { id: 'p3', positionName: 'Водитель' },
  { id: 'p4', positionName: 'Кладовщик' },
  { id: 'p5', positionName: 'Инженер' },
];

export const employees: Employee[] = [
  {
    id: 'e1',
    tabNumber: '1001',
    fullName: 'Иванов Иван Иванович',
    departmentId: 'd1',
    positionId: 'p1',
    hireDate: '2023-01-15',
    clothingSize: '52-54',
    shoeSize: '43',
    height: '180',
    headSize: '58',
  },
  {
    id: 'e2',
    tabNumber: '1002',
    fullName: 'Петров Петр Петрович',
    departmentId: 'd1',
    positionId: 'p2',
    hireDate: '2023-02-20',
    clothingSize: '48-50',
    shoeSize: '42',
    height: '175',
    headSize: '57',
  },
  {
    id: 'e3',
    tabNumber: '1003',
    fullName: 'Сидоров Сидор Сидорович',
    departmentId: 'd4',
    positionId: 'p3',
    hireDate: '2022-11-10',
    clothingSize: '50-52',
    shoeSize: '44',
    height: '185',
    headSize: '60',
  },
];

export const ppeItems: PpeItem[] = [
  { id: 'ppe1', itemName: 'Костюм сварщика', itemType: 'спецодежда', unit: 'шт.', isSeasonal: false, defaultWearMonths: 12 },
  { id: 'ppe2', itemName: 'Ботинки защитные', itemType: 'спецобувь', unit: 'пара', isSeasonal: false, defaultWearMonths: 12 },
  { id: 'ppe3', itemName: 'Перчатки рабочие', itemType: 'СИЗ', unit: 'пара', isSeasonal: false, defaultWearMonths: 1 },
  { id: 'ppe4', itemName: 'Маска сварщика (Хамелеон)', itemType: 'СИЗ', unit: 'шт.', isSeasonal: false, defaultWearMonths: 24 },
  { id: 'ppe5', itemName: 'Куртка утепленная', itemType: 'спецодежда', unit: 'шт.', isSeasonal: true, defaultWearMonths: 36 },
];

export const warehouses: Warehouse[] = [
  { id: 'w1', warehouseName: 'Центральный склад', location: 'ул. Промышленная, 10' },
  { id: 'w2', warehouseName: 'Склад Цеха №1', location: 'ул. Промышленная, 10, корп. 1' },
];

export const stock: Stock[] = [
  { id: 's1', warehouseId: 'w1', ppeItemId: 'ppe1', size: '52-54', wearPercent: 0, quantity: 20 },
  { id: 's2', warehouseId: 'w1', ppeItemId: 'ppe2', size: '43', wearPercent: 0, quantity: 15 },
  { id: 's3', warehouseId: 'w1', ppeItemId: 'ppe3', size: 'L', wearPercent: 0, quantity: 100 },
  { id: 's4', warehouseId: 'w2', ppeItemId: 'ppe1', size: '52-54', wearPercent: 0, quantity: 5 },
];

export const ppeNorms: PpeNorm[] = [
  { id: 'n1', positionId: 'p1', ppeItemId: 'ppe1', quantity: 1, wearMonths: 12, validFrom: '2023-01-01' },
  { id: 'n2', positionId: 'p1', ppeItemId: 'ppe4', quantity: 1, wearMonths: 24, validFrom: '2023-01-01' },
  { id: 'n3', positionId: 'p2', ppeItemId: 'ppe1', quantity: 1, wearMonths: 12, validFrom: '2023-01-01' },
];

export const movements: Movement[] = [
  {
    id: 'm1',
    movementNumber: 'В-001',
    movementDate: '2024-01-10',
    movementType: 'ISSUE',
    employeeId: 'e1',
    fromWarehouseId: 'w1',
    comment: 'Первичная выдача',
  },
];
