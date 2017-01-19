class Api::IconsController < ApplicationController
  def index
    @icons = Icon.all
  end
end
