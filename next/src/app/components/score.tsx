"use client"

import {useMemo} from "react";

export default function Score({
  judgments,
  className
} : {
  judgments: JudgmentResponse
  className?: string
}) {

  // State
  const scoreClasses = useMemo(() => {
    return judgments.total > 0 ? 'bg-green-400' :
      judgments.total < 0 ? 'bg-red-400' : ''
  }, [judgments])

  return (
    <span className={`border rounded p-1 px-2 text-xs ${className} ${scoreClasses}`}>Merit score: {judgments.total || 0}</span>
  )
}

