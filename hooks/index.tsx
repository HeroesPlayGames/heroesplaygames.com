import { useEffect } from 'react'

export const useSceneStyle = () =>
  useEffect(() => {
    document?.querySelector('body')?.classList.add('scene')
  }, [])
