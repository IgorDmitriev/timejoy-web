class Api::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :destroy, :update]

  def index
    @categories = Category.where(user: current_user)
  end

  def show
  end

  def create
    @category = Category.new(category_params)
    @category.user = current_user

    if @category.save
      render :show
    else
      render json: @category.errors.full_messages, status: 422
    end
  end

  def destroy
    if @category.destroy
      render :show
    else
      render json: @category.errors.full_messages, status: 422
    end
  end

  def update
    if @category.update(category_params)
      render :show
    else
      render json: @category.errors.full_messages, status: 422
    end
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    category = {}

    category[:id] = params[:category][:id]
    category[:title] = params[:category][:title]
    category[:icon_id] = params[:category][:iconId]

    category
  end

end
