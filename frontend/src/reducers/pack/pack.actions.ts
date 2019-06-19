import { Card, CardRank } from '../../globalTypes'

export const initPack = (): Card[] => {
  let arrC = [
    { name: "White", code: "#FFFFFF" },
    { name: "Yellow", code: "#FFCC66" },
    { name: "Green", code: "#00CC00" },
    { name: "Blue", code: "#0066CC" },
    { name: "Red", code: "#CC0033" },
    { name: "Multi", code: "" }, // code:"#9900FF"} 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  ]

  let arrR = [CardRank.Rank1, CardRank.Rank2, CardRank.Rank3, CardRank.Rank4, CardRank.Rank5]
  let pack: Card[] = [];
  let ctr = 0
  arrR.forEach(r =>
    arrC.forEach(c => {
      if (r == CardRank.Rank1) {
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
      if (r == CardRank.Rank2 || r == CardRank.Rank3 || r == CardRank.Rank4) {
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
      if (r == CardRank.Rank5) {
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
    })
  )
  return pack
}

