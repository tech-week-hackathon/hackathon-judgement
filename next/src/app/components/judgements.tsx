"use client"

import {X} from "lucide-react";
import Sentiment from "./sentiment";

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
        <div className={'flex gap-4 items-center border-b pb-2 mb-2'}>
          <h1 className={'font-bold text-2xl'}>{member.name}</h1>
          <Sentiment member={member} />
          <button onClick={() => close()} className={'absolute top-4 right-4'}>
            <X />
          </button>
        </div>
        <table className={'w-full'}>
          <thead className={'text-left'}>
            <tr>
              <th>
                Voter
              </th>
              <th>
                Judgment
              </th>
              <th>
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {judgements.map(j => (
              <tr key={JSON.stringify(j)}>
                <td>{j.voter}</td>
                <td>{j.judgement}</td>
                <td>{j.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

