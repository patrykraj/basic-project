import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  featherTrash2,
  featherUser,
  featherCheck,
  featherX,
} from "@ng-icons/feather-icons";

@Component({
  selector: "TaskRemoveButtonComponent",
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ featherTrash2, featherUser, featherCheck, featherX })],
  template: `
    <div (click)="$event.stopPropagation()" class="flex items-center rounded-md">
      <div
        class="transition-transform duration-100 rounded-md py-2 pl-2 text-sm"
        [class.invisible]="!deleteMode"
        [class.translate-x-4]="deleteMode"
        [class.bg-red-700]="deleteMode"
        [class.text-white]="deleteMode"
      >
        <span>Are you sure?</span>
        <button>
          <ng-icon name="featherCheck" class="icon--hover" />
        </button>
        <button (click)="setDeleteMode(); $event.stopPropagation()">
          <ng-icon name="featherX" class="icon--hover" />
        </button>
      </div>
      <button (click)="setDeleteMode(); $event.stopPropagation()">
        <ng-icon name="featherTrash2" />
      </button>
    </div>
  `,
  styles: ``,
})
export class TaskRemoveButtonComponent {
  deleteMode: boolean = false;

  setDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }
}
