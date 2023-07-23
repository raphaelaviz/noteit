import React from 'react'
import AssistanceCard from './AssistanceCard'
import { Assistance } from './Panel'

interface AssistancesGridProps {
  assistances: Assistance[]
}

const AssistancesGrid: React.FC<AssistancesGridProps> = ({ assistances }) => (
  <div className="assistances-grid">

    {assistances.map((assistance) => (
      <AssistanceCard
        key={assistance.id}
        id={assistance.id}
        title={assistance.name}
        category={assistance.Category}
      />
    ))}
  </div>
)

export default AssistancesGrid
