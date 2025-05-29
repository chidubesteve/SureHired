"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';


export const ClientSaveButtonJsx = () => {
    const [isJobSaved, setIsJobSaved] = useState(false)
    const handleSaveJob = () => {
        setIsJobSaved((prev) => !prev)
        console.log("clicked")
    }
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={handleSaveJob}
    >
      {isJobSaved ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </Button>
  );
}
