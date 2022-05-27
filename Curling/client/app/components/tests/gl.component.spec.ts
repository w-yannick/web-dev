import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { expect } from 'chai';

import { GlComponent } from '../gl.component';
import { RenderService } from '../../services/render.service';

describe('GlComponent', function () {
    let comp: GlComponent;
    let fixture: ComponentFixture<GlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [GlComponent],
            providers: [{ provide: RenderService }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GlComponent);
        comp = fixture.componentInstance;
    });

    it('should create component', () => {
        expect(comp).to.not.be.undefined;
    });

});
