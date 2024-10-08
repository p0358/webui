import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { IxIconComponent } from 'app/modules/ix-icon/ix-icon.component';
import { BottomSheetService } from 'app/services/bottom-sheet.service';

@Component({
  selector: 'ix-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IxIconComponent, TranslateModule, MatButtonModule],
})
export class FormActionsComponent {
  title = input<string>('');

  constructor(
    private bottomSheet: BottomSheetService,
  ) {}

  close(): void {
    this.bottomSheet.close();
  }
}
