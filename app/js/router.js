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

            if (this.currentView) {
                this.currentView.remove();
            }

            router.itemList = new BackboneWizard.Collections.ItemList();

            $.get('/appData.json').done(function (data) {
                router.transaction = new BackboneWizard.Models.Transaction(data);
                router.itemView = router.currentView = new BackboneWizard.Views.ItemView({ model: router.transaction, collection: router.itemList });
                $('#wizard').html(router.itemView.render().el);
            });

            $.get('/itemData.json').done(function (data) {
                router.itemList.add(data);
            });
        },

        showVerify: function () {
            this.currentView.remove();
            this.customerView = this.currentView = new BackboneWizard.Views.CustomerView({ model: this.transaction });
            $('#wizard').html(this.customerView.render().el);
        },

        showPayment: function () {
            this.currentView.remove();
            this.paymentView = this.currentView = new BackboneWizard.Views.PaymentView({ model: this.transaction });
            $('#wizard').html(this.paymentView.render().el);
        },

        showSuccess: function () {
            this.currentView.remove();
            this.successView = this.currentView = new BackboneWizard.Views.SuccessView({ model: this.transaction });
            $('#wizard').html(this.successView.render().el);
        }
    });

})();
