import removeIcon from '../assets/delete.svg'
import SelectField from "./SelectField"
import { TTableActives } from "../types/table"
import { FC } from "react"
import { columns } from '../helpers/tableColumns'
import EditableTextField from './EditableTextField'

type TSubRowProps = {
  subRowId: string,
  activeName: string,
  removeSubRow: (subRowId: string) => void,
  table: TTableActives,
  setTable: React.Dispatch<React.SetStateAction<TTableActives>>
}

const SubRow: FC<TSubRowProps> = ({
  subRowId,
  activeName,
  removeSubRow,
  setTable,
  table
}) => {

  const cells = table[activeName][subRowId]

  const onCellChange = (columnName: typeof columns[number], newValue: string) => {
    setTable(prev => {
      const tableCopy = structuredClone(prev)
      tableCopy[activeName][subRowId][columnName] = newValue
      return tableCopy
    })
  }

  const ale1 = Number(cells["Размер ущерба"]) * Number(cells['Количество инцидентов в год']) * Number(cells['Вероятность успешной реализации угрозы'])
  const ale2 = Number(cells["Размер ущерба"]) * Number(cells['Количество инцидентов в год']) * Number(cells["Вероятность после применения мер"])
  const roi = (ale1-ale2 - Number(cells["Стоимость защитных мер"])) / Number(cells["Стоимость защитных мер"])

  return (
    <tr>
      <td>
        <SelectField columnName={"Последствие угрозы"} value={cells["Последствие угрозы"]} onCellChange={onCellChange} />
      </td>
      <td>
        <SelectField columnName={"Тип ущерба"} value={cells["Тип ущерба"]} onCellChange={onCellChange} />
      </td>
      <td>
        <SelectField columnName={"Ценность актива (величина ущерба)"} value={cells["Ценность актива (величина ущерба)"]} onCellChange={onCellChange} />
      </td>
      <td>
        <EditableTextField columnName={"Примечание (возможные последствия)"} value={cells["Примечание (возможные последствия)"]} onCellChange={onCellChange} />
      </td>
      <td>
        <EditableTextField numeric columnName={"Размер ущерба"} value={cells["Размер ущерба"]} onCellChange={onCellChange} />
      </td>
      <td>
        <EditableTextField numeric columnName={"Количество инцидентов в год"} value={cells["Количество инцидентов в год"]} onCellChange={onCellChange} />
      </td>
      <td>
        <EditableTextField numeric columnName={"Вероятность успешной реализации угрозы"} value={cells["Вероятность успешной реализации угрозы"]} onCellChange={onCellChange} />
      </td>
      <td>
        {ale1}
      </td>
      <td>
        <EditableTextField numeric columnName={"Вероятность после применения мер"} value={cells["Вероятность после применения мер"]} onCellChange={onCellChange} />
      </td>
      <td>
        {ale2}
      </td>
      <td>
        <EditableTextField numeric columnName={"Стоимость защитных мер"} value={cells["Стоимость защитных мер"]} onCellChange={onCellChange} />
      </td>
      <td>
        {roi}
      </td>
      <td>
        <button className="small-button" onClick={() => removeSubRow(subRowId)}>
          <img src={removeIcon} alt='remove row' />
        </button>
      </td>
    </tr>
  )
}
export default SubRow