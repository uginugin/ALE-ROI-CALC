import { FC, useRef, useState } from "react"
import checkMark from '../assets/checkbox-marked.svg'
import cancel from '../assets/cancel.svg'
import { columns } from "../helpers/tableColumns"

type TEditableTextFieldProps = {
  numeric?: boolean,
  columnName: typeof columns[number],
  value: string,
  onCellChange: (columnName: typeof columns[number], newValue: string) => void
}

const EditableTextField: FC<TEditableTextFieldProps> = ({
  numeric, value, columnName, onCellChange
}) => {

  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(value)

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (numeric && isNaN(Number(inputRef.current))) {
      alert('Число введено неверно')
      return
    }
    setIsEditing(false)
    onCellChange(columnName, inputRef.current)
  }

  return (
    <div
      className='flex-center'
      onClick={() => setIsEditing(true)}>
      {value ? value : '-'}
      {isEditing && (
        <form
          className="absolute"
          onSubmit={onSubmitHandler}
          onBlur={() => setIsEditing(false)}
        >
          <input
            autoFocus
            defaultValue={value}
            onChange={(e) => inputRef.current = e.target.value}
            onFocus={(e) => e.target.select()}
          />
          <div className="flex-center">

            <button
              className="small-button"
              type="submit"
            >
              <img src={checkMark} alt='Ok' />
            </button>

            <button
              type="button"
              className="small-button"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(false)
              }}
            >
              <img src={cancel} alt='Cancel editing' />
            </button>

          </div>
        </form>
      )}
    </div>
  )
}
export default EditableTextField