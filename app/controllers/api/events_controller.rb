class Api::EventsController < ApplicationController
  before_action :set_event, only: [:show, :destroy, :update]

  def index
    # get start_date and end_date and return events within this date range
    @events = Event.all

    render :events
  end

  def show
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def destroy
    if @event.destroy
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    if @event.update(event_params)
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(
      :title,
      :notes,
      :start_date,
      :end_date,
      :address
    )
  end
end
