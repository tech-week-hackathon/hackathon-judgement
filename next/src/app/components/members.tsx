"use client"

import { useState, useEffect } from "react"
import Member from "./member";
import Judgements from "./judgements";
import Sentiment from "./sentiment";

export default function Members() {

  // State
  const [members, setMembers] = useState<MemberInterface[]>([])
  const [member, setMember] = useState<MemberInterface|null>(null)
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
  const getJudgements = (member: MemberInterface) => {
    setMember(member)
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
        <>
          <Sentiment members={members} />
          <ul className="space-y-4">
            {members
              .sort((a, b) => b.judgementCount - a.judgementCount)
              .map((p) => (
                <Member key={p.coldCredHex} member={p} getJudgements={getJudgements} />
              ))}
          </ul>
        </>
      )}
      {member && judgments.length ? (
        <Judgements member={member} judgements={judgments} close={() => setJudgments([])}/>
      ) : null}
    </div>
  )
}
