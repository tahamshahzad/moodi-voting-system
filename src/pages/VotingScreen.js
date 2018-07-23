import { Card, Col, Row, Button} from "antd";
import { Redirect } from "react-router-dom";
import React from "react";

class votingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderMember = this.renderMember.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.state = {
        voters: null
      };
  }
  

  componentDidMount() {
    const { campaign } = window;
    if(campaign) {
        const voters = campaign.data.members.filter(member => {
            return member.voter && member;
          });
          
          const voterComponents = voters.map((voter, index) => {
            return this.renderMember(voter,index)
          });
      
          console.log(voterComponents);
          this.setState(prevState => ({
            ...prevState,
            voters: voterComponents
          }));


    }    
  }
  handleVote(e) {
    console.log(e.target.getAttribute("email"));
  }
  renderMember(voter, key) {
    
    return (
      <Col key={key} span={12}>
        <Card title={voter.title} bordered={true}>
          <Button onClick={this.handleVote} email={voter.email}>Vote</Button>
        </Card>
      </Col>
    );
  }
  render() {
    if (!window.campaign) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div style={{ background: "#ECECEC", padding: "20px" }}>
          <Row gutter={24}>{this.state.voters ? this.state.voters : null}</Row>
        </div>
      </div>
    );
  }
}
export default votingScreen;
