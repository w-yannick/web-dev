import { SelectedCellService } from '../services/selected-cell.service';

export class EventManager {
    constructor(private selectedCell: SelectedCellService) {
    }

    public handleEvent(eventCode: string): void {
        switch (eventCode) {
            case 'ArrowLeft':
                this.selectedCell.moveLeft();
                break;
            case 'ArrowUp':
                this.selectedCell.moveUp();
                break;
            case 'ArrowRight':
                this.selectedCell.moveRight();
                break;
            case 'ArrowDown':
                this.selectedCell.moveDown();
                break;
            case 'Delete':
                this.selectedCell.delete();
                break;
            default:
                return;
        }
        this.selectedCell.focusSelection();

    }
}
