import { Disclosure } from '@headlessui/react'
import { ThemeToggle } from './ThemeToggle'
import { InstallApp } from './InstallApp'
import ProfileData from './ProfileData'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false }
]

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
  window.onclick = (e: any) => {
    e.stopPropagation()

    if (window.innerWidth <= 768) {
      if (document.getElementById('btnShowSideBar')!.contains(e.target)) {
        document.getElementById('sidebar')!.style.transform = 'translate(0%)'
        return
      }

      if (!document.getElementById('sidebar')!.contains(e.target)) {
        document.getElementById('sidebar')!.style.transform = 'translate(-100%)'
      }
    }

    window.onresize = () => {
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar')!.style.transform = 'translate(-100%)'
      } else {
        document.getElementById('sidebar')!.style.transform = 'translate(0%)'
      }
    }
  }

  return (
    <Disclosure
      as="nav"
      className="bg-gray-50 dark:bg-gray-900"
      style={{ height: '70px' }}
    >
      {() => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center md:order-2">
                <button
                  data-drawer-target="sidebar"
                  data-drawer-toggle="sidebar"
                  aria-controls="sidebar"
                  type="button"
                  id="btnShowSideBar"
                  className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"></div>
              <div className="absolute space-x-4 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden md:flex space-x-4"></div>
                <InstallApp />
                <ThemeToggle />
                <ProfileData />
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
