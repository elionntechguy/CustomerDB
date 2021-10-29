Rails.application.routes.draw do
  resources :users, only: [:create]
  post 'login', to: 'authentication#login'
  get 'profile', to: 'authorized#profile'
  post 'reset', to: 'reset_password#reset'

  get 'dashboard', to: 'customers#dashboard'
  post 'new_customer', to: 'customers#new_customer'
  post 'update_customer/:id', to: 'customers#update_customer'
  post 'delete_customer/:id', to: 'customers#delete_customer'
  get 'get_assigned_user', to: 'customers#get_assigned_user'
end
