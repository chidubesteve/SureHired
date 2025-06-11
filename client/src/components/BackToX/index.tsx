"use client"
import Link from 'next/link'
import React from 'react'
import { LuChevronLeft } from 'react-icons/lu'

type Props = {
    path: string
    dest: string
}
const BackToX = (props: Props) => {
  const {path, dest} = props
  return (
    <div className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
      <LuChevronLeft className="w-4 h-4 mr-1" />
      <Link href={path}>Back to {dest}</Link>
    </div>
  )
}

export default BackToX

