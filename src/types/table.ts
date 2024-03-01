import { columns } from "../helpers/tableColumns"

export type TTableActives = {
  [activeName: string]: TTableSubRows
}

export type TTableSubRows = {
  [subRowId: string]: TTableColumns,
}

export type TTableColumns = {
  [columnName in (typeof columns[number])]: string
}