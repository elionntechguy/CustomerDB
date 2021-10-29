class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  before_action :authenticate

  def authenticate
    decoded_token
    current_user
  rescue ActiveRecord::RecordNotFound => e
    render json: { error: "User doesn't exist" }, status: :unauthorized
  rescue JWT::DecodeError => e
    render json: { error: "Invalid or missing token" }, status: :unauthorized
  end

  def decoded_token
    token = auth_header.split(' ').last if auth_header
    JWT.decode(token, 'SECRET_KEY')
  end

  def current_user
    if decoded_token
      payload = decoded_token.first["user_id"]
      @user = User.find(payload)
    end
  end

  def auth_header
    request.headers['Authorization']
  end

  def create_token(payload)
    JWT.encode(payload, 'SECRET_KEY')
  end
end
