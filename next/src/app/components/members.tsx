"use client"

import { useState, useEffect } from "react"
import Member from "./member";
import Judgments from "./judgments";
import Sentiment from "./sentiment";

export default function Members() {

  // State
  const [members, setMembers] = useState<MemberInterface[]>([])
  const [member, setMember] = useState<MemberInterface|null>(null)
  const [judgments, setJudgments] = useState<JudgmentResponse|null>(null)
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
  const getJudgments = (member: MemberInterface) => {
    setMember(member)
    fetch(`http://10.0.7.162:3000/judgements/${member.coldCredBech}`
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
        setJudgments(json || null)
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
          <Sentiment />
          <ul className="space-y-4">
            {members
              .map((p) => (
                <Member key={p.coldCredHex} member={p} getJudgments={getJudgments} />
              ))}
          </ul>
        </>
      )}
      {member && judgments ? (
        <Judgments member={member} judgments={judgments} close={() => {
          setJudgments(null)
          setMember(null)
        }}/>
      ) : null}
    </div>
  )
}
