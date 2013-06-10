/* jshint undef: true, unused: false */
/* global $, jQuery,window, document */

/** Built on jquery boilerplate -  http://jqueryboilerplate.com
* @version 0.1.0
* @author Mark Kennard - AKA Snowmeister
* the semi-colon before function invocation is a safety net against concatenated
* scripts and/or other plugins which may not be closed properly.*/
;(function($, window, document, undefined) {
  /** Setup the plugin defaults. */
  var pluginName = "mkflickr",
    defaults = {
      apiKey: '',
      userId: '',
      containerCssClass: 'flickr-region',
      itemCount: 20,
      baseUrl: 'http://api.flickr.com/services/rest/?method=',
      tag: 'span'
    };
  /**
 * Creates an instance of Plugin.
 *
 * @function Plugin
 * @param {object} element - The HTML (jQuery object) element the plugin is applied
 * @param {object} options - The plugin options object
 */
  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }
  /**
 * Extends the Plugin prototype.
 * Extend the prototype with the required methods and properties....
 */

  Plugin.prototype = {
/** Sets up the plugin and starts the ball rolling. Creates a DIV inside the target element, which will be populated with images once we've done the AJAX
 * @function init 
 * @inner
 * @returns this
 */
   init: function() {
     // First up, we need to add div for the gallery, with the CSS class passed in from the options
      $(this.element).html('<div class="' + this.settings.containerCssClass + '"></div>');
      //everything is ready now to do the AJAX call to load the jsonp from Flickr
      this.doAjax();
      // make sure the plugin is chainable...
      return this;
    },
    /** Used to display error message to the UI if the Flickr data contains a 'fail' status
     * @function galleryError 
     * 
     * @param {object} data The data object returned from the initial $.ajax call
     * @returns this
     * @inner
     */
    galleryError: function(data) {
      $(this.element).html('<' + this.settings.tag + ' class="flickr-error">Error: ' + data.message + '. Check your API key and userID</' + this.settings.tag + '>');
      return this;
    },
    /** Used to render photos to the UI based on data passed in from the $.ajax call
     * @function buildGallery 
     * 
     * @param {object} data The data object returned from the initial $.ajax call
     * @returns this
     * @inner
     */
    buildGallery: function(data) {
      var arrPhotos = data.photos.photo;
      var sTag = this.settings.tag;
      var me = this;
      $.map(arrPhotos, function(photo) {
        var strImg = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_t.jpg';
        var strLink = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_z.jpg';
        $(me.element).find('div.' + me.settings.containerCssClass).append('<' + sTag + '><a href="' + strLink + '"><img src="' + strImg + '"/></a></' + sTag + '>');
      });
      return this;
    },
    /** AJAX function to load the JSONP from Flickr
     * @function doAjax 
     * @inner
     * @returns this
     */
    doAjax: function() {
      var me = this;
      // some logic
      $.ajax({
        url: this.buildFlickrUrl(),
        dataType: 'jsonp',
        success: function(data) {
          if (data.stat === 'ok') {
            me.buildGallery(data);
          } else {
            me.galleryError(data);
          }
        }
      });
      return this;
    },
    /** Builds the URL used in the AJAX call, based on the plugin settings (URL, API Key, User Id, Item Count)
     * @function buildFlickrUrl 
     * @inner
     * @returns requestPath as String
     */
    buildFlickrUrl: function() {
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
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);