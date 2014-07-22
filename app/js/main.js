/* global BackboneWizard, Backbone, $ */


window.BackboneWizard = {
    Models: {},
    Collections: {},
    Views: {},
    Controllers: {},
    Routers: {},
    init: function () {
        'use strict';

        this.wizardRouter = new BackboneWizard.Routers.WizardRouter();

        Backbone.history.start({pushState: true});
    }
};

$(document).ready(function () {
    'use strict';
    BackboneWizard.init();
});
