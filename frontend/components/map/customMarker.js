function CustomMarker({id, title, position, map, styleClass}) {
  this.eventId = id;
  this.title = title;
  this.position_ = position;
  this.styleClass = styleClass;
  this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
  const me = this;
  let div = this.div_;
  if (!div) {
    div = this.div_ = document.createElement('DIV');
    div.classList.add('custom-marker');
    div.classList.add(this.styleClass);
    $(div).data('eventId', this.eventId);

    $(div).append(
      `<div class="marker-title">
        <span>${this.title}</span>
      </div>
      <div class="marker-bottom-arrow"></div>`
    );

    google.maps.event.addDomListener(div, "click", function(event) {
      // console.log($(event.target));
    });

    const panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  const midWidth = $(div).width() / 2;
  const heigth = $(div).height();

  const point = this.getProjection().fromLatLngToDivPixel(this.position_);
  if (point) {
    div.style.left = point.x - midWidth + 'px';
    div.style.top = point.y - heigth + 'px';
  }
};

CustomMarker.prototype.remove = function() {
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

CustomMarker.prototype.getPosition = function() {
 return this.position_;
};

export default CustomMarker;
