
import { randomUUID as uid } from "node:crypto";

//clase base de los items en stock (revistas o libros)
export class LibraryItem {
              id: string = uid();
             title: string;
    private year: number;
    private isAvailable: boolean = true;
    public constructor(title: string, year: number) {
      this.title = title;
      this.year = year;
     
    }
    public setTitle(title: string): void {
      this.title = title;
    }
    public setYear(year: number): void {
      this.year = year;
    }
    public getTitle(): string {
      return this.title;
    }
    public getYear(): number {
      return this.year;
    }
    public isItemAvailable(): boolean {
      return this.isAvailable;
    }
    markAsUnavailable() {
      this.isAvailable = false;
    }
    markAsAvailable() {
      this.isAvailable = true;
    }
  }
  

