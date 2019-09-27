import React from 'react';
import { Tab } from 'semantic-ui-react'

import CampaignTable from "./Table"; 
import {UPCOMINGCAMPAIGNS, LIVECAMPAIGNS, PASTCAMPAIGNS} from "./data/campaign-data";
import logo from './logo.svg';
import './App.css';

const panes = [
  {
    menuItem: 'UPCOMING CAMPAIGNS',
    render: () => <Tab.Pane attached={false}><CampaignTable campaignData = {UPCOMINGCAMPAIGNS}/></Tab.Pane>,
  },
  {
    menuItem: 'LIVE CAMPAIGNS',
    render: () => <Tab.Pane attached={false}><CampaignTable campaignData = {LIVECAMPAIGNS}/></Tab.Pane>,
  },
  {
    menuItem: 'PAST CAMPAIGNS',
    render: () => <Tab.Pane attached={false}><CampaignTable campaignData = {PASTCAMPAIGNS}/></Tab.Pane>,
  },
]

function App() {
  return (
    <div className="App">
    <div className="heading">Manage <span className="sub-head">Campaigns</span></div>
      <Tab menu={{ pointing: true }} panes={panes} />
    </div>
  );
}

export default App;
