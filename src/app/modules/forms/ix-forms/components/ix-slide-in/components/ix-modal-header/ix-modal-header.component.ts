import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, computed, input,
} from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { Role } from 'app/enums/role.enum';
import { ReadOnlyComponent } from 'app/modules/forms/ix-forms/components/readonly-badge/readonly-badge.component';
import { IxIconComponent } from 'app/modules/ix-icon/ix-icon.component';
import { AuthService } from 'app/services/auth/auth.service';
import { BottomSheetService } from 'app/services/bottom-sheet.service';

@Component({
  selector: 'ix-modal-header',
  templateUrl: './ix-modal-header.component.html',
  styleUrls: ['./ix-modal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReadOnlyComponent,
    IxIconComponent,
    MatProgressBar,
    AsyncPipe,
    TranslateModule,
  ],
})
export class IxModalHeaderComponent {
  readonly title = input<string>();
  readonly loading = input<boolean>();
  readonly disableClose = input(false);
  readonly requiredRoles = input<Role[]>([]);

  readonly hasRequiredRoles = computed(() => this.authService.hasRole(this.requiredRoles()));

  constructor(
    // private slideInRef: IxSlideInRef<IxModalHeaderComponent>,
    private bottomSheet: BottomSheetService,
    private authService: AuthService,
  ) {}

  close(): void {
    this.bottomSheet.close();
  }
}
