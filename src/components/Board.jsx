import { useState } from 'react'
import { FaRegCircle } from 'react-icons/fa'
import { LiaTimesSolid } from 'react-icons/lia'
import { useSearchParams } from 'react-router-dom'

export default function Board() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialBoard = Array(9).fill(null)

  const playables = {
    x: <LiaTimesSolid className="size-4 sm:size-6" />,
    o: <FaRegCircle className="size-4 sm:size-6" />,
  }

  const [board, setBoard] = useState(initialBoard)
  const [xMoves, setXMoves] = useState([])
  const [oMoves, setOMoves] = useState([])
  const [isXNext, setIsXNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)

  const handleClick = (index) => {
    if (gameOver || board[index]) return

    const currentMoves = isXNext ? xMoves : oMoves
    const nextMoves = [...currentMoves, index]

    if (nextMoves.length > 3) {
      const removeIndex = nextMoves.shift()
      board[removeIndex] = null
    }

    board[index] = isXNext ? 'x' : 'o'

    setBoard([...board])
    setIsXNext(!isXNext)
    isXNext ? setXMoves(nextMoves) : setOMoves(nextMoves)

    const winner = checkWinner(board)
    if (winner) {
      setWinner(winner)
      setGameOver(true)
      setSearchParams({
        winner,
      })
    }
  }

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  return (
    <div className="sectionClass sm:border-b-0 border-b-2 sm:border-r-2">
      <div className="ring-white ring-1 size-[70%] grid grid-cols-12">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`board-cell ${
              (isXNext ? xMoves : oMoves)[0] === index &&
              (isXNext ? xMoves : oMoves).length === 3
                ? 'fade'
                : ''
            }`}
            onClick={() => handleClick(index)}
          >
            {cell === 'x' ? playables.x : cell === 'o' ? playables.o : null}
          </div>
        ))}
      </div>
      {/* {gameOver && <div className="winner">Winner: {winner}</div>} */}
    </div>
  )
}
