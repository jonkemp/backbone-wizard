/*global BackboneWizard, Backbone, _*/

BackboneWizard.Views = BackboneWizard.Views || {};

(function () {
    'use strict';

    BackboneWizard.Views.PaymentView = Backbone.View.extend({

        template: _.template( $('#payment-template').html() ),

        className: 'row',

        events: {
            'click #next': 'nextStep',
            'click #back': 'previousStep'
        },

        bindings: {
            '#cc-name': 'ccName',
            '#cc-type': 'ccType',
            '#cc-number': 'ccNumber',
            '#cc-exp-date': 'ccExpDate',
            '#cc-security-code': 'ccSecurityCode'
        },

        initialize: function () {
            var view = this;

            function log() {
                console.log(JSON.stringify(view.model.changed));
            }

            var verify = _.debounce(log, 1000);

            view.model.on('change', verify);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            this.stickit();
            return this;
        },

        nextStep: function (event) {
            event.preventDefault();
            BackboneWizard.wizardRouter.navigate('success', {trigger: true});
        },

        previousStep: function (event) {
            event.preventDefault();
            BackboneWizard.wizardRouter.navigate('verify', {trigger: true});
        }

    });

})();
