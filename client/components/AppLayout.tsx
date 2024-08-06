import { Outlet } from 'react-router-dom'
import HomeButton from './HomeButton'
import SearchBar from './SearchBar'

export default function AppLayout() {
  return (
    <>
      <div className="hometitle">
        <HomeButton />
        <h1>Query &apos;em All 🐭⚡</h1>
      </div>
      <SearchBar />
      <Outlet />
    </>
  )
}
