class CustomersController < ApplicationController
    before_action :authenticate, only: [:decoded_token, :current_user]
    def dashboard
        @customers = Customer.all
        render json: { customers: @customers }
    end

    def new_customer
        @customer = Customer.new(name: params[:name], email: params[:email], phonenumber: params[:phonenumber], issues: [params[:issues]], assignedusersid: [current_user.id])
    
        if @customer.save
            render json: { message: "Successfully created customer #{@customer.name}" }, status: :created
        else
            render json: @customer.errors, status: :unprocessable_entity
        end
    end
end
