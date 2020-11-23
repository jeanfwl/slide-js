export default class Slide {
  constructor(slide, slideWrapper) {
    this.slide = document.querySelector(slide);
    this.slideWrapper = document.querySelector(slideWrapper);
    this.distance = { finalPosition: 0, startX: 0, movement: 0 };
  }

  moveSlide(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.3;
    return this.distance.finalPosition - this.distance.movement;
  }

  onStart(event) {
    event.preventDefault();
    this.distance.startX = event.clientX;
    this.slideWrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.slideWrapper.removeEventListener('mousemove', this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  addSlideEvents() {
    this.slideWrapper.addEventListener('mousedown', this.onStart);
    this.slideWrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
