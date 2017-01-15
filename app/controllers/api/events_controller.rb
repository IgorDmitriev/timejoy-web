class Api::EventsController < ApplicationController
  before_action :set_event, only: [:show, :destroy, :update]

  def index
    # get start_date and end_date and return events within this date range
    start_date = DateTime.parse(params['startDate']).utc
    end_date = DateTime.parse(params['endDate']).utc

    @events =
      Event
        .where(user_id: current_user.id,
               start_date: start_date..end_date)
        .order(:start_date)

    render :events
  end

  def show
  end

  def create
    @event = Event.new
    @event.user = current_user
    @event.title = event_params[:title]
    @event.notes = event_params[:notes]
    @event.address = event_params[:address]
    @event.start_date = DateTime.parse(event_params[:startDate]).utc
    @event.end_date = DateTime.parse(event_params[:endDate]).utc
    p 'New event'
    p @event

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
      :startDate,
      :endDate,
      :address
    )
  end
end
