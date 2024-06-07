import Board from './components/Board'
import LeaderBoard from './components/LeaderBoard'

function Home() {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <Board />
      <LeaderBoard />
    </div>
  )
}

export default Home
