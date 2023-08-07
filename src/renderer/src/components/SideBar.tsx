
import './../assets/css/Sidebar.css'
import logo from './../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom'
import Routes from '../router/routes'

const SideBar = () => {
  const location = useLocation()

  const { pathname } = location

  const navigations = [
    {
      path: Routes.containerGroups,
      icon: (
        <svg
          fill="none"
          className="w-6 h-6"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          ></path>
        </svg>
      ),
      name: 'Containers'
    },
    {
      path: Routes.resourceGroups,
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          ></path>
        </svg>
      ),
      name: 'Resource Groups'
    },
    {
      path: Routes.containerRegistries,
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          ></path>
        </svg>
      ),
      name: 'Container registries'
    }
  ]

  return (
    <>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <a href="/" className="flex items-center pl-2.5 mb-5">
            <img src={logo} className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              DockerMaker
            </span>
          </a>
          <ul className="space-y-2">
            {navigations.map((route, index) => (
              <li key={index}>
                <Link
                  to={route.path}
                  className={
                    'flex items-center rounded-lg p-2 text-base font-normal hover:bg-gray-700 dark:hover:bg-gray-700 ' +
                    (pathname.includes(route.path)
                      ? 'text-white bg-gray-600 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-700'
                      : 'text-gray-900 dark:text-white')
                  }
                >
                  {route.icon}
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    {route.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

export default SideBar
