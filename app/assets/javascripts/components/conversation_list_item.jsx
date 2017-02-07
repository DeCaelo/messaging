var ConversationListItem = React.createClass({
  render: function() {
    return(
      <div className="conversation-link flexbox-start">
        <span className="flex-item-shrink">
          <img src={"TODO image_url"} className="avatar-square"/>
        </span>
          <div className="conversation-preview flexbox-columns flex-item">
            <ul className="conversation-header list-unstyled list-inline flex-item">
              <li><h6>{"TODO FirstName"}</h6></li>
              <li className="date">{"TODO date"}</li>
            </ul>
            <div className="message-preview flex-item">
              <span>{"TODO content"}</span>
            </div>
          </div>
      </div>
    )
  }
})
