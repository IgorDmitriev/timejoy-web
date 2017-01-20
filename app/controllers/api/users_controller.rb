class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      log_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = current_user

    if @user.update(settings_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :timezone)
  end

  def settings_params
    settings = {}

    settings[:home_address] = params[:settings][:homeAddress]
    settings[:home_lat] = params[:settings][:homeLat]
    settings[:home_lng] = params[:settings][:homeLng]
    settings[:default_travel_mode] = params[:settings][:defaultTravelMode]

    settings
  end
end
