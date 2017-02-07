var MessageList = React.createClass({
  render: {
    return(
      <div className="messages flexbox-columns-end flex-item">
        <% @selected_conversation.messages.order(created_at: :asc).each do |message| %>
          <div className="message-container flexbox-start flex-item">
            <span className="flex-item-shrink"><%= image_tag message.user.one_avatar_url, className: "avatar-square-small" %></span>
              <div className="message-content flex-item flexbox-columns">
                <ul className="message-header list-unstyled list-inline flex-item">
                  <li><h6><%= message.user.first_name %></h6></li>
                  <li className="date"><%= message.created_at.strftime("%b %e, %l:%M%P") %></li>
                </ul>
              <%= simple_format message.content %>
            </div>
          </div>
        <% end %>
      </div>
  )
  }
})
