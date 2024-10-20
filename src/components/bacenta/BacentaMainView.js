import React from 'react'
import BacentaInsights from "./BacentaInsights";
import BacentaList from './BacentaList';
import UserBacentas from './UserBacentas';
import GenericViewToggler from '../extra/GenericViewToggler';

const BacentaMainView = () => {
    const views = [
        { key: 'insights', label: 'Insights', component: <BacentaInsights /> },
        { key: 'list', label: 'All', component: <BacentaList /> },
        { key: 'user', label: 'For you', component: <UserBacentas /> },
      ];

  return (
    <div>
      <GenericViewToggler views={views}/>
    </div>
  )
}

export default BacentaMainView
