import { useEffect, useState } from "react"
import AddActiveButton from "./AddActiveButton"
import { TTableActives } from "../types/table"
import { columns, defaultSubRow } from "../helpers/tableColumns"
import ActiveRow from "./ActiveRow"

const MainTable = () => {
  const [table, setTable] = useState<TTableActives>(
    JSON.parse(localStorage.getItem("table") as string) || []
  )

  const addActive = (name: string) => {
    if (Object.keys(table).includes(name)) {
      alert('Такое имя уже существует!')
      return
    }
    setTable(prev => ({ ...prev, [name]: { 0: defaultSubRow } }))
  }

  useEffect(() => {
    localStorage.setItem('table', JSON.stringify(table))
  }, [table])

  const removeActive = (name: string) => {
    setTable(prev => {
      const newState = { ...prev }
      delete newState[name]
      return newState
    })
  }

  return (
    <>
      <AddActiveButton addActive={addActive} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Название актива</th>
            {columns.map((v, i) => <th key={i}>{v}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(table).map((v, i) => (
            <ActiveRow key={i}
              activeName={v[0]}
              removeActive={removeActive}
              subRows={table[v[0]]}
              table={table}
              setTable={setTable}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}
export default MainTable