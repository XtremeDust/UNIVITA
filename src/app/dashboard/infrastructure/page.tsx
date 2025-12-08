import React from 'react'
import TableSpaces from '@/components/sections_Dashboard/spaces/tableSpaces'
import TimeConfig from '@/components/sections_Dashboard/spaces/TimeConfig'

export default function page() {
  return (
    <div>
      <TableSpaces/>
      <TimeConfig/>
    </div>
  )
}
