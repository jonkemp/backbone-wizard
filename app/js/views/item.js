/*global BackboneWizard, Backbone, _*/

BackboneWizard.Views = BackboneWizard.Views || {};

(function () {
    'use strict';

    BackboneWizard.Views.ItemView = Backbone.View.extend({

        template: _.template( $('#item-template').html() ),

        className: 'row',

        events: {
            'click #next': 'nextStep'
        },

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        nextStep: function (event) {
            event.preventDefault();
            BackboneWizard.wizardRouter.navigate('verify', {trigger: true});
        }

    });

})();
