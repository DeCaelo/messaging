
class MessagesController < ApplicationController
  def create
    @selected_conversation = Conversation.find(params[:conversation_id])
    @message = Message.new(message_params)
    @message.user = current_user
    @message.conversation = @selected_conversation
    # @message.content = @message.content.gsub("\n", "  \n").gsub("  \n  \n", "\n\n")
    @message.save
    @messages = @selected_conversation.messages.order(created_at: :desc).page(params[:page]).per(9)
    @conversations = current_user.conversations
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
