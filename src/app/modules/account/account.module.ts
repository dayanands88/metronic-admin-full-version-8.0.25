
import { InlineSVGModule } from 'ng-inline-svg';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from '../account/account.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileDetailsComponent } from './settings/forms/profile-details/profile-details.component';
import { ConnectedAccountsComponent } from './settings/forms/connected-accounts/connected-accounts.component';
import { DeactivateAccountComponent } from './settings/forms/deactivate-account/deactivate-account.component';
import { EmailPreferencesComponent } from './settings/forms/email-preferences/email-preferences.component';
import { NotificationsComponent } from './settings/forms/notifications/notifications.component';
import { SignInMethodComponent } from './settings/forms/sign-in-method/sign-in-method.component';
import { DropdownMenusModule, WidgetsModule } from '../../_metronic/partials';
import { CreateDocumentComponent } from './create-document/create-document.component';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewDocComponent } from './view-doc/view-doc.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [
    AccountComponent,
    OverviewComponent,
    SettingsComponent,
    ProfileDetailsComponent,
    ConnectedAccountsComponent,
    DeactivateAccountComponent,
    EmailPreferencesComponent,
    NotificationsComponent,
    SignInMethodComponent,
    CreateDocumentComponent,
    ViewDocumentsComponent,
    ViewDocComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    AccountRoutingModule,
    MatTableModule,
    MatSnackBarModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    AngularEditorModule,
    FormsModule,
    MatPaginatorModule
  ],
})
export class AccountModule {}
