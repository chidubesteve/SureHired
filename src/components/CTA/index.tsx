import React from 'react'
import ClientJsx from './ClientJsx'


const CTA = () => {
  return (
      <section className='py-20 bg-brand-600'>
          <div className='mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8 space-y-6'>
              <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>Ready to find your next opportunity?</h2>
              <p className='text-xl text-brand-100'>Join thousands of professionals who have found their dream jobs through SureHired</p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <ClientJsx />
            </div>
          </div>
    </section>
  )
}

export default CTA