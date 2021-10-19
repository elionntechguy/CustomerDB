class ResetPasswordController < ApplicationController
    require 'bcrypt'

    before_action :authenticate, only: [:decoded_token, :current_user]

    def reset
        @user = User.find(current_user.id)
        if BCrypt::Password.new(@user.password_digest) == params[:password]
            render json: { message: "Password cannot be the same as the old one" }
        else
            if @user.update(password: params[:password])
                render json: { message: "Password successfully changed!" }, status: :ok
            else
                render json: @user.errors, status: :unprocessable_entity
            end
        end
    end
end
