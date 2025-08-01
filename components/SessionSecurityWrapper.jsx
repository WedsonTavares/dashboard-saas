'use client'

import React from 'react'
import { useSessionSecurity } from '../hooks/useSessionSecurity'

const SessionSecurityWrapper = ({ children }) => {
  // Este hook gerencia automaticamente a segurança da sessão
  useSessionSecurity()

  return children
}

export default SessionSecurityWrapper
