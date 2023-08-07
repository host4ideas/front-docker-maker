import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
// Pages
import ContainerGroups from '../pages/ContainerGroups'
import ContainerGroupDetails from '../pages/ContainerGroupDetails'
// Layouts
import PageLayout from '../layouts/PageLayout'
// Routes
import PATHS from './routes'
import Private from '../components/auth/Private'
import Welcome from '../pages/Welcome'
import { ResourceGroups } from '../pages/ResourceGroups'
import { ContainerRegistries } from '../pages/ContainerRegistries'
import { RegistryRepos } from '../pages/RegistryRepos'

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Welcome />} />

          <Route path={PATHS.private} element={<Private />}>
            <Route index element={<Welcome />} />
            <Route path={PATHS.containerGroups} element={<ContainerGroups />} />
            <Route path={PATHS.resourceGroups} element={<ResourceGroups />} />
            <Route
              path={PATHS.containerRegistries}
              element={<ContainerRegistries />}
            />
            <Route
              path={`${PATHS.registryRepos}/:lu?:rn?`}
              element={<RegistryRepos />}
            />
            <Route
              path={PATHS.containerDetails}
              element={<ContainerGroupDetails />}
            ></Route>
          </Route>
        </Route>
        {/* Redirect for 404 Error */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  )
}

export default Router
