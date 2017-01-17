class Api::EventsController < ApplicationController
  before_action :set_event, only: [:show, :destroy, :update]

  def index
    # get start_date and end_date and return events within this date range
    start_date = DateTime.parse(params['startDate']).utc
    end_date = DateTime.parse(params['endDate']).utc

    @events = get_events_by_date_range(start_date, end_date)

    render :events
  end

  def show
  end

  def create
    Time.zone = current_user.timezone
    @event = Event.new(event_params)
    @event.user = current_user

    if @event.save
      start_date, end_date = @event.current_day
      @events = get_events_by_date_range(start_date.utc, end_date.utc)

      render :events
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def destroy
    Time.zone = current_user.timezone

    if @event.destroy
      start_date, end_date = @event.current_day
      @events = get_events_by_date_range(start_date.utc, end_date.utc)

      render :events
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    Time.zone = current_user.timezone
    old_next_event = @event.next_event
    p 'before update'
    p old_next_event
    if @event.update(event_params)
      p 'after update'
      p old_next_event
      old_next_event.calculate_directions if old_next_event

      start_date, end_date = @event.current_day
      @events = get_events_by_date_range(start_date.utc, end_date.utc)

      render :events
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  private

  def get_events_by_date_range(start_date, end_date)
    Time.zone = 'UTC'

    Event
      .where(user_id: current_user.id,
             start_date: start_date..end_date)
      .order(:start_date)
      .includes(:direction)
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    event = {}

    event[:id] = params[:event][:id]
    event[:title] = params[:event][:title]
    event[:notes] = params[:event][:notes]
    event[:address] = params[:event][:address]
    event[:start_date] = DateTime.parse(params[:event][:startDate]).utc
    event[:end_date] = DateTime.parse(params[:event][:endDate]).utc

    event
  end
end
