import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent  } from "./home/home.component";
import { SimonSaysComponent } from "./simon-says/simon-says.component";
import { RankingComponent  } from "./ranking/ranking.component";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "simon", component: SimonSaysComponent},
  {path: "ranking", component: RankingComponent},
  {path: "", redirectTo: '/home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
