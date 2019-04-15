import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./shared/components/error/error.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { OnBoardModule } from "./on-board/on-board.module";
import { StudentModule } from "./student/student.module";
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    NavbarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    OnBoardModule,
    StudentModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
