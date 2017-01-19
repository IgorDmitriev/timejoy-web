class Api::FavoritePlacesController < ApplicationController
  before_action :set_favorite_place, only: [:show, :destroy, :update]

  def index
    @favorite_places = FavoritePlace.where(user: current_user)
  end

  def show
  end

  def create
    @favorite_place = FavoritePlace.new(favorite_place_params)
    @favorite_place.user = current_user

    if @favorite_place.save
      render :show
    else
      render json: @favorite_place.errors.full_messages, status: 422
    end
  end

  def destroy
    if @favorite_place.destroy
      render :show
    else
      render json: @favorite_place.errors.full_messages, status: 422
    end
  end

  def update
    if @favorite_place.update(favorite_place_params)
      render :show
    else
      render json: @favorite_place.errors.full_messages, status: 422
    end
  end

  private

  def set_favorite_place
    @favorite_place = FavoritePlace.find(params[:id])
  end

  def favorite_place_params
    favorite_place = {}

    favorite_place[:id] = params[:favoritePlace][:id]
    favorite_place[:title] = params[:favoritePlace][:title]
    favorite_place[:description] = params[:favoritePlace][:description]
    favorite_place[:address] = params[:favoritePlace][:address]
    favorite_place[:formatted_address] =
      params[:favoritePlace][:formattedAddress]
    favorite_place[:lat] = params[:favoritePlace][:lat]
    favorite_place[:lng] = params[:favoritePlace][:lng]
    favorite_place[:category_id] = params[:favoritePlace][:category][:id]

    favorite_place
  end

end
