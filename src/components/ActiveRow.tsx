import { FC } from "react"
import addIcon from '../assets/add.svg'
import removeIcon from '../assets/delete.svg'
import { TTableActives, TTableSubRows } from "../types/table"
import uuid from 'react-uuid';
import { columns, defaultSubRow } from "../helpers/tableColumns"
import SubRow from "./SubRow"
import EditableTextField from "./EditableTextField";

type TActiveRowProps = {
  activeName: string,
  removeActive: (name: string) => void,
  subRows: TTableSubRows,
  table: TTableActives
  setTable: React.Dispatch<React.SetStateAction<TTableActives>>
}

const ActiveRow: FC<TActiveRowProps> = ({
  activeName,
  removeActive,
  subRows,
  table,
  setTable
}) => {

  const addSubRow = () => {
    setTable(prev => {
      const tableCopy = structuredClone(prev)
      const newSubRowId = uuid()
      tableCopy[activeName][newSubRowId] = { ...defaultSubRow }
      return tableCopy
    })
  }

  const removeSubRow = (subRowId: string) => {
    setTable(prev => {
      const tableCopy = structuredClone(prev)
      delete tableCopy[activeName][subRowId]
      return tableCopy
    })
  }

  const onActiveNameChange = (columnName: string, newValue: string) => {
    if (Object.keys(table).includes(newValue)) {
      alert('Такое имя уже существует!')
      return
    }

    setTable(prev => {
      const tableCopy = structuredClone(prev)
      const tmp = structuredClone(tableCopy[columnName])
      delete tableCopy[columnName]
      tableCopy[newValue] = tmp
      return tableCopy
    })
  }


  if (!subRows) return <div>Ошибка</div>

  const subRowsAmount = Object.keys(subRows).length
  return (
    <>
      <tr>
        <td rowSpan={subRowsAmount + 1}>
          <div>
            <button
              className="small-button"
              onClick={() => addSubRow()}>
              <img src={addIcon} alt='add active' />
            </button>
            <button
              className="small-button"
              onClick={() => removeActive(activeName)}>
              <img src={removeIcon} alt='remove active' />
            </button>
          </div>
        </td>
        <td rowSpan={subRowsAmount + 1}>
          <EditableTextField
            columnName={activeName as typeof columns[number]}
            value={activeName}
            onCellChange={onActiveNameChange}
          />
        </td>
      </tr>
      {Object.entries(subRows).map((v, i) =>
        <SubRow
          key={i}
          subRowId={v[0]}
          activeName={activeName}
          removeSubRow={removeSubRow}
          table={table}
          setTable={setTable}
        />
      )}
    </>
  )
}
export default ActiveRow