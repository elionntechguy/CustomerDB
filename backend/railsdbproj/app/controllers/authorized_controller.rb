class AuthorizedController < ApplicationController
  before_action :authenticate, only: [:decoded_token, :current_user]
  def profile
    @user = User.find(current_user.id)
    render json: {
      id: @user.id,
      username: @user.username,
      email: @user.email
    }
  end
end
