"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface Person {
  id: number
  name: string
  votes: number
  reasons: string[]
}

interface PeopleVotingAppProps {
  initialPeople: Person[]
}

export default function PeopleVotingApp({ initialPeople }: PeopleVotingAppProps) {
  const [people, setPeople] = useState<Person[]>(initialPeople)
  const [newReason, setNewReason] = useState("")

  useEffect(() => {
    const storedPeople = localStorage.getItem("votedPeople")
    if (storedPeople) {
      setPeople(JSON.parse(storedPeople))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("votedPeople", JSON.stringify(people))
  }, [people])

  const vote = (id: number, increment: number) => {
    setPeople(
      people.map((person) =>
        person.id === id
          ? { ...person, votes: person.votes + increment }
          : person
      )
    )
  }

  const addReason = (id: number) => {
    if (newReason.trim()) {
      setPeople(
        people.map((person) =>
          person.id === id
            ? { ...person, reasons: [...person.reasons, newReason.trim()] }
            : person
        )
      )
      setNewReason("")
    }
  }

  return (
    <div>
      <ul className="space-y-4">
        {people
          .sort((a, b) => b.votes - a.votes)
          .map((person) => (
            <li key={person.id} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{person.name}</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => vote(person.id, 1)}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span className="sr-only">Upvote</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => vote(person.id, -1)}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    <span className="sr-only">Downvote</span>
                  </Button>
                  <span className="font-bold" aria-live="polite">Votes: {person.votes}</span>
                </div>
              </div>
              <div className="mb-2 flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a reason for your vote"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="flex-grow"
                />
                <Button size="sm" onClick={() => addReason(person.id)}>
                  Add Reason
                </Button>
              </div>
              <ul className="list-disc list-inside">
                {person.reasons.map((reason, index) => (
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

