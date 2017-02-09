var MessageListItem = React.createClass({
  render: function() {
    return (
      <div className="message-container flexbox-start flex-item">
        <span className="flex-item-shrink">
          <img src={"TODO image_url"} className="avatar-square-small"/>
        </span>
          <div className="message-content flex-item flexbox-columns">
            <ul className="message-header list-unstyled list-inline flex-item">
              <li><h6>{"TODO FirstName"}</h6></li>
              <li className="date">{"TODO date"}</li>
            </ul>
            <span dangerouslySetInnerHTML={{__html: "TODO content"}}></span>
        </div>
      </div>
    )
  }
})
