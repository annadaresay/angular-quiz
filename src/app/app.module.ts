import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuestionImageComponent } from './quiz/question-image/question-image.component';
import { QuestionQuoteComponent } from './quiz/question-quote/question-quote.component';
import { QuestionComponent } from './quiz/question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { ButtonComponent } from './ui/button/button.component';
import { RadioGroupComponent } from './ui/radio-group/radio-group.component';
import { SpacerComponent } from './ui/spacer/spacer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpacerComponent,
    ButtonComponent,
    QuizComponent,
    RadioGroupComponent,
    QuestionComponent,
    QuestionQuoteComponent,
    QuestionImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
