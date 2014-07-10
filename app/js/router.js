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
            if (this.customerView) {
                this.customerView.remove();
            }
            this.transaction = new BackboneWizard.Models.Transaction();
            this.itemList = new BackboneWizard.Collections.ItemList();
            this.transaction.set('items', this.itemList);
            this.itemView = new BackboneWizard.Views.ItemView({ collection: this.itemList });
            $('#wizard').html(this.itemView.render().el);
        },

        showVerify: function () {
            this.itemView.remove();
            if (this.paymentView) {
                this.paymentView.remove();
            }
            this.customerView = new BackboneWizard.Views.CustomerView();
            $('#wizard').html(this.customerView.render().el);
        },

        showPayment: function () {
            this.customerView.remove();
            this.paymentView = new BackboneWizard.Views.PaymentView();
            $('#wizard').html(this.paymentView.render().el);
        },

        showSuccess: function () {
            this.paymentView.remove();
            this.successView = new BackboneWizard.Views.SuccessView();
            $('#wizard').html(this.successView.render().el);
        }
    });

})();
