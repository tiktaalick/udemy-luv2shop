import myAppConfig from 'src/app/config/my-app-config';
import {ProductService} from './services/product.service';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Router, RouterModule, Routes} from '@angular/router';
import {ProductCategoryMenuComponent} from './components/product-category-menu/product-category-menu.component';
import {SearchComponent} from './components/search/search.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CartStatusComponent} from './components/cart-status/cart-status.component';
import {CartDetailsComponent} from './components/cart-details/cart-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {LoginStatusComponent} from './components/login-status/login-status.component';

import {OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';
import {MembersPageComponent} from './components/members-page/members-page.component';
import {OrderHistoryComponent} from './components/order-history/order-history.component'
import {AuthInterceptorService} from "./services/auth-interceptor.service";

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: any, injector: any) => {
    const router = injector.get(Router);

    // Redirect user to custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes: Routes = [
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard]},
  {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard]},
  // Once the user is authenticated, they are redirected to the webshop
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: oktaConfig},
    // Register AuthInterceptorService as an HTTP interceptor
    // HTTP_INTERCEPTORS is a token for injection of an array of values
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
