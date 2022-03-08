import React, { Component } from "react";

export class NewItem extends Component {
  // constructor (){
  //   super();
  //   console.log('Hello I am super class var');
  // }
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card mb-3">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span
              className="badge rounded-pill bg-danger"
              style={{ left: "90%", zIndex: 1 }}
            >
              {source}
            </span>
          </div>
          <div className="card-body">
            <img src={imageUrl} className="card-img-top" alt="..." />

            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read Full
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewItem;
