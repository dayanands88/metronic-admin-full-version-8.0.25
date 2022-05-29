import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AccountComponent } from './account.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { ViewDocComponent } from './view-doc/view-doc.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'create-doc',
        component: CreateDocumentComponent,
      },
      {
        path: 'Edit-doc/:Notification',
        component: CreateDocumentComponent,
      },
      {
        path: 'View-doc',
        component: ViewDocComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
