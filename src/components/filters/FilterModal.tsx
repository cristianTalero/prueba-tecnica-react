import { ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { BiFilter, BiX } from 'react-icons/bi'

type Props = {
  children: ReactNode
}

export function FilterModal({ children }: Props) {
  const [show, setShow] = useState(false)

  return (
    <>
      <button
        className="btn btn-sm btn-ghost tooltip tooltip-left normal-case"
        data-tip="Filtro"
        aria-label="Filtro"
        onClick={() => setShow(true)}
      >
        <BiFilter className="text-[1.7rem] text-primary" />
      </button>

      {createPortal(
        <dialog open={show} className={`modal modal-bottom sm:modal-middle ${show ? 'modal-open' : ''}`}>
          <div className="modal-box">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Filtro</h3>
              <button onClick={() => setShow(false)} className="btn btn-xs btn-circle" aria-label="Cerrar filtro">
                <BiX className="text-[1.5rem]" />
              </button>
            </div>

            <p className="text-sm">Cierra el modal cuando termines</p>

            {children}
          </div>
        </dialog>,
        document.body
      )}
    </>
  )
}
