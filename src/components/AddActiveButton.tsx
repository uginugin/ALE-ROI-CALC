import { useRef, useState } from "react"
import plus from '../assets/add.svg'
import checkMark from '../assets/checkbox-marked.svg'
import cancel from '../assets/cancel.svg'

const AddActiveButton = ({ addActive }: { addActive: (name: string) => void }) => {
  const [isPressed, setIsPressed] = useState(false)
  const newName = useRef('')
  return (
    <>
      <button className="button"
        onClick={() => {
          setIsPressed((prev) => !prev)
        }}
      >
        <img src={plus} alt='Add active' />
      </button>

      {isPressed && (
        <form
          style={{ display: 'flex', justifyContent: 'center' }}
          onSubmit={(e) => {
            e.preventDefault()
            setIsPressed(false)
            addActive(newName.current)
            newName.current=''
          }}>
          <input
            placeholder='Введите имя актива'
            onChange={(e) => newName.current = e.target.value} 
          />
          <button className="button" type="submit">
            <img src={checkMark} alt='Ok' />
          </button>
          <button className="button" onClick={() => setIsPressed(false)}>
            <img src={cancel} alt='Cancel editing' />
          </button>
        </form>
      )}
    </>
  )
}
export default AddActiveButton