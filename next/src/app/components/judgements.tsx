"use client"

export default function Judgements({judgements} : {judgements: JudgmentInterface[]}) {
  return (
    <div className={'fixed top-12 left-12 right-12 bottom-12 bg-white shadow-lg rounded-lg p-10'}>
      <ul>
        {judgements.map(j => (
          <li key={JSON.stringify(j)}>
            <div>{j.judgement}</div>
            <div>{j.reason}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

