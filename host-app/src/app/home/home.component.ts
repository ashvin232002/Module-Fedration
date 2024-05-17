import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('placeholder', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

  constructor(private injector: Injector, private cfr: ComponentFactoryResolver) {}

  async load(): Promise<void> {
    try {
      console.log("Clicked");
      const m = await loadRemoteModule({
        remoteEntry: "http://localhost:4002/remoteEntry.js",
        remoteName: 'mfe2',
        exposedModule: "./Component"
      });
      
      console.log("After");
      if (m && m.AppComponent) {
        const factory = this.cfr.resolveComponentFactory(m.AppComponent);
        this.viewContainer.clear();
        this.viewContainer.createComponent(factory, 0, this.injector);
      } else {
        console.error('Failed to load the component from the remote module');
      }
    } catch (error) {
      console.error('Error loading remote module:', error);
    }
  }
}
