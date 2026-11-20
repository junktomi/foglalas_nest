import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { addreservationsDTO } from './addreservation.dto.js';


const regexEmail = /.+[@]+.+[.]+.+/

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHello() {
    return {
      foglalasok: await this.appService.getFoglalas(),
      error: [],
      success: ""
    }
  }

  @Post()
  @Render('index')
  async addReservation(@Body() body: addreservationsDTO){
    const error = []
    let success = ""
    const currentDate = new Date()
    if(!regexEmail.test(body.email)){
      error.push("Az email nem megfelelő formátumú")
    }
    if(!body.nev){
      error.push("Nevet megadni kötelező")
    }
    if(!body.email){
      error.push("Email-t megadni kötelező")
    }
    if(!body.startDate){
      error.push("Dátumot megadni kötelező")
    }
    if(new Date(body.startDate)<currentDate){
      error.push("A dátum nem lehet múltbeli")
    }
    if(!body.guests){
      error.push("Nézők számát megadni kötelező")
    }
    if(parseInt(body.guests)<1 || parseInt(body.guests)>10){
      error.push("A nézők száma 1 és 10 között kell legyen")
    }

    if(error.length==0){
      await this.appService.addFoglalas(body.nev, body.email,  new Date(body.startDate), parseInt(body.guests))
      success = "Sikeres feltöltés"
    }

    return {
      foglalasok: await this.appService.getFoglalas(),
      error: error,
      success: success
    }
  }


  
}
