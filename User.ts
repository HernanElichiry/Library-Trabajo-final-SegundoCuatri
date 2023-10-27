/*Gestionar estas entidades implica su creación, listado?, edición y eliminación. 
Cada entidad debe contar con un identificador único para mantener la integridad referencial.*/
//1.1- Creación y gestión de usuarios 
import { randomUUID as uid } from "node:crypto";

interface iAddress {
    street: string;
    number: number;
    apartment: string;   
  }
  
//los Usuarios
export class User {
            id: string = uid();
    private name: string;
    private address: iAddress;
    private phoneNumber: string;
            DNI: string;
    private scoring: number = 0;
    private isPenalized: boolean = false;
    private penalizeDate: Date;
    public constructor(name: string, address: iAddress, phoneNumber: string, DNI: string) {
      this.name = name;
      this.DNI = DNI;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.penalizeDate = new Date();
      
    }
  
    public getId(): string {
      return this.id;
    }
    public setName(name: string): void {
      this.name = name;
    }
    public getName(): string {
      return this.name;
    }
    public setAddress(address: iAddress): void {
      this.address = address;
    }
    public getAddress(): iAddress {
      return this.address;
    }
    public setPhoneNumber(phoneNumber: string): void {
      this.phoneNumber = phoneNumber;
    }
    public getPhoneNumber(): string {
      return this.phoneNumber;
    }

    public getDNI(): string {
      return this.DNI;
    }

    public setDNI(dni: string): void {
      this.DNI = dni;
    }
  
    public getScoring(): number {
      return this.scoring;
    }
    public increaseScoring(points: number): void {
      this.scoring += points;
    }
  
    public decreaseScoring(points: number): void {
      this.scoring -= points;
    }
  
    public getPenalizedStatus(): boolean {
      return this.isPenalized;
    }
  
    public penalizedUser(): void {
     this.isPenalized = true;
    }
  
    public penalizedDate(returnDate: Date): void {
      this.penalizeDate = returnDate;
    }
    
    public getpenalizeDate(): Date {
     return this.penalizeDate;
    }
  
    public setPenalizedStatus(boolean:boolean): void{
      this.isPenalized = boolean;
    } 
  }
  