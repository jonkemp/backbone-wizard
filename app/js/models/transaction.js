/*global BackboneWizard, Backbone*/

BackboneWizard.Models = BackboneWizard.Models || {};

(function () {
    'use strict';

    BackboneWizard.Models.Transaction = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            'name': '',
            'address': '',
            'city': '',
            'state': '',
            'zipcode': '',
            'email': '',
            'phone': '',
            'ccName': '',
            'ccType': '',
            'ccNumber': '',
            'ccExpDate': '',
            'ccSecurityCode': '',
            'items': []
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
