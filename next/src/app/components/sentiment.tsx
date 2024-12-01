"use client"

import {useMemo} from "react";

export default function Sentiment({
  member,
  className
} : {
  member: MemberInterface,
  className?: string
}) {

  // State
  const sentimentClasses = useMemo(() => {
    return member.judgementCount > 0 ? 'bg-green-400' :
      member.judgementCount < 0 ? 'bg-red-400' : ''
  }, [member])

  return (
    <span className={`border rounded p-1 px-2 text-xs ${className} ${sentimentClasses}`}>Sentiment: {member.judgementCount || 0}</span>
  )
}

