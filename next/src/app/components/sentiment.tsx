"use client"

import {useEffect, useMemo, useState} from "react";

export default function Sentiment() {

  // State
  const [totals, setTotals] = useState<JudgmentTotalResponse|null>(null)
  const sentimentClasses = useMemo(() => {
    if (!totals) return
    return totals?.total > 0 ? 'bg-green-400' :
      totals?.total < 0 ? 'bg-red-400' : ''
  }, [totals])

  // Effects
  useEffect(() => {
    const getTotals = () => {
      fetch(`http://10.0.7.162:3000/totals`
        ,{
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setTotals(json || [])
        });
    }
    getTotals()
  }, [])

  return (
    <div className={`shadow-md border rounded p-8 text-center mb-4 ${sentimentClasses}`}>
      Community CC Proof of Merit: <strong>{totals?.total || 0}</strong>
    </div>
  )
}

