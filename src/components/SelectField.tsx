import { FC } from "react"
import { columns, selectColumns } from "../helpers/tableColumns"

type TSelectedFieldProps = {
  columnName: keyof typeof selectColumns,
  value: string,
  onCellChange: (columnName: typeof columns[number], newValue: string) => void
}

const SelectField: FC<TSelectedFieldProps> = ({
  columnName,
  value,
  onCellChange
}) => {
  return (
    <select defaultValue={value} onChange={(e) => onCellChange(columnName, e.target.value)}>
      {selectColumns[columnName].map((v, i) => (
        <option key={i}>{v}</option>
      ))}
    </select>
  )
}
export default SelectField