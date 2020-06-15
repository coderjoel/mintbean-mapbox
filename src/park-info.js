import React, { PureComponent } from "react";

export default class ParkInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.Location_Name}`;

    return (
      <div>
        <div>
          <br/>
          Google:
          <br/>
          <a
            target="_new"
            href={`https://www.google.com/search?q=${displayName}`}
          >
            {displayName}
          </a>
          <br/>
          <br/>
          Find more info on WIKI:
          <br/>
          <a
            target="_new"
            href={`https://en.wikipedia.org/wiki/${displayName}`}
          >
            {displayName}
          </a>
        </div>
      </div>
    );
  }
}
