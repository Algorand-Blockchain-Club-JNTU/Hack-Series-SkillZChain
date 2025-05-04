// Game data for SkillZChain

export interface Game {
  id: number
  title: string
  description: string
  image: string
  category: string
  type: "solo" | "multiplayer"
  comingSoon?: boolean
}

// Solo/Basic Games
export const soloGames: Game[] = [
  {
    id: 1,
    title: "Trivia Challenge",
    description: "Test your knowledge across various categories in this engaging trivia game.",
    image: "/games/crypto-trivia.png",
    category: "Trivia",
    type: "solo",
  },
  {
    id: 2,
    title: "Crypto Wordle",
    description: "Guess the hidden crypto and blockchain-related words in this Wordle-inspired game.",
    image: "/games/crypto-wordle.png",
    category: "Word",
    type: "solo",
  },
  {
    id: 3,
    title: "Blockchain Sudoku",
    description: "Classic Sudoku with a blockchain twist. Solve puzzles to earn rewards.",
    image: "/games/blockchain-sudoku.png",
    category: "Puzzle",
    type: "solo",
  },
  {
    id: 4,
    title: "Crypto 2048",
    description: "Combine tiles to reach 2048 with cryptocurrency icons instead of numbers.",
    image: "/games/crypto-2048.png",
    category: "Puzzle",
    type: "solo",
  },
  {
    id: 5,
    title: "Memory Match",
    description: "Test your memory by matching pairs of blockchain-related cards.",
    image: "/games/memory-match.png",
    category: "Memory",
    type: "solo",
  },
  {
    id: 6,
    title: "Crypto Miner",
    description: "Simulate mining cryptocurrencies in this idle-style game.",
    image: "/games/crypto-miner.png",
    category: "Simulation",
    type: "solo",
  },
  {
    id: 7,
    title: "Blockchain Tetris",
    description: "Classic Tetris with blockchain-themed blocks and special abilities.",
    image: "/games/blockchain-tetris.png",
    category: "Arcade",
    type: "solo",
  },
  {
    id: 8,
    title: "NFT Collector",
    description: "Collect and trade virtual NFTs in this collection game.",
    image: "/games/nft-collector.png",
    category: "Collection",
    type: "solo",
  },
  {
    id: 9,
    title: "Crypto Quiz",
    description: "Answer questions about cryptocurrency and blockchain technology.",
    image: "/games/crypto-quiz.png",
    category: "Quiz",
    type: "solo",
  },
  {
    id: 10,
    title: "Token Runner",
    description: "Endless runner game where you collect tokens while avoiding obstacles.",
    image: "/games/token-runner.png",
    category: "Arcade",
    type: "solo",
  },
  {
    id: 11,
    title: "Blockchain Crossword",
    description: "Solve crossword puzzles with blockchain and cryptocurrency terms.",
    image: "/games/blockchain-crossword.png",
    category: "Word",
    type: "solo",
  },
  {
    id: 12,
    title: "Smart Contract Puzzles",
    description: "Solve logic puzzles based on smart contract concepts.",
    image: "/games/smart-contract-puzzles.png",
    category: "Puzzle",
    type: "solo",
  },
  {
    id: 13,
    title: "Crypto Flappy Bird",
    description:
      "Navigate your crypto bird through obstacles to earn tokens in this blockchain twist on the classic game.",
    image: "/games/flappy-bird.png",
    category: "Arcade",
    type: "solo",
  },
  {
    id: 14,
    title: "Token Knife Hit",
    description: "Test your precision by throwing knives at spinning blockchain targets to earn rewards.",
    image: "/games/knife-hit.png",
    category: "Arcade",
    type: "solo",
  },
]

