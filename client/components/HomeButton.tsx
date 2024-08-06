import { useNavigate } from 'react-router-dom'

export default function HomeButton() {
  const navigate = useNavigate()

  return (
    <>
      <button className="home" onClick={() => navigate('/')}>
        Home
      </button>
    </>
  )
}
