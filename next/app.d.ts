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
  judgments: Judgment[]
}

interface Judgment {
  judge: 'up' | 'down'
  reason: string
}
