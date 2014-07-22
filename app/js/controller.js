/*global BackboneWizard*/

BackboneWizard.Controllers = BackboneWizard.Controllers || {};

(function () {
    'use strict';

    BackboneWizard.Controllers.WizardController = {

        index: function () {
            var ctrl = this;

            if (ctrl.currentView) {
                ctrl.currentView.remove();
                ctrl.currentView.off();
            }

            BackboneWizard.wizardRouter.navigate('');

            ctrl.itemList = new BackboneWizard.Collections.ItemList();

            $.get('/appData.json').done(function (data) {
                ctrl.transaction = new BackboneWizard.Models.Transaction(data);

                ctrl.itemView = ctrl.currentView = new BackboneWizard.Views.ItemView({ model: ctrl.transaction, collection: ctrl.itemList });

                ctrl.itemView.on('wizard:verify', ctrl.showVerify, ctrl);

                $('#wizard').html(ctrl.itemView.render().el);
            });

            $.get('/itemData.json').done(function (data) {
                ctrl.itemList.add(data, { merge: true });
            });
        },

        showVerify: function () {
            this.currentView.remove();
            this.currentView.off();

            BackboneWizard.wizardRouter.navigate('verify');

            this.customerView = this.currentView = new BackboneWizard.Views.CustomerView({ model: this.transaction });

            this.customerView.on('wizard:payment', this.showPayment, this);
            this.customerView.on('wizard:index', this.index, this);

            $('#wizard').html(this.customerView.render().el);
        },

        showPayment: function () {
            this.currentView.remove();
            this.currentView.off();

            BackboneWizard.wizardRouter.navigate('payment');

            this.paymentView = this.currentView = new BackboneWizard.Views.PaymentView({ model: this.transaction });

            this.paymentView.on('wizard:success', this.showSuccess, this);
            this.paymentView.on('wizard:verify', this.showVerify, this);

            $('#wizard').html(this.paymentView.render().el);
        },

        showSuccess: function () {
            this.currentView.remove();
            this.currentView.off();

            BackboneWizard.wizardRouter.navigate('success');

            this.successView = this.currentView = new BackboneWizard.Views.SuccessView({ model: this.transaction });
            $('#wizard').html(this.successView.render().el);
        }

    };
})();
