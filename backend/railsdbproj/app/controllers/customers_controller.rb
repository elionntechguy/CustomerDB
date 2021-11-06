class CustomersController < ApplicationController
  before_action :authenticate, only: [:decoded_token, :current_user]
  def dashboard
    @customers = Customer.order("id").all
    # @user = @customers.pluck(:assignedusersid).flatten.map { |id| User.find(id) }
    @user = User.where(id: @customers.pluck(:assignedusersid).flatten)
    username = @user.map { |all| { user_id: all.id, customers_id: all.assignedcustomersid, username: all.username } }
    render json: { customers: @customers, assigneduser: username }  
  end

  def new_customer
    @customer = Customer.new(name: params[:name], email: params[:email], phonenumber: params[:phonenumber], issues: [params[:issues]], issue_description: params[:issue_description], assignedusersid: [current_user.id])
    @customer.issue_description = "//" if params[:issue_description].blank?

    if @customer.save
      @user = User.find(current_user.id)
      @user.update(assignedcustomersid: @user.assignedcustomersid.push(@customer.id))
      render json: { message: "Successfully created customer #{@customer.name}" }, status: :created
    else
      render json: {error: @customer.errors, error1: @user.errors}, status: :unprocessable_entity
    end
  end

  def update_customer
    @customer = Customer.find(params[:id])

    if @customer.update(customer_params)
      render json: { message: "Successfully updated #{customer_params}" }, status: :ok
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  def delete_customer
    @customer = Customer.find(params[:id])

    if @customer.destroy
      render json: { message: "Successfully deleted customer with id #{@customer.id}" }, status: :ok
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  private

  def customer_params
    params.permit(:id, :name, :email, :phonenumber, :issue_status, :issues, :issue_description).merge(assignedusersid: @customer.assignedusersid.push(current_user.id))
  end
end
