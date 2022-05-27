import { Component, OnInit } from '@angular/core';

import { EventManager } from '../classes/general/event-manager';

import { RenderService } from '../services/render.service';

@Component({
    moduleId: module.id,
    selector: 'my-gl',
    templateUrl: "/assets/templates/gl-component-template.html",
    styleUrls: ["../../assets/stylesheets/gl-component-style.css"],
})

export class GlComponent implements OnInit {

    private eventManager: EventManager;

    constructor(
        private renderService: RenderService
    ) { }

    ngOnInit() {
        this.renderService.init();
        this.eventManager = new EventManager();
        this.eventManager.resize();
    }

}
