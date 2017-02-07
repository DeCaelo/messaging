var Inbox = React.createclassName({
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
                  // TODO props
                />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-8" id="message-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4><%= @selected_conversation.other_user(current_user).first_name %></h4>
              </div>
              <div className="panel-body fixed-height">
                <div id="wrapper">
                  <MessageList
                  // TODO props
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
