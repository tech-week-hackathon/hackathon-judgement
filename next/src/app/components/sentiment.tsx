"use client"

import {useMemo} from "react";

export default function Sentiment({
  members,
} : {
  members: MemberInterface[],
}) {

  const sentiment = useMemo(
    () => members
      .map(m => m.judgementCount)
      .reduce((s, m) => s + m, 0),
    [members]
  )

  const sentimentClasses = useMemo(() => {
    return sentiment > 0 ? 'bg-green-400' :
      sentiment < 0 ? 'bg-red-400' : ''
  }, [sentiment])

  return (
    <div className={`shadow-md border rounded p-8 text-center mb-4 ${sentimentClasses}`}>
      Community CC Proof of Merit: <strong>{sentiment}</strong>
    </div>
  )
}

