import {Injectable, Inject} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TaskEditComponent } from '../task/edittask/task.edit.component';

@Injectable()
export class ConfirmDeactivateGuard implements CanDeactivate<TaskEditComponent> {
    
    canDeactivate(target: TaskEditComponent) {
        if (target.hasChanges) {
            return window.confirm('Unsaved changes?');
        }
        return true;
    }

}
