import PaymentComponents from '@/components/PaymentOptions/PaymentComponents'
import PaymentFrame from '@/components/PaymentOptions/PaymentFrame'
import PaymentGiropay from '@/components/PaymentOptions/PaymentGiropay'
import Cart from '@/components/Cart'
import { Tab } from '@headlessui/react'
import CheckWorkflow from '@/components/CheckWorkflow'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  return (
    <main className='mt-24 container'>
      <div className='w-full'>
        <section className="webhook mb-8">
          <CheckWorkflow />
        </section>
        <div className='w-full flex justify-between items-start'>
          <section className='w-1/2'>
            <h1 className="w-full text-center text-2xl font-bold mb-4">Please select your payment option:</h1>

            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
                <Tab 
                  key="main"
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-black shadow'
                        : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-800'
                    )
                  }
                >
                  Main
                </Tab>
                <Tab
                  key="alternative"
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-black shadow'
                        : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-800'
                    )
                  }
                  >
                  Alternative
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className='my-4 pb-4 border-b-2 border-gray-300'>
                    <PaymentFrame />
                  </div>
                  <div className='my-4 pb-4'>
                    <PaymentGiropay />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='my-4 pb-4'>
                    <PaymentComponents />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </section>
          <section className='w-2/5'>
            <Cart />
          </section>
        </div>
      </div>
    </main>
  )
}
