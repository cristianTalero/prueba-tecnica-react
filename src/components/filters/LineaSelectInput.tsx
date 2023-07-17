type Props = {
  linea: string
  onChange(linea: string): void
}

export function LineaSelectInput({ linea, onChange }: Props) {
  return (
    <div>
      <label htmlFor="linea" className="label">
        <span className="label-text">Selecciona la linea</span>
      </label>
      <select
        name="linea"
        className="select w-full select-bordered"
        onChange={e => onChange(e.target.value)}
        value={linea}
      >
        <option value="Linea" disabled selected>
          Linea
        </option>
        <option value="Tramo 1">Tramo 1</option>
        <option value="Tramo 2">Tramo 2</option>
        <option value="Tramo 3">Tramo 3</option>
        <option value="Tramo 4">Tramo 4</option>
        <option value="Tramo 5">Tramo 5</option>
      </select>
    </div>
  )
}
