/**
 * CHPRSL × Fusion5 — NetSuite Implementation Proposal (v2).
 *
 * Section order per CONTEXT.md §5, with Architecture inserted between
 * SolutionStack and Phase1Scope.
 *
 * Copy preserved verbatim from reference/CHPRSL_Proposal_v1.1.html. See
 * CONTEXT.md for deal state, tone rules, commercial defaults, and open
 * decisions.
 */

import { useState } from 'react'
import Hero from './components/Hero'
import StatBar from './components/StatBar'
import WhatWeHeard from './components/WhatWeHeard'
import SolutionStack from './components/SolutionStack'
import Architecture from './components/Architecture'
import Phase1Scope from './components/Phase1Scope'
import DeliveryApproach from './components/DeliveryApproach'
import Configurator from './components/Configurator'
// import IntegrationOptions from './components/IntegrationOptions'  // removed for now
import CommercialCallout from './components/CommercialCallout'
import NextSteps from './components/NextSteps'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ExportButton from './components/ExportButton'

export default function App() {
  // Lifted here because the Architecture section's discount checkbox also
  // drives the Campfire licensing discount shown below the Configurator.
  const [signByMay30, setSignByMay30] = useState(true)

  return (
    <>
      <ExportButton />
      <Hero />
      <StatBar />
      <WhatWeHeard />
      <SolutionStack />
      <Architecture signByMay30={signByMay30} onSignByMay30Change={setSignByMay30} />
      <Phase1Scope />
      <DeliveryApproach />
      <Configurator signByMay30={signByMay30} />
      {/* <IntegrationOptions /> */}
      <CommercialCallout />
      <NextSteps />
      <CTA />
      <Footer />
    </>
  )
}
