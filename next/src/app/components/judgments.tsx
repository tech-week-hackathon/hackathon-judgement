"use client"

import {X} from "lucide-react";
import Score from "./score";
import {trimString} from "../utils";

export default function Judgments({
  member,
  judgments,
  close
} : {
  member: MemberInterface,
  judgments: JudgmentResponse,
  close: () => void
}) {

  return (
    <>
      <div className={'fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/50'} />
      <div className={'overflow-auto fixed top-12 left-12 right-12 bottom-12 bg-white shadow-lg rounded-lg p-10'}>
        <div className={'flex gap-4 items-center border-b pb-2 mb-8'}>
          <h1 className={'font-bold text-2xl'}>{member.name}</h1>
          <Score judgments={judgments} />
          <button onClick={() => close()} className={'absolute top-4 right-4'}>
            <X />
          </button>
        </div>
        <table className={'w-full'}>
          <thead className={'text-left'}>
            <tr className={'border-b'}>
              <th>Voter</th>
              <th>Judgment</th>
              <th>Reason</th>
              <th className={'text-right'}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {judgments.judgements.length ? judgments.judgements.map(j => (
              <tr key={JSON.stringify(j)} className={'border-b'}>
                <td>{trimString(j.voter)}</td>
                <td className={`${j.judgement === 'up' ? 'text-red-400' : 'text-green-400'}`}>{j.judgement}</td>
                <td>{j.reason}</td>
                <td className={'text-right'}>{j.balance}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3}>No judgments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

