import PaymentFrame from '@/components/PaymentOptions/PaymentFrame'
import Cart from '@/components/Cart'
import CheckWorkflow from '@/components/CheckWorkflow'
import HostedPage from '@/components/PaymentOptions/HostedPage'

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
            <div className='bg-slate-200 rounded-xl p-8'>
              <div className='italic'>
                <p>
                  Use one of the following test cards:
                </p>
                <div>
                  <p>Cartes Bancaires or Visa (3DS2 frictionless flow): 4010056200000018 08/28 100</p>
                  <p>Cartes Bancaires or Mastercard (3DS2 challenge flow): 5137210000000158 08/28 100</p>
                </div>
              </div>
            </div>
            <div className='my-4 pb-4 border-b-2 border-gray-300'>
              <PaymentFrame />
            </div>
            <div className='my-4 pb-4'>
              <HostedPage />
            </div>
          </section>
          <section className='w-2/5'>
            <Cart />
          </section>
        </div>
      </div>
    </main>
  )
}
