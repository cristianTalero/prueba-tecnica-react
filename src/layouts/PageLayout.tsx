import { ReactNode } from 'react'
import { Navbar } from '../components/Navbar'
import { Helmet } from 'react-helmet'
import { APP_NAME } from '../utils/constants'
import { FilterModal } from '../components/filters/FilterModal'

type Props = {
  title: string
  icon: JSX.Element
  filter: JSX.Element
  children: ReactNode
}

export function PageLayout({ title, icon, filter, children }: Props) {
  return (
    <>
      <Helmet>
        <title>
          {title} | {APP_NAME}
        </title>
      </Helmet>

      <Navbar>{APP_NAME}</Navbar>
      <main className="p-6">
        <div className="flex justify-between">
          <h1 className="prose-2xl flex items-center gap-2">
            {icon}
            {title}
          </h1>

          <FilterModal>{filter}</FilterModal>
        </div>
        <hr className="mb-3" />
        {children}
      </main>
    </>
  )
}
