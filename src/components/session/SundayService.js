import React from 'react';
import PlannerListPage from '../ChurchPlanner/PlannerListPage.js';
import GenericViewToggler from '../extra/GenericViewToggler.js';
import ChurchPlanner from '../ChurchPlanner/ChurchPlanner.js';

const SundayService = () => {
    const views = 
    [
        { key: 'view-church', label: 'View services', component: <PlannerListPage /> },
        { key: 'plan-church', label: 'Plan new', component: <ChurchPlanner /> },
    ];

  return (
    <div>
      <GenericViewToggler views={views}/>
    </div>
  )
}

export default SundayService
