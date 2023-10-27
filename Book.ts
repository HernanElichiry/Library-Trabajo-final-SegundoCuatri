import { LibraryItem } from "./Items";

//1.2- Creación y gestión de libros *
//libros
export class Book extends LibraryItem {
    private author: string;
    public constructor(title: string, year: number, author: string) {
      super(title, year);
      this.author = author;
    }
    public setAuthor(author: string): void {
      this.author = author;
    }
    getAuthor() {
      return this.author;
    }

  }

  