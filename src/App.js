import React from 'react';
import { Tab } from 'semantic-ui-react'

import CampaignTable from "./Table"; 
import logo from './logo.svg';
import './App.css';

const panes = [
  {
    menuItem: 'UPCOMING CAMPAIGNS',
    render: () => <Tab.Pane attached={false}><CampaignTable /></Tab.Pane>,
  },
  {
    menuItem: 'LIVE CAMPAIGNS',
    render: () => <Tab.Pane attached={false}><CampaignTable /></Tab.Pane>,
  },
  {
    menuItem: 'PAST CAMPAIGNS',
    render: () => <Tab.Pane attached={false}><CampaignTable /></Tab.Pane>,
  },
]

function App() {
  return (
    <div className="App">
      <Tab menu={{ pointing: true }} panes={panes} />
    </div>
  );
}

export default App;
