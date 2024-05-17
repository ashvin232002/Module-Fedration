import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path: '', redirectTo:'home',pathMatch:'full'
  },
  {path:'home',component:HomeComponent},
  {
    path: 'mfe1',
    loadChildren: () => {
      console.log("Inside MFE1");
      return loadRemoteModule({
        
        remoteEntry: 'http://localhost:4001/remoteEntry.js',
        remoteName: 'mfe1',
        exposedModule: './OrderModule'
      }).then(m => m.OrderModule).catch(e => {
        console.error('Error loading remote module:', e);
        throw e; // Rethrow the error to propagate it further
      });
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
