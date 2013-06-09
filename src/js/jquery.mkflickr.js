/* jshint undef: true, unused: false */
/* global $, jQuery,window, document */

// Built on jquery boilerplate -  http://jqueryboilerplate.com/

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

  // Create the defaults once
  var pluginName = "mkflickr",
    defaults = {
      apiKey: '',
      userId: '',
      containerCssClass: 'gallery',
      itemCount: 20,
      baseUrl: 'http://api.flickr.com/services/rest/?method=',
      tag: 'span'
    };
  // The actual plugin constructor

  function Plugin(element, options) {
    this.element = element;
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }
  Plugin.prototype = {
    init: function () {
      // First up, we need to add div for the gallery, with the CSS class passed in from the options
      $(this.element).html('<div class="' + this.settings.containerCssClass + '"></div>');
      //everything is ready now to do the AJAX call to load the jsonp from Flickr
      this.doAjax();
      // make sure the plugin is chainable...
      return this;
    },
    buildGallery: function (data) {
      $('body').append('we have data and are building the gallery' + data.photos.photo.length);
      var arrPhotos = data.photos.photo;
      var sTag = this.settings.tag;
      var me = this;
      $.map(arrPhotos, function (photo) {
        var strImg = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_t.jpg';
        var strLink = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_z.jpg';
        $(me.element).find('div.' + me.settings.containerCssClass).append('<'+sTag+'><img src="'+strImg+'"/></'+sTag+'>');
      });
    },
    // doAjax, used to load the jsonp from Flickr
    doAjax: function () {
      var me = this;
      // some logic
      $.ajax({
        url: this.buildFlickrUrl(),
        dataType: 'jsonp',
        success: function (data) {
          me.buildGallery(data);
        }
      });
    },
    // buildflickrUrl, used to string together the full URL from the settings....
    buildFlickrUrl: function () {
      // shortcut to settings
      var s = this.settings;
      // build the requestpath....
      var requestPath = s.baseUrl + 'flickr.photos.search&api_key=' + s.apiKey + '&user_id=' + s.userId + '&per_page=' + s.itemCount + '&format=json&jsoncallback=?';
      // return....
      return requestPath;
    }
  };
  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);