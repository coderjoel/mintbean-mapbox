import React, { PureComponent } from "react";

export default class ParkInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.Location_Name}`;

    return (
      <div>
        <div>
          <a
            target="_new"
            href={`https://www.google.com/search?q=${displayName}`}
          >
            {displayName}
          </a>
        </div>
      </div>
    );
  }
}
