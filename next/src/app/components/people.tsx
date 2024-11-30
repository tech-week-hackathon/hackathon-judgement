"use client"

import { useState, useEffect } from "react"
import initialPeople from "../../../config.json"
import Persons from "./person";

export default function People() {

  // State
  const [people, setPeople] = useState<Person[]>(initialPeople?.members || [])

  // Actions
  const getData = () => {
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

  // Effects
  useEffect(() => {
    getData()
  },[])

  return (
    <div>
      <ul className="space-y-4">
        {people
          .sort((a, b) => b.judgments - a.judgments)
          .map((p) => (
            <Persons key={p.coldCredHex} person={p} />
          ))}
      </ul>
    </div>
  )
}

