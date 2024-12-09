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
  imports: [NgIconComponent, NgIf],
  viewProviders: [provideIcons({ featherTrash2, featherUser, featherCheck, featherX })],
  template: `
    <div class="flex">
      <div
        class="transition-transform duration-300"
        [class.invisible]="!deleteMode"
        [class.-translate-x-6]="deleteMode"
        [class.bg-red-700]="deleteMode"
      >
        <span>Are you sure?</span>
        <button>
          <ng-icon name="featherCheck" />
        </button>
        <button>
          <ng-icon name="featherX" />
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
