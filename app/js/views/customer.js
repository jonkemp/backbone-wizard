/*global BackboneWizard, Backbone, _*/

BackboneWizard.Views = BackboneWizard.Views || {};

(function () {
    'use strict';

    BackboneWizard.Views.CustomerView = Backbone.View.extend({

        template: _.template( $('#customer-template').html() ),

        className: 'row',

        events: {
            'click #next': 'nextStep',
            'click #back': 'previousStep'
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
            BackboneWizard.wizardRouter.navigate('payment', {trigger: true});
        },

        previousStep: function (event) {
            event.preventDefault();
            BackboneWizard.wizardRouter.navigate('', {trigger: true});
        }

    });

})();
