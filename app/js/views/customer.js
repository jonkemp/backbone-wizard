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

        bindings: {
            '#name': 'name',
            '#address': 'address',
            '#city': 'city',
            '#state': 'state',
            '#zipcode': 'zipcode',
            '#email': 'email',
            '#phone': 'phone'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.verify);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            this.stickit();
            return this;
        },

        verify: function () {
            console.log(this.model.attributes);
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
