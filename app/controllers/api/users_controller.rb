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
    params.require(:settings).permit(
      :home_address, :home_lat, :home_lng, :default_travel_mode)
  end
end
