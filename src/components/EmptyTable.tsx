import { MdSentimentVeryDissatisfied } from 'react-icons/md'

export function EmptyTable() {
  return (
    <div className="hero flex flex-col">
      <MdSentimentVeryDissatisfied className="text-primary text-[6rem]" />
      <p className="prose-2xl mb-3 text-ellipsis text-center">
        No se encontraron elementos con los filtros de busqueda utilizados!
      </p>
    </div>
  )
}
