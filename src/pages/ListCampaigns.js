import React from "react"
import { Redirect } from "react-router-dom";
import { db } from "../firebase-init";
import { Card, Col, Row, Button } from "antd";



class ListCampaigns extends React.Component {
  
  findDocuments (){
  db.collection("campaigns").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        var campaignName;
        const arrayofCampaignName = doc.map(
          {campaignName} = doc.data
        )
        var documentIDs = doc.id;
        arrayofCampaignName.push(documentIDs);
        console.log(arrayofCampaignName)
    });
  });
  }
  render(){
    return (
      <div>
      <Button onClick={this.findDocuments}/>
    </div>
    );
  }
}
export default ListCampaigns;