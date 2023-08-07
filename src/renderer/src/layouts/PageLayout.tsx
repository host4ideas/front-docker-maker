
import Sidebar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
const PageLayout = () => {
  return (
    <>
      <NavBar />
      <Sidebar />
      <div className="p-4">
        <div
          id="content"
          className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
        >
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default PageLayout