// Multiplayer Games
export const multiplayerGames: Game[] = [
  {
    id: 101,
    title: "Crypto Chess",
    description: "Strategic chess game with blockchain-themed pieces and special abilities.",
    image: "/games/crypto-chess.png",
    category: "Strategy",
    type: "multiplayer",
  },
  {
    id: 102,
    title: "Blockchain Rock Paper Scissors",
    description: "Classic game with a twist - play against others with blockchain verification.",
    image: "/games/blockchain-rps.png",
    category: "Casual",
    type: "multiplayer",
  },
  {
    id: 103,
    title: "Trivia Showdown",
    description: "Compete against other players in real-time trivia battles.",
    image: "/games/trivia-showdown.png",
    category: "Trivia",
    type: "multiplayer",
  },
  {
    id: 104,
    title: "Token Traders",
    description: "Multiplayer trading card game with blockchain-themed cards.",
    image: "/games/token-traders.png",
    category: "Card",
    type: "multiplayer",
  },
  {
    id: 105,
    title: "Crypto Poker",
    description: "Poker with cryptocurrency-themed cards and betting.",
    image: "/games/crypto-poker.png",
    category: "Card",
    type: "multiplayer",
  },
  {
    id: 106,
    title: "Blockchain Battleship",
    description: "Classic Battleship game with blockchain verification for fair play.",
    image: "/games/blockchain-battleship.png",
    category: "Strategy",
    type: "multiplayer",
  },
  {
    id: 107,
    title: "NFT Arena",
    description: "Battle with your NFT characters against other players.",
    image: "/games/nft-arena.png",
    category: "Battle",
    type: "multiplayer",
  },
  {
    id: 108,
    title: "Crypto Dominoes",
    description: "Classic dominoes game with cryptocurrency-themed tiles.",
    image: "/games/crypto-dominoes.png",
    category: "Board",
    type: "multiplayer",
  },
  {
    id: 109,
    title: "Blockchain Bingo",
    description: "Multiplayer bingo with blockchain verification for fairness.",
    image: "/games/blockchain-bingo.png",
    category: "Casual",
    type: "multiplayer",
  },
  {
    id: 110,
    title: "Smart Contract Showdown",
    description: "Compete to create the most efficient smart contracts in this coding game.",
    image: "/games/smart-contract-showdown.png",
    category: "Coding",
    type: "multiplayer",
  },
  {
    id: 111,
    title: "Crypto Checkers",
    description: "Classic checkers with blockchain-themed pieces and special moves.",
    image: "/games/crypto-checkers.png",
    category: "Board",
    type: "multiplayer",
  },
  {
    id: 112,
    title: "Token Race",
    description: "Multiplayer racing game where you collect tokens along the track.",
    image: "/games/token-race.png",
    category: "Racing",
    type: "multiplayer",
  },
]

// Add this line after the soloGames and multiplayerGames declarations
// This will create a combined array of all games
export const games = [...soloGames, ...multiplayerGames]

// Featured games for carousel
export const featuredGames: Game[] = [
  {
    id: 1,
    title: "Trivia Challenge",
    description: "Test your knowledge across various categories in this engaging trivia game.",
    image: "/games/crypto-trivia.png",
    category: "Trivia",
    type: "solo",
  },
  {
    id: 101,
    title: "Crypto Chess",
    description: "Strategic chess game with blockchain-themed pieces and special abilities.",
    image: "/games/crypto-chess.png",
    category: "Strategy",
    type: "multiplayer",
  },
  {
    id: 3,
    title: "Blockchain Sudoku",
    description: "Classic Sudoku with a blockchain twist. Solve puzzles to earn rewards.",
    image: "/games/blockchain-sudoku.png",
    category: "Puzzle",
    type: "solo",
  },
  {
    id: 13,
    title: "Crypto Flappy Bird",
    description:
      "Navigate your crypto bird through obstacles to earn tokens in this blockchain twist on the classic game.",
    image: "/games/flappy-bird.png",
    category: "Arcade",
    type: "solo",
  },
  {
    id: 5,
    title: "Memory Match",
    description: "Test your memory by matching pairs of blockchain-related cards.",
    image: "/games/memory-match.png",
    category: "Memory",
    type: "solo",
  },
]

// Categories
export interface Category {
  id: number
  name: string
  icon: string
  count: number
}

export const categories: Category[] = [
  { id: 1, name: "Trivia", icon: "Sparkles", count: 2 },
  { id: 2, name: "Puzzle", icon: "Puzzle", count: 3 },
  { id: 3, name: "Strategy", icon: "ChessKnight", count: 2 },
  { id: 4, name: "Card", icon: "LayoutGrid", count: 2 },
  { id: 5, name: "Arcade", icon: "Gamepad2", count: 4 },
  { id: 6, name: "Word", icon: "AlignJustify", count: 2 },
  { id: 7, name: "Board", icon: "Grid3x3", count: 2 },
  { id: 8, name: "Casual", icon: "Dice5", count: 2 },
]

// Empty leaderboard data
export const emptyLeaderboardData = [
  {
    rank: 1,
    username: "Waiting...",
    avatar: "",
    earnings: 0,
    games: 0,
    winRate: 0,
  },
  {
    rank: 2,
    username: "Waiting...",
    avatar: "",
    earnings: 0,
    games: 0,
    winRate: 0,
  },
  {
    rank: 3,
    username: "Waiting...",
    avatar: "",
    earnings: 0,
    games: 0,
    winRate: 0,
  },
]
