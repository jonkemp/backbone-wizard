/*global BackboneWizard, Backbone*/

BackboneWizard.Models = BackboneWizard.Models || {};

(function () {
    'use strict';

    BackboneWizard.Models.Item = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            'name': '',
            'description': '',
            'quantity': '',
            'price': ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
