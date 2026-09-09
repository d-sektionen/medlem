import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { PAGES } from '../config'

/**
 * Finds the page configuration that matches a pathname, also taking
 * alternativePaths (redirect targets) into account. Returns null if no page matches.
 */
const findPageByPath = (pathname) => {
  const normalized = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')

  return (
    PAGES.find(
      (page) =>
        page.path === normalized ||
        (page.alternativePaths || []).includes(normalized)
    ) || null
  )
}

export default function usePageContext() {
  const location = useLocation()
  const page = useMemo(
    () => findPageByPath(location.pathname),
    [location.pathname]
  )
  const { path, alternativePaths, ...pageContext } = page || {};

  return pageContext
}
