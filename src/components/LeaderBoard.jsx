import { Link, useNavigate, useSearchParams } from 'react-router-dom'

export default function LeaderBoard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const winner = searchParams.get('winner')

  return (
    <>
      <section className="sectionClass flex-col space-y-4">
        <div className="text-xl font-bold">Winner - "{winner}"</div>
        {winner ? (
          <button
            onClick={() => {
              navigate('/', { replace: true })
              window.location.reload()
            }}
            className=" btn btn-primary font-bold text-base"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </section>
    </>
  )
}
