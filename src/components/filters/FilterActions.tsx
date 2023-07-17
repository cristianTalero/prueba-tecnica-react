import { AiFillCheckCircle } from 'react-icons/ai'
import { BiSolidTrash } from 'react-icons/bi'

type Props = {
  onReset(): void
}

export function FilterActions({ onReset }: Props) {
  return (
    <div className="modal-actions flex gap-2 mt-3 justify-end">
      <button className="btn btn-sm btn-primary btn-outline" type="button" onClick={onReset}>
        <BiSolidTrash />
        Limpiar
      </button>
      <button className="btn btn-sm btn-primary" type="submit">
        <AiFillCheckCircle />
        Aplicar
      </button>
    </div>
  )
}
