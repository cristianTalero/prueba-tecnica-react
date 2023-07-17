import { BiSolidHome } from 'react-icons/bi'
import { PageLayout } from '../layouts/PageLayout'

export default function Home() {
  return (
    <PageLayout title="Inicio" icon={<BiSolidHome />} filter={<></>}>
      <p className="text-[2rem] text-secondary">
        Oprime el boton del avatar en la parte superior a la derecha para acceder a los enlaces :)
      </p>
    </PageLayout>
  )
}
