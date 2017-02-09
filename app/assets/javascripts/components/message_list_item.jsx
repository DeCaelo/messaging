var MessageListItem = React.createClass({
  render: function() {
    return (
      <div className="message-container flexbox-start flex-item">
        <span className="flex-item-shrink">
          <img src={this.props.message.other_user_picture_url} className="avatar-square-small"/>
        </span>
          <div className="message-content flex-item flexbox-columns">
            <ul className="message-header list-unstyled list-inline flex-item">
              <li><h6>{this.props.message.other_user_first_name}</h6></li>
              <li className="date">{this.props.message.last_message_created_at}</li>
            </ul>
            <span dangerouslySetInnerHTML={{__html: this.props.message.last_message_content}}></span>
        </div>
      </div>
    )
  }
})
