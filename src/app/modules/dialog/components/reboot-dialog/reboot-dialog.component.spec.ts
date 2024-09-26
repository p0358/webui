import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { SystemRebootInfo } from 'app/interfaces/reboot-info.interface';
import { RebootDialogComponent } from 'app/modules/dialog/components/reboot-dialog/reboot-dialog.component';
import {
  selectOtherNodeInfo,
  selectThisNodeInfo,
} from 'app/store/reboot-info/reboot-info.selectors';

const fakeThisNodeInfo: SystemRebootInfo = {
  boot_id: 'this-boot-id',
  reboot_required_reasons: [
    { code: 'FIPS', reason: 'Test Reason 1' },
    { code: 'FIPS', reason: 'Test Reason 2' },
  ],
};

const fakeOtherNodeInfo: SystemRebootInfo = {
  boot_id: 'other-boot-id',
  reboot_required_reasons: [
    { code: 'FIPS', reason: 'Test Reason 3' },
    { code: 'FIPS', reason: 'Test Reason 4' },
  ],
};

describe('RebootDialogComponent', () => {
  let spectator: Spectator<RebootDialogComponent>;
  const createComponent = createComponentFactory({
    component: RebootDialogComponent,
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectThisNodeInfo,
            value: fakeThisNodeInfo,
          },
          {
            selector: selectOtherNodeInfo,
            value: fakeOtherNodeInfo,
          },
        ],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('shows reasons', () => {
    expect(
      spectator.queryAll('.reasons li').map((item) => item.textContent.trim()),
    ).toEqual([
      'Test Reason 1',
      'Test Reason 2',
      'Test Reason 3',
      'Test Reason 4',
    ]);
  });
});
