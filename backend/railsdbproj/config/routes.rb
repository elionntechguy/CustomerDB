Rails.application.routes.draw do
  resources :users, only: [:create]
  post 'login', to: 'authentication#login'
  get 'profile', to: 'authorized#profile'
  post 'reset', to: 'reset_password#reset'
  
  get 'dashboard', to:'customers#dashboard'
  post 'new_customer', to:'customers#new_customer'
end
