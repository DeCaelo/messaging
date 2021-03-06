var ConversationList = React.createClass({
  render: function() {
    var that = this
    return(
      <div className="flexbox-columns-start">
        {this.props.conversations.map(function(conversation, index) {
          return <ConversationListItem
                    conversation={conversation}
                    key={index}
                    onConversationSelection={that.props.onConversationSelection}
                    selectedConversationId={that.props.selectedConversationId}
                  />
        })}
        <div className="end-of-messages">
          <p>Made with <i className="fa fa-heart"></i> by Me</p>
        </div>
      </div>
    )
  }
})
