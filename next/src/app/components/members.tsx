"use client"

import { useState, useEffect } from "react"
import Member from "./member";
import Judgements from "./judgements";

export default function Members() {

  // State
  const [members, setMembers] = useState<MemberInterface[]>([])
  const [judgments, setJudgments] = useState<JudgmentInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Actions
  const getMembers = () => {
    fetch('./config.json'
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
        setMembers(json?.members || [])
        setLoading(false)
      });
  }
  const getJudgements = (coldCredHex: string) => {
    console.log('coldCredHex', coldCredHex)
    fetch('./config.judgments.json'
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
        setJudgments(json?.judgements || [])
      });
  }

  // Effects
  useEffect(() => {
    getMembers()
  },[])

  return (
    <div>
      {loading ? (
        <div className={'w-full h-96 flex items-center justify-center'}>Loading...</div>
      ) : (
        <div className="space-y-4">
          {members
            .sort((a, b) => b.judgementCount - a.judgementCount)
            .map((p) => (
              <Member key={p.coldCredHex} member={p} getJudgements={getJudgements} />
            ))}
        </div>
      )}
      {judgments.length ? <Judgements judgements={judgments}/> : null}
    </div>
  )
}
