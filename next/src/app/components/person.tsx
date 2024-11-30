"use client"

import { ThumbsUp, ThumbsDown } from 'lucide-react'
import {useState} from "react";

export default function Persons({person} : {person: Person}) {

  // State
  const [reason, setReason] = useState<string|null>('')

  // Actions
  const judge = (coldCredHex: string, judgment: 'up' | 'down') => {
    alert('You have passed your judgment: ' + judgment + '! With your reason: ' + reason)

    // @todo call meshJS to cast vote
    // @todo re-fetch results?
  }

  return (
    <div>
      <li key={person.coldCredHex} className="border p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">{person.name}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => judge(person.coldCredHex, 'up')}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="sr-only">Up judgment</span>
            </button>
            <button
              onClick={() => judge(person.coldCredHex, 'down')}
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              <span className="sr-only">Down judgment</span>
            </button>
            <span className="font-bold" aria-live="polite">Votes: {person.judgementCount || 0}</span>
          </div>
        </div>
        <div className="mb-2 flex gap-2">
          <input
            type="text"
            placeholder="Add a reason for your judgment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="flex-grow border rounded p-1 px-2"
          />
        </div>
        <ul className="list-disc list-inside">
          {person?.judgments?.map((reason, index) => (
            <li key={index} className="text-sm text-gray-600">
              {reason}
            </li>
          ))}
        </ul>
      </li>
    </div>
  )
}

