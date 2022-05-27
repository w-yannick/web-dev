import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { expect } from 'chai';

import { GameSelectionComponent } from '../game-selection.component';
import { GameInfoService } from '../../services/game-info.service';

describe('GameSelectionComponent', function () {
    let comp: GameSelectionComponent;
    let fixture: ComponentFixture<GameSelectionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [GameSelectionComponent],
            providers: [
                { provide: GameInfoService },
                { provide: Router }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameSelectionComponent);
        comp = fixture.componentInstance;
    });

    it('should create component', () => {
        expect(comp).to.not.be.undefined;
    });

});
