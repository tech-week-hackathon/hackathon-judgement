"use client"

import { useState, useEffect } from "react"
import initial from "../../../config.json"
import Member from "./member";

export default function Members() {

  // State
  const [members, setMembers] = useState<MemberInterface[]>(initial?.members || [])

  // Actions
  const getMembers = () => {
    fetch('../config.json'
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
        setMembers(json)
      });
  }

  // Effects
  useEffect(() => {
    getMembers()
  },[])

  return (
    <div>
      <ul className="space-y-4">
        {members
          .sort((a, b) => b.judgementCount - a.judgementCount)
          .map((p) => (
            <Member key={p.coldCredHex} member={p} />
          ))}
      </ul>
    </div>
  )
}
