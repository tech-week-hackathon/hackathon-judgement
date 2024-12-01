"use client"

import {useMemo} from "react";

export default function Score({
  member,
  className
} : {
  member: MemberInterface,
  className?: string
}) {

  // State
  const scoreClasses = useMemo(() => {
    return member.judgementCount > 0 ? 'bg-green-400' :
      member.judgementCount < 0 ? 'bg-red-400' : ''
  }, [member])

  return (
    <span className={`border rounded p-1 px-2 text-xs ${className} ${scoreClasses}`}>Score: {member.judgementCount || 0}</span>
  )
}

