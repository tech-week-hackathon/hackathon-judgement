"use client"

import { ThumbsUp, ThumbsDown } from 'lucide-react'
import {useState} from "react";

export default function Member({member} : {member: MemberInterface}) {

  // State
  const [reason, setReason] = useState<string|null>('')

  // Actions
  const judge = (coldCredHex: string, judgment: 'up' | 'down') => {
    if (!reason) {
      alert('Please add a reason for your judgment')
    } else {
      alert('You have passed your judgment: ' + judgment + '! With your reason: ' + reason)
    }

    // @todo call meshJS to cast vote
  }

  return (
    <div>
      <li key={member.coldCredHex} className="border p-4 rounded-lg">
        <div className="flex items-center gap-4 mb-2">
            <div className={'w-12 h-12 p-2 border rounded flex items-center'}>
              <a href={member.twitter} target="_blank" className={'hover:scale-[1.2] transition'}>
                <img
                  className="dark:invert block"
                  src={member.logoURI}
                  alt={member.name}
                  width={42}
                  height={48}
                />
              </a>
            </div>
            <span className="font-semibold">{member.name}</span>
            <span className="font-bold ml-auto" aria-live="polite">Judgments: {member.judgementCount || 0}</span>
        </div>
        <div className="flex items-center gap-2 border pl-2">
          <button
            onClick={() => judge(member.coldCredHex, 'up')}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            <span className="sr-only">Up judgment</span>
          </button>
          <button
            onClick={() => judge(member.coldCredHex, 'down')}
          >
            <ThumbsDown className="w-4 h-4 mr-1" />
            <span className="sr-only">Down judgment</span>
          </button>
          <input
            type="text"
            placeholder="Add a reason for your judgment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="flex-grow border-l p-1 px-2"
          />
        </div>
      </li>
    </div>
  )
}

