import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';

import * as moment from 'moment';


@Component({
  selector: 'app-simon-says',
  templateUrl: './simon-says.component.html',
  styleUrls: ['./simon-says.component.css']
})
export class SimonSaysComponent implements OnInit {

  constructor(private elementRef: ElementRef, private http: HttpClient) { }

  colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "violet", "pink"] // tableau des couleurs

  // Affectation des classes CSS aux ngClass
  red = 'red' // la ngClass red se voit affecter la classe 'red' dans le css
  orange = 'orange'
  yellow = 'yellow'
  green = 'green'
  cyan = 'cyan'
  blue = 'blue'
  purple = 'purple'
  violet = 'violet'
  pink = 'pink'

  simonSequence: string[] = []  // suite de l'ordi
  userSequence: string[] = []   // suite du joueur

  lost = false //variable de verification

  score: any; //futures data envoyées
  startDate: any;
  endDate: any;
  username: any;

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#242424';
    this.username = sessionStorage.getItem("username") //on récupère le pseudo de la session
  }

  click(color: string, player: string, clickDuration: number) {

    switch (color) { // en fonction  de la couleur cliqué, la this.ngClass se voit attribué la classe CSS 'gray', attend 500ms et lui rend sa classe d'origine
      case 'red':
        this.red = 'gray'
        setTimeout(() => {
          this.red = 'red'
        }, clickDuration);
        break;
      case 'orange':
        this.orange = 'gray'
        setTimeout(() => {
          this.orange = 'orange'
        }, clickDuration);
        break;
      case 'yellow':
        this.yellow = 'gray'
        setTimeout(() => {
          this.yellow = 'yellow'
        }, clickDuration);
        break;
      case 'green':
        this.green = 'gray'
        setTimeout(() => {
          this.green = 'green'
        }, clickDuration);
        break;
      case 'cyan':
        this.cyan = 'gray'
        setTimeout(() => {
          this.cyan = 'cyan'
        }, clickDuration);
        break;
      case 'blue':
        this.blue = 'gray'
        setTimeout(() => {
          this.blue = 'blue'
        }, clickDuration);
        break;
      case 'purple':
        this.purple = 'gray'
        setTimeout(() => {
          this.purple = 'purple'
        }, clickDuration);
        break;
      case 'violet':
        this.violet = 'gray'
        setTimeout(() => {
          this.violet = 'violet'
        }, clickDuration);
        break;
      case 'pink':
        this.pink = 'gray'
        setTimeout(() => {
          this.pink = 'pink'
        }, clickDuration);
        break;
      default:
        break;
    }

    if (player == "user") { // si c'est l'utilisateur qui choisit une couleur,
      this.userSequence.push(color) // on l'ajoute à sa suite
      for (let i = 0; i < this.userSequence.length; i++) { // pour chaque couleur de la suite du joueur
        if (this.userSequence[i] != this.simonSequence[i] && this.simonSequence.length != 0) { // si la partie est lancé (== que le tableau de simon n'est pas vide) et que les valeurs sont différente
          this.endDate = moment() // on récupère la date

          this.lost = true // on signale que le joueur a perdu
          this.endGame(this.startDate, this.endDate, this.simonSequence.length) // on termine la partie

          this.simonSequence = [] //on réinitialise les séquence
          this.userSequence = []

        }
      }
      if (this.lost == false && this.userSequence.length == this.simonSequence.length) { // si le joueur n'a pas perdu et qu'il termine la séquence
        setTimeout(() => {
          this.nextMove() // on passe au prochain coup
        }, 1000);

      }

    }
  }

  nextMove() {
    this.userSequence = []  // on vide la sequence du joueur
    let color = this.getRandomColor()  // choisit une couleur
    this.simonSequence.push(color) // on l'ajoute a la séquence de Simon

    const test =
      this.simonSequence.forEach((element, i) => {
        setTimeout(() => { this.click(element, 'simon', 500) }, i * 1000); // ici on triche un peu a cause de la nature asynchrone de JS, on augmente le delais du clique a chaque fois sinon tous les clics de la séquence se font en meme temps
      });
  }

  start() {

    this.startDate = moment() //on récupère la date

    this.lost = false; // variable de vérification 
    this.simonSequence = [] // on initialise les séquences
    this.userSequence = []


    let color = this.getRandomColor()    // choisit une couleur
    this.simonSequence.push(color) // ajoute a la séquence
    this.click(color, 'simon', 500) // clic "visuel" sur la grille
  }

  endGame(startDate: any, endDate: any, score: any) { //terminer la partie
    this.score = score


    console.log({
      score: this.score -1,
      username: this.username,
      time: Math.round(endDate.diff(startDate) / 1000),
      date: this.startDate.format('MMMM d, YYYY')
    })

    this.http.post<any>('https://localhost:8000/score/new', {
      score: this.score -1, 
      username: this.username,
      time: Math.round(endDate.diff(startDate) / 1000), // on divise par 1000 pour avoir le temps en seconde et on arrondi
      date: this.startDate.format('MMMM d, YYYY') // date renvoyé au format string
    }).subscribe()

  }

  getRandomColor() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)] // on choisit une couleur aléatoirement dans le tableau, basé sur un random de l'index
    return randomColor
  }

  logArrays() {
    console.log(this.simonSequence)
    console.log(this.userSequence)
  }



}
