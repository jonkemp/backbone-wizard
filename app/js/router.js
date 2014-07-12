/*global BackboneWizard, Backbone*/

BackboneWizard.Routers = BackboneWizard.Routers || {};

(function () {
    'use strict';

    BackboneWizard.Routers.WizardRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'verify': 'showVerify',
            'payment': 'showPayment',
            'success': 'showSuccess'
        },

        index: function () {
            var router = this;

            if (this.customerView) {
                this.customerView.remove();
            }

            $.get('/appData.json').done(function (data) {
                router.transaction = new BackboneWizard.Models.Transaction(data);
                router.itemList = new BackboneWizard.Collections.ItemList();
                //router.transaction.set('items', router.itemList.toJSON());
                router.itemView = new BackboneWizard.Views.ItemView({ model: router.transaction, collection: router.itemList });
                $('#wizard').html(router.itemView.render().el);

                $.get('/itemData.json').done(function (data) {
                    router.itemList.add(data);
                });
            });
        },

        showVerify: function () {
            this.itemView.remove();
            if (this.paymentView) {
                this.paymentView.remove();
            }
            this.customerView = new BackboneWizard.Views.CustomerView({ model: this.transaction });
            $('#wizard').html(this.customerView.render().el);
        },

        showPayment: function () {
            this.customerView.remove();
            this.paymentView = new BackboneWizard.Views.PaymentView({ model: this.transaction });
            $('#wizard').html(this.paymentView.render().el);
        },

        showSuccess: function () {
            this.paymentView.remove();
            this.successView = new BackboneWizard.Views.SuccessView({ model: this.transaction });
            $('#wizard').html(this.successView.render().el);
        }
    });

})();
