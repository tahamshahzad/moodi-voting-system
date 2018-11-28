import { Card, Col, Row, Button } from "antd";
import { Redirect } from "react-router-dom";
import { db } from "../firebase-init";
import React from "react";
class ViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderMember = this.renderMember.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.state = {
      voters: null,
      campaignName: null
    };
  }

  componentDidMount() {
    const { campaign } = window;
    if (campaign) {
      const voters = campaign.data.members.filter(member => {
        return member.candidate && member&&member.votes;
      });
      const votes = campaign.data.members.filter(member => {
        return member.votes;
      });
      console.log(voters);
      const voterComponents = voters.map((candidate, numberofpeoplewhovoted, index) => {
        var peoplewhovoted = candidate.votes
        console.log(peoplewhovoted.length)
        var numberofpeoplewhovoted = peoplewhovoted.length
        return this.renderMember(candidate, numberofpeoplewhovoted, index);
      });
      const campaignNameComponents= campaign.data.campaignName
      // const votesComponents = votes.map((votes, index) => {
      //   return this.renderMember(votes, index);
      // });
      this.setState(prevState => ({
        ...prevState,
        voters: voterComponents,
        campaignName: campaignNameComponents
      }));
    }
  }
  async handleVote(e) {
    // the user who voted

    const { user } = window.campaign;
    
    // the candidates email
    const candidateEmail = e.target.getAttribute("email");

    const campaignRef = await db.collection("campaigns").doc(window.campaign.cid);

    const campaign = await campaignRef.get();
    const campaignData = campaign.data();

  }
  renderMember(candidate, numberofpeoplewhovoted, key) {
    return (
      <Col key={key} span={50}>
        <Card title={candidate.title} bordered={false}>
          <p>
            votes:{numberofpeoplewhovoted}
          </p>
        </Card>
      </Col>
    );
  }
  render() {
    return (
      <div className = "form-wrapper">
        <div style={{padding: "20px" }}>
          <h1>{this.state.campaignName}</h1>,
          <Row gutter={50}>{this.state.voters ? this.state.voters : null}</Row>
        </div>
      </div>
    );
  }
}
export default ViewScreen;