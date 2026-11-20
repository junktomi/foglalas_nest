import { Injectable } from '@nestjs/common';
import mysql from "mysql2/promise"
import { Reservations } from './reservation.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservations13e',
});



@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
 async getFoglalas(){
    const [adatok] = await mysqlConnection.execute("SELECT id, email, startDate, guests FROM reservations");
    return adatok as Reservations[]
  }

  async addFoglalas(nev: string, email: string, startDate: Date, guests: number){
    await mysqlConnection.execute("INSERT INTO `reservations`(`name`, `email`, `startDate`, `guests`) VALUES ('?','?','?','?')", 
      [nev, email, startDate, guests])
  }



}
