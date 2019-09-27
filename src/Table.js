import React, {useState, useEffect, Fragment} from "react";
import { Icon, Label, Menu, Table, Modal, Button, Image, Header } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
   campaignSelected.date = date.toLocaleString().split('T')[0];
   setDate(campaignSelected.date);
  };

  const onDatePickerSelected = (e, campaign) => {
    e.stopPropagation();
    setCampaignSelected(campaign);
  }

  const openPopup = (campaign) => {
    setRowSelected(campaign);
    setOpenModel(true);   
  }

  const closePopup = () => {
    setOpenModel(false);
  }

  const createTableRows = () => {
    return props.campaignData.map((campaign, index) => {
      return (
        <Fragment key = {index} >
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
              <p className = "action-col-content" onClick={(e) => onDatePickerSelected(e, campaign)}>
              <label>
              <DatePicker
                className="picker"
                selected={new Date(campaign.date)}
                onChange={onDateChange}
              />
              <Icon className="calendar-icon" size ="large" name = "calendar alternate outline" />
              <div>SCHEDULE AGAIN</div>
              </label>
              </p>
            </div>
          </Table.Cell>
          
        </Table.Row>
      </Fragment>
    )
    });
  }

  const createModal = () => {
    return (
      <Modal open = {openModel}>
          <Modal.Header>CAMPAIGN INFORMATION
          <Button basic color='red' style ={{ float: "right"}} content="close" onClick={() => closePopup()} />
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
            
              <Header>{`Campaign Date: ${rowSelected.date}`}
              </Header>
              <p>{`Company: ${rowSelected.company}`}</p>
              <p>{`Country: ${rowSelected.country}`}</p>
              <p>{`Price: $10`}</p>
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