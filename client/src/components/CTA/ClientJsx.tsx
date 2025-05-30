"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'


const ClientJsx = () => {
  return (
    <>
      <Link href={"/sign-up"}>
        <Button
          size={"lg"}
          className="bg-white text-brand-600 font-semibold hover:bg-neutral-50 hover:text-brand-700"
        >
          Get Started For Free
        </Button>
      </Link>
      <Link href={"/jobs"}>
        <Button
          size={"lg"}
          variant={"outline"}
          className=" text-brand-600 font-semibold hover:text-brand-700 min-w-[200px]"
        >
          Browse Jobs
        </Button>
      </Link>
    </>
  );
}

export default ClientJsx