/*global BackboneWizard, Backbone, _*/

BackboneWizard.Views = BackboneWizard.Views || {};

(function () {
    'use strict';

    BackboneWizard.Views.CustomerView = Backbone.View.extend({

        template: _.template( $('#customer-template').html() ),

        className: 'row',

        events: {
            'click #next': 'nextStep',
            'click #back': 'previousStep',
            'click .tabs a': 'gotoRoute'
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

            if (this.validate()) {
                BackboneWizard.wizardRouter.navigate('payment', {trigger: true});
            }
        },

        previousStep: function (event) {
            event.preventDefault();
            BackboneWizard.wizardRouter.navigate('', {trigger: true});
        },

        gotoRoute: function (event) {
            event.preventDefault();

            var href = $(event.target).attr('href');

            if (this.validate()) {
                BackboneWizard.wizardRouter.navigate(href, {trigger: true});
            }
        },

        validate: function() {
            var valid = true;

            if (this.$('#name').val() === '') {
                this.$('#name').addClass('error');
                this.$('#name').parents('label').addClass('error');
                this.$('#name').parents('label').after('<small class="error">Invalid entry</small>');
                valid = false;
            }

            return valid;
        }

    });

})();
