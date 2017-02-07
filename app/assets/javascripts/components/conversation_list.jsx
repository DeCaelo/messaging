var ConversationList = React.createClass({
  render: function() {
    return (
      <div className="flexbox-columns-start">
        <% @conversations.each do |conversation| %>
          <div className="conversation-link flexbox-start">
            <span className="flex-item-shrink"><%= image_tag conversation.other_user(current_user).one_avatar_url, className: "avatar-square" %></span>
              <div className="conversation-preview flexbox-columns flex-item">
                <ul className="conversation-header list-unstyled list-inline flex-item">
                  <li><h6><%= conversation.other_user(current_user).first_name %></h6></li>
                  <li className="date"><%= conversation.last_message.created_at.strftime("%b %e") %></li>
                </ul>
                <div className="message-preview flex-item">
                  <span><%= conversation.last_message.content %></span>
                </div>
              </div>
          </div>
          <% end %>
      <div className="end-of-messages">
        <p>End of messages</p>
      </div>
    )
  }
})
