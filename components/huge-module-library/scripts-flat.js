/* global Carousel, Navigation, Accordion, AccordionControl, AccordionGroup, Overlay, Dialog, Modal,
   OverlayKeyboard, OverlayControl */
/**
 * Carousels
 */
var carouselElements = document.getElementsByClassName('carousel-demo')[0].children;

// carousel 1
var carousel1 = new Carousel(carouselElements[0]);

// carousel 2
var navigationContainer = carouselElements[1].getElementsByClassName('navigation')[0];
var carousel2 = new Carousel(carouselElements[1], '.slide');
var carousel2Nav = new Navigation(carousel2, navigationContainer, 'cnav-prev', 'cnav-next');

// carousel 3
var carousel3 = new Carousel(carouselElements[2]);
var carousel3Pagination = new Pagination(carousel3);

/**
 * Accordions
 */
var accordionElements = document.getElementsByClassName('accordion');
var accordionGroup = document.getElementsByClassName('accordion-group')[0];

// accordion 1
var accordion1 = new Accordion(accordionElements[0], true, 300, 100);
var acc1Container = accordionElements[0].parentNode;
acc1Container.querySelector('.button.show').addEventListener('click', function() { accordion1.expand(); });
acc1Container.querySelector('.button.hide').addEventListener('click', function() { accordion1.contract(); });
acc1Container.querySelector('.button.toggle').addEventListener('click', function() { accordion1.toggle(); });

// accordion 2
var accordion2 = new Accordion(accordionElements[1]);
var accordion2ControlElem = accordionGroup.querySelector('.accordion-2-trigger');
var accordion2Control = new AccordionControl(accordion2, accordion2ControlElem);
accordion2Control.changeControlText('Show Accordion 2', 'Hide Accordion 2');

// accordion 3
var accordion3 = new Accordion(accordionElements[2]);
var accordion3ControlElem = accordionGroup.querySelector('.accordion-3-trigger');
var accordion3Control = new AccordionControl(accordion3, accordion3ControlElem, 'expand');

// accordion Group
var accordionGroup1 = new AccordionGroup();
accordionGroup1.addAccordion(accordion2);
// accordionGroup1.makeDefault(accordion2);
accordionGroup1.addAccordion(accordion3);

/**
 * Overlays
 */
var overlayDemoContainers = document.getElementsByClassName('overlay-demo');
var overlayDemo = document.getElementsByClassName('overlay-container')[0];
var dialogDemo = document.getElementsByClassName('dialog-container')[0];
var modalDemos = document.getElementsByClassName('modal-container');

// overlay1
var overlay1 = new Overlay(overlayDemo);
overlayDemoContainers[0].addEventListener('click', function(e) {
    if (e.target.classList.contains('overlay-1') && e.target.classList.contains('open'))
    overlay1.open(); });

overlayDemoContainers[0].addEventListener('click', function(e) {
    if (e.target.classList.contains('overlay-1') && e.target.classList.contains('close'))
    overlay1.close(); });


// dialog 1
var dialog = new Dialog(dialogDemo);
overlayDemoContainers[1].addEventListener('click', function(e) {
  if (e.target.classList.contains('dialog-1') && e.target.classList.contains('open'))
  dialog.open(); });
overlayDemoContainers[1].addEventListener('click', function(e) {
  if (e.target.classList.contains('dialog-1') && e.target.classList.contains('close'))
  dialog.close(); });


// basic modal
var modal1 = new Modal(modalDemos[1]);
overlayDemoContainers[2].addEventListener('click', function(e) {
  var classes = e.target.classList
  if (classes.contains('open') && classes.contains('modal-1')) { modal1.open(); }
  if (classes.contains('close') && classes.contains('modal-1')) { modal1.close(); }
});

// modal template markup separate from content markup
var modalContentContainer = modalDemos[0].getElementsByClassName('content')[0];
var modal2openControl = overlayDemoContainers[2].querySelector('.modal-2.open');
var modal3openControl = overlayDemoContainers[2].querySelector('.modal-3.open');

var modal2 = new Modal(modalDemos[0], modalContentContainer);
var modal2Keyboard = new OverlayKeyboard(modal2);
var modal2Controls = new OverlayControl(modal2);

modal2.mediator.subscribe(Modal.eventNames.AFTER_CLOSE, function(modal) {
  modal.setContent('');
});

var modalOpenControlSetup = function(modal, e) {
  var control = e.target || e.srcElement;
  var overlayContent = control.nextElementSibling.innerHTML;
  modal.setContent(overlayContent);
};

modal2Controls.addOpenControl(modal2openControl, modalOpenControlSetup);
modal2Controls.addOpenControl(modal3openControl, modalOpenControlSetup);
