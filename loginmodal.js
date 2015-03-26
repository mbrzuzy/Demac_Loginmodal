/*
 * Demac Login modal
 * Version 1.0.0
 * Author: mbrzuzy
 *
 * When a user clicks any of the addToCartElements, a modal opens up prompting
 * the user the login or sign up.
 *
 * Important note: window.parent.Demac.Loginmodal is called in the click event
 * for situations in which the clicked element is in an iframe.  The modal element
 * will open in the parent of the iframe.
 */
;(function(Demac, $, undefined) {
  'use strict';

  Demac.Loginmodal = {
    options: {
      modal: '.modal_login-signup',
      addToCartElements: ['.add-to-cart button'],
      referer: ''
    },
    init: function(args) {
      if (args && typeof args === 'object') {
        this.options = $.extend(this.options, args);
      }

      if (typeof this.options.addToCartElements === 'string') {
        this.options.addToCartElements = [this.options.addToCartElements];
      }

      this.removeInlineOnclick();
      this.bindings();
    },
    removeInlineOnclick: function() {
      this.loopItems(function(item) {
        if (typeof item === 'object') {
          item.removeAttr('onclick');
        }
      });
    },
    bindings: function() {
      var self = this;
      this.loopItems(function(item) {
        if (typeof item === 'object') {
          item.on('click', function(event) {
            event.preventDefault();
            if (self.options.referer !== '') {
              window.parent.Demac.Loginmodal.updateFormReferer(self.options.referer)
            }
            window.parent.Demac.Loginmodal.show();
          });
        }
      });
    },
    show: function() {
      $(this.options.modal).modal();
    },
    loopItems: function(action) {
      if (typeof action === 'function') {
        this.options.addToCartElements.each(function(item) {
          action($(item));
        });
      }
    },
    updateFormReferer: function (referer) {
      if (referer !== '') {
        var $form  = $(this.options.modal + ' form', parent.document);
        $form.find('input[name=referer]').val(referer);
      }
    }
  }
}(window.Demac = window.Demac || {}, jQuery));