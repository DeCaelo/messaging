var Inbox = React.createClass({
  getInitialState: function() {
    return {
      selectedConversationId: this.props.selected_conversation_id,
      firstName: this.props.first_name,
      conversations: this.props.conversations,
      messages: this.props.messages,
      selectUser: false,
      users: [],
      selectedUserIndex: null,
      selectedUserId: null,
      createConversation: false,
      twoLinePadded: false,
      threeLinePadded: false,
      nextPage: this.props.page + 1
    }
  },

  render: function() {
    var that = this;
    var firstNameClasses = classNames({
      "hidden": this.state.selectUser
    })
    var inputClasses = classNames({
      "hidden": !this.state.selectUser
    })
    var wrapperClass = classNames({
      "two-line": this.state.twoLinePadded,
      "three-line": this.state.threeLinePadded
    })
    var userList;
    if (this.state.selectUser) {
      userList = <UserList
                    users={this.state.users}
                    selectedUserIndex={this.state.selectedUserIndex}
                    selectedUserId={this.state.selectedUserId}
                    onUserSelection={this.handleUserSelection}
                  />
    }
    var nextPageHref = "/conversations?page=" + this.state.nextPage;
    return(
      <div className="container">
        <div className="hidden">
          <span className="next">
            <a href={nextPageHref}></a>
          </span>
        </div>
        <div className="row">
          <div className="col-sm-4" id="conversation-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Inbox <span className="addConversation" onClick={this.showInput}><i className="fa fa-edit"></i></span></h4>
              </div>
              <div className="panel-body fixed-height">
                <ConversationList
                  ref="conversations"
                  conversations={this.state.conversations}
                  onConversationSelection={this.handleConversationSelection}
                  selectedConversationId={this.state.selectedConversationId}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-8" id="message-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className={firstNameClasses}>{this.state.firstName}</h4>
                <h4 className={inputClasses}>
                  <input  type="text"
                          ref='input'
                          placeholder="Start typing a first name..."
                          className="firstNameInput"
                          onChange={this.suggestUsers}
                          onKeyUp={this.handleKeyUp}/>
                </h4>
              </div>
              <div className="panel-body fixed-height">
                <div className={wrapperClass} id="wrapper" ref="wrapper" onScroll={this.handleScroll}>
                  {userList}
                  <MessageList
                    messages={this.state.messages}
                  />
                </div>
                <CreateMessage
                 onMessageCreation={this.handleMessageCreation}
                 selectedConversationId={this.state.selectedConversationId}
                 ref="createMessage"
                 createConversation={this.state.createConversation}
                 onConversationCreation={this.handleConversationCreation}
                 onTextareaLineBreak={this.handleWrapperPadding}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  componentDidMount: function() {
    this._scrollWrapper();
  },

  handleConversationSelection: function(conversationId) {
    var that = this;
    $.ajax({
      type: 'GET',
      url: Routes.conversations_path({format: 'json', conversation_id: conversationId}),
      success: function(data) {
        that.setState({
          selectedConversationId: data.selected_conversation_id,
          firstName: data.first_name,
          conversations: data.conversations,
          messages: data.messages,
          selectUser: false,
          users: [],
          selectedUserIndex: null,
          selectedUserId: null,
          nextPage: parseInt(data.page) + 1
        })
        that.refs.createMessage.handleCancel()
      }
    })
  },

  handleMessageCreation: function(conversationId, content) {
    var that = this
    $.ajax({
      type: 'POST',
      url: Routes.conversation_messages_path({format: 'json', conversation_id: conversationId}),
      data: { message: { content: content } },
      success: function(data) {
        that.setState({
          selectedConversationId: data.selected_conversation_id,
          firstName: data.first_name,
          conversations: data.conversations,
          messages: data.messages,
          selectUser: false
        })
        that.refs.createMessage.handleCancel();
        that._scrollWrapper();
      }
    })
  },

  handleConversationCreation: function(content) {
    var that = this
    $.ajax({
      type: 'POST',
      url: Routes.conversations_path({format: 'json'}),
      data: { conversation: {user2_id: this.state.selectedUserId}, message: {content: content} },
      success: function(data) {
        that.setState({
          selectedConversationId: data.selected_conversation_id,
          firstName: data.first_name,
          conversations: data.conversations,
          messages: data.messages,
          selectUser: false,
          users: [],
          selectedUserIndex: null,
          selectedUserId: null,
          createConversation: false,
          nextPage: parseInt(data.page) + 1
        })
        that.refs.createMessage.handleCancel()
      }
    })
  },

  showInput: function() {
    this.setState({
      users: [],
      selectUser: true,
      selectedConversationId: null,
      selectedConversationIndex: null,
      messages: []
    })
    var that = this
    setTimeout(function() {
      that.refs.input.focus();
      that.refs.createMessage.handleCancel();
      that._scrollWrapper();
    }, 100)
  },

  suggestUsers: function() {
    var that = this
    $.ajax({
      type: 'GET',
      url: Routes.users_path({format: 'json', query: that.refs.input.value}),
      success: function(data) {
        that.setState({
          users: data.users
        })
      }
    })
  },

  handleKeyUp: function(e) {
    console.log(e.which)
    if (e.which == 27) {
      this.setState({
        selectedConversationId: this.props.selected_conversation_id,
        firstName: this.props.first_name,
        conversations: this.props.conversations,
        messages: this.props.messages,
        selectUser: false,
        users: [],
        selectedUserIndex: null,
        selectedUserId: null
      })
      this.refs.input.value = ''
    } else if (e.which == 40) {
      if (this.state.selectedUserIndex == null) {
        this.setState({
          selectedUserIndex: 0,
          selectedUserId: this.state.users[0].id
        })
      } else {
        this.setState({
          selectedUserIndex: this.state.selectedUserIndex + 1,
          selectedUserId: this.state.users[(this.state.selectedUserIndex + 1)].id
        })
      }
    } else if (e.which == 38) {
      if (this.state.selectedUserIndex == null) {
        this.setState({
          selectedUserIndex: (this.state.users.length - 1),
          selectedUserId: this.state.users[(this.state.users.length - 1)].id
        })
      } else {
        this.setState({
          selectedUserIndex: this.state.selectedUserIndex - 1,
          selectedUserId: this.state.users[(this.state.selectedUserIndex - 1)].id
        })
      }
    } else if (e.which == 8 && this.state.users.length == 0) {
      this.setState({
        selectedUserIndex: null,
        selectedUserId: null
      })
    } else if (e.which == 13) {
      this.selectUser()
    }
  },

  selectUser: function() {
    if (this._conversationId(this.state.selectedUserId)) {
      this.handleConversationSelection(this._conversationId(this.state.selectedUserId))
    } else {
      this.setState({
        users: [this.state.users[this.state.selectedUserIndex]],
        selectUser: false,
        firstName: this.state.users[this.state.selectedUserIndex].first_name,
        createConversation: true
      })
    }
    this.refs.input.value = ''
    var that = this
    setTimeout(function() {
      that.refs.createMessage.handleClick()
      that._scrollWrapper();
    }, 100)
  },

  handleUserSelection: function(userId) {
    this.setState({
      users: [this._user(userId)],
      selectedUserIndex: 0,
      selectedUserId: userId
    })
    var that = this
    setTimeout(function() {
      that.selectUser()
    }, 100)
  },

  handleWrapperPadding: function(lineCount) {
    if (lineCount === 1) {
      this.setState({
        twoLinePadded: false,
        threeLinePadded: false
      })
    } else if (lineCount === 2) {
      this.setState({
        twoLinePadded: true,
        threeLinePadded: false
      })
    } else if (lineCount === 3) {
      this.setState({
        twoLinePadded: false,
        threeLinePadded: true
      })
    }
    var that = this;
    setTimeout(function() {
      that._scrollWrapper();
    })
  },

  handleScroll: function() {
    var wrapper = this.refs.wrapper;
    var baseUrl = $('.next a').attr('href');
    if (baseUrl && wrapper.scrollTop === 0) {
      var olderMessagesUrl = baseUrl + '&conversation_id=' + this.state.selectedConversationId;
      var that = this;
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: olderMessagesUrl,
        success: function(data) {
          var allMessages = data.messages.concat(that.state.messages);
          if (allMessages.length !== that.state.messages.length) {
            that.setState({
              messages: allMessages,
              nextPage: parseInt(data.page) + 1
            })
          }
        }
      })
    }
  },

  componentDidMount: function() {
    this.setupSubscription();
    this._scrollWrapper();
  },

  updateMessageList: function(data) {
    // if current_user is the sender, update message list and conversation list
    if (this.props.user_id === data.sender_id) {
      this.setState({
        messages: this.state.messages.concat([data.message]),
        conversations: data.sender_conversations
      })
    // if current_user is the receiver, update conversation list and message list only if selected conversation is new message's conversation
    } else {
      if (this.state.selectedConversationId === data.message.conversation_id) {
        this.setState({
          messages: this.state.messages.concat([data.message]),
          conversations: data.receiver_conversations
        })
      } else {
        this.setState({
          conversations: data.receiver_conversations
        })
      }
    }
    this._scrollWrapper();
  },

  setupSubscription: function() {
    var that = this;
    App.messages = App.cable.subscriptions.create('MessagesChannel', {
      received: function(data) {
        var conversationIds = that.state.conversations.map(function(conversation) {
          return conversation.id;
        })
        if (conversationIds.includes(data.message.conversation_id)) {
          this.updateMessageList(data);
        }
      },

      connected: function() {
        // Timeout here is needed to make sure Subscription
        // is setup properly, before we do any actions.
        var that = this;
        setTimeout(function() {
          that.perform('follow')
        }, 1000);
      },

      updateMessageList: this.updateMessageList
    });
  },

  _user: function(userId) {
    var _user;
    this.state.users.map(function(user, index) {
      if (user.id == userId) {
        _user = user;
      }
    })
    return _user;
  },

  _conversationId: function(userId) {
    var id;
    this.state.conversations.map(function(conversation, index) {
      if (conversation.user.id == userId) {
        id = conversation.id;
      }
    })
    return id;
  },

  _scrollWrapper: function() {
    var wrapper = this.refs.wrapper;
    wrapper.scrollTop = wrapper.scrollHeight;
  }
})
