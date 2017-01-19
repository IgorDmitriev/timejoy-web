Rails.application.routes.draw do
  root 'static_pages#index'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:create, :destroy]

    resources :events, only: [:index, :create, :show, :destroy, :update]
    resources :favorite_places, only: [:index, :create, :show, :destroy, :update]
    resources :categories, only: [:index, :create, :show, :destroy, :update]
    resources :icons, only: [:index]
  end
end
