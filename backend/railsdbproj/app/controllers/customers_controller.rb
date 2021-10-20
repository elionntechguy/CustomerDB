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
    if @customer.assignedusersid.include?(current_user.id)
      params.permit(:id, :name, :email, :phonenumber, :issues, :issue_status)
    else
      params.permit(:id, :name, :email, :phonenumber, :issues, :issue_status).merge(assignedusersid: @customer.assignedusersid.push(current_user.id))
    end
  end
end
