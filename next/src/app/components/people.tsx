"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import initialPeople from "../../../config.json"

interface Person {
  name: string
  bio: string
  website: string
  twitter: string
  logoURI: string
  hotCredHex: string
  coldCredHex : string // use as ID
  hotCredBech: string
  coldCredBech: string
  judgementCount: number
  judgments: Vote[]
}

interface Vote {
  judge: 'up' | 'down'
  reason: string
}

export default function People() {
  const [people, setPeople] = useState<Person[]>(initialPeople?.members || [])
  const [newReason, setNewReason] = useState("")

  const getData=()=>{
    fetch('../config.json'
      ,{
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(json) {
        console.log(json);
        setPeople(json)
      });
  }

  useEffect(()=>{
    getData()
  },[])

  const vote = (coldCredHex: string, vote: 'up' | 'down') => {
    alert('Thanks for your vote ' + vote)
  }

  return (
    <div>
      <ul className="space-y-4">
        {people
          .sort((a, b) => b.judgments - a.judgments)
          .map((person) => (
            <li key={person.coldCredHex} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{person.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => vote(person.coldCredHex, 'up')}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span className="sr-only">Up vote</span>
                  </button>
                  <button
                    onClick={() => vote(person.coldCredHex, 'down')}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    <span className="sr-only">Down vote</span>
                  </button>
                  <span className="font-bold" aria-live="polite">Votes: {person.judgments}</span>
                </div>
              </div>
              <div className="mb-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a reason for your vote"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="flex-grow"
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
          ))}
      </ul>
    </div>
  )
}

