import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { rootRouterConfig } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TinymceComponent } from './tinymce/tinymce.component';
import { PreviewComponent } from './preview/preview.component';
import { HeaderComponent } from './header/header.component';
import { ContentService } from './core/content.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersService } from './shared/orders.service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    TinymceComponent,
    PreviewComponent,
    HeaderComponent,
    OrdersComponent,
    OrderListComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    EditorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard, ContentService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
