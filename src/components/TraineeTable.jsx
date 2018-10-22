import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

class TraineeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPeople: []
    };
  }

  sendClick = e => {
    this.props.onClick(e);
  };

  componentDidMount() {
    let request = new XMLHttpRequest();

    request.open("GET", "http://localhost:8090/api/people");

    request.setRequestHeader("Content-Type", "application/json");

    request.setRequestHeader("Access-Control-Allow-Origin", "*");

    request.responseType = "json";

    request.send();

    request.onload = () => {
      this.setState({ allPeople: request.response });
    };
  }

  render() {
    console.log(JSON.stringify(this.state.allPeople));

    return (
      <Table bordered striped hover condensed>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>CVs</th>
            <th>Status</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {this.state.allPeople
            .filter(item => item.role === "trainee" || item.role === "Trainee")
            .map(
              function(item, key) {
                return (
                  <tr onClick={this.sendClick} key={key}>
                    <td className={item.email}>{item.name}</td>
                    <td className={item.email}>{item.email}</td>
                    <td className={item.email}>
                      <Button className="button">Download</Button>
                    </td>
                    <td className={item.email}>{item.state}</td>
                    <td className={item.email}>
                      <Button className="button">
                        Flag
                        <img
                          height="20px"
                          width="20px"
                          src="https://steemitimages.com/DQmWmkoSPMJ1JrGvkc5caLQyvBysuRtN8uMhHK1Ajf9BvNw/redflag.png"
                        />
                      </Button>
                    </td>
                  </tr>
                );
              }.bind(this)
            )}
        </tbody>
      </Table>
    );
  }
}

export default TraineeTable;
