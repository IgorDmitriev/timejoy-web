Rails.application.routes.draw do
  root 'static_pages#index'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
  end
end
