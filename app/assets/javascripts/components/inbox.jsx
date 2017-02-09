var Inbox = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4" id="conversation-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Inbox</h4>
              </div>
              <div className="panel-body fixed-height">
                <ConversationList
                  conversations={this.props.conversations}
                />
                </div>
              </div>
            </div>
          <div className="col-sm-8" id="message-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>{this.props.first_name}</h4>
              </div>
              <div className="panel-body fixed-height">
                <div id="wrapper">
                  <MessageList
                  messages={this.props.messages}
                 />
                </div>
                <CreateMessage
                  // TODO props
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
