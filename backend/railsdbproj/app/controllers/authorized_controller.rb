class AuthorizedController < ApplicationController
  before_action :authenticate
  def authroute
    render json: { message: 'Hello!' }
  end
end
