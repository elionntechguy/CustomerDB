class ApplicationController < ActionController::API
  before_action :authenticate

  def authenticate
    token = auth_header.split(' ').last if auth_header
      begin
        decoded_token = JWT.decode(token, 'SECRET_KEY')
        payload = decoded_token.first["user_id"]
        @user = User.find(payload)
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: "User doesn't exist" }, status: :unauthorized
      rescue JWT::DecodeError => e
        render json: { error: "Invalid or missing token" }, status: :unauthorized
    end
  end

  def auth_header
    request.headers['Authorization']
  end

  def create_token(payload)
    JWT.encode(payload, 'SECRET_KEY')
  end
end
