import React from 'react'
import Table_Ratongs from '@/components/sections_Dashboard/rating/tableRatings'

export default function page() {
  return (
    <div className="Case2 overflow-y-auto text-black">
           <section className="grid grid-cols-1 space-y-3 lg:space-y-0 lg:gap-6 mb-4">
            <Table_Ratongs/>
           </section>
       </div>
  )
}
