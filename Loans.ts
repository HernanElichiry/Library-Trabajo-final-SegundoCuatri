/*2- Gestión de préstamos y devoluciones.
2.1- Validar que no se pueda prestar un ítem si otro usuario lo tiene en préstamos.
2.2- Validar que no se pueda prestar un ítem si el usuario no está registrado.
2.3- Validar que no se pueda prestar un ítem si el usuario registrado está penalizado.
2.4- El préstamo debe indicar el día de inicio (fecha del préstamo) y la fecha de devolución (calcular una semana más desde la fecha de inicio).
2.5- Crear una escala de penalización que sume puntos al scoring del usuario:
	1 día después de la fecha: 2 puntos;
	entre 2 y 5 días después de la fecha: 3 puntos;
	más de 5 días: 5 puntos.
	Al acumular 6 puntos el usuario recibe una penalización que lo imposibilita de retirar ítems por una semana.*/

//Préstamos
import { randomUUID as uid } from "node:crypto";
import { User } from "./User";
import { LibraryItem } from "./Items";


export class Loan {
             id: string = uid();
    private  item: LibraryItem;
    private  user: User;
    private loanDate: Date;
    private dueDate: Date;
  
    constructor(item: LibraryItem, user: User, loanDate: Date) {
      this.item = item;
      this.user = user;
      this.loanDate = loanDate;// clase/obejto nativo de JS. Me da la fecha actual. 
      this.dueDate = new Date(); 
      this.dueDate.setDate(this.loanDate.getDate() + 7); //creo una nueva fecha.con un setter y un getter nativo. 
    }
  
    getId(): string {
      return this.id;
    }
    getItem(): LibraryItem {
      return this.item;
    }
    getUser(): User {
      return this.user;
    }
    getLoanDate(): Date {
      return this.loanDate;
    }
    getDueDate(): Date {
      return this.dueDate;
    }
    setItem(item:LibraryItem):void{
      this.item = item;
    }
    setUser (user:User):void{
      this.user = user;
    }
  
  }

  