"use client"

import {X} from "lucide-react";

export default function Judgements({
  member,
  judgements,
  close
} : {
  member: MemberInterface,
  judgements: JudgmentInterface[],
  close: () => void
}) {
  return (
    <>
      <div className={'fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/50'} />
      <div className={'overflow-auto fixed top-12 left-12 right-12 bottom-12 bg-white shadow-lg rounded-lg p-10'}>
        <button onClick={() => close()} className={'absolute top-4 right-4'}>
          <X />
        </button>
        <h1 className={'font-bold text-2xl'}>{member.name}</h1>
        <ul>
          {judgements.map(j => (
            <li key={JSON.stringify(j)}>
              <div>{j.judgement}</div>
              <div>{j.reason}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

