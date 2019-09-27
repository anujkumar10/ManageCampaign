import React, {useState, useEffect, Fragment} from "react";
import { Icon, Label, Menu, Table, Modal, Button, Image, Header } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import CAMPAIGNDATA from "./data/campaign-data";
import campaignData from "./data/campaign-data";

const CampaignTable = (props) => {

  const [date, setDate] = useState('');
  const [campaignSelected, setCampaignSelected] = useState({});
  const [rowSelected, setRowSelected] = useState({});
  const [openModel, setOpenModel] = useState(false);

  const getDateDiff = (compaignDate) => {
    const days =  Math.floor(( Date.parse(Date()) - Date.parse(compaignDate) ) / 86400000);
    const daysDifference = days > 0 ? `${days} days ago` : `${Math.abs(days)} days left`;
    return daysDifference;
  }

  const onDateChange = (date) => {
   campaignSelected.date = date.toISOString().split('T')[0];
   setDate(campaignSelected.date);
  };

  const onDatePickerSelected = (campaign) => {
    setCampaignSelected(campaign);
    setTimeout(() => {
      setOpenModel(false);
    },0);
  }

  const openPopup = (campaign) => {
    setRowSelected(campaign)
    setOpenModel(true);
  }

  const createTableRows = () => {
    return CAMPAIGNDATA.map(campaign => {
      return (
        <Fragment>
          <Table.Row onClick = {() => openPopup(campaign)}>
          <Table.Cell>
          <p>{campaign.date}</p>
          <p>{getDateDiff(campaign.date)}</p>
          </Table.Cell>
          <Table.Cell>
            <p>{campaign.company}</p>
            <p>{campaign.country}</p>
          </Table.Cell>
          <Table.Cell>
            <p><Icon name = "dollar" /></p>
            <p> VIEW PRICING </p>
          </Table.Cell>
          <Table.Cell>
            <div className="actions-col">
              <p className = "action-col-content">
                <Icon size ="large" name = "file alternate outline" /> CSV
              </p>
              <p className = "action-col-content">
                <Icon size ="large" name = "chart bar" /> REPORT
              </p>
              <p className = "action-col-content" onClick={() => onDatePickerSelected(campaign)}>
              <DatePicker
                selected={new Date(campaign.date)}
                onChange={onDateChange}
              />
               {/* <Icon size ="large" name = "calendar alternate outline" /> SCHEDULE AGAIN */}
              </p>
            </div>
          </Table.Cell>
          
        </Table.Row>
      </Fragment>
    )
    });
  }

  const createModal = () => {
    console.log('row selected is', rowSelected);
    return (
      <Modal open = {openModel}>
          <Modal.Header>CAMPAIGN INFORMATION</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>{`Campaign Date: ${rowSelected.date}`}</Header>
              <p>
              {`Company: ${rowSelected.company}`}
              </p>
              <p>{`Country: ${rowSelected.country}`}</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
  }

  return   (
    <Fragment>
      {createModal()}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>DATE</Table.HeaderCell>
            <Table.HeaderCell>CAMPAIGN</Table.HeaderCell>
            <Table.HeaderCell>VIEW</Table.HeaderCell>
            <Table.HeaderCell>ACTIONS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {createTableRows()}
        </Table.Body>
      </Table> 
    </Fragment>
  );
}

export default CampaignTable;