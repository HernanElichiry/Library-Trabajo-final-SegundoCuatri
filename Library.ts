
/*3- Creación y gestión de estadísticas. Llevar registro de todos los préstamos en un archivo. Cada registro debería incluír la fecha del préstamos, el título y el nombre del usuario. 
Para crear archivos pueden utilizar el módulo File System de Node Js.
Dicho módulo tiene métodos para crear y leer archivos. Ese archivo servirá de base para listar por pantalla el historial de préstamos.
4- La gestión que realiza la biblioteca debe llevarse a cabo a través de un menú de opciones. Puden construirlo con el módulo nativo de Node Js llamado Readline o una bilbioteca externa como, por ejemplo, Inquirer.*/

//1- Administración de biblioteca.
import * as fs from "node:fs";
import * as rs from "readline-sync";
import { User } from "./User";
import { LibraryItem } from "./Items";
import { Book } from "./Book";
import { Magazine } from "./Magazine";
import { Loan } from "./Loans";
import { FileManager } from "./FileManger";


// clase Biblioteca
class Library {
    private items: LibraryItem[];
    private users: User[];
    private loans: Loan[];
    public constructor() {
      this.items = [];
      this.users = [];
      this.loans = [];
    }
  
    //crea un usuario 
    createUser(){
      console.log("========create user=========");
      rs.keyInPause();  
      const readResult = FileManager.readFile("./Users.json");
      if (readResult) {
        this.users = readResult;
      } 
      const DNI: string = rs.question("Ingrese DNI (sin espacios ni puntos) y presione enter:");
      if (this.users.some((existingUser) => existingUser.DNI === DNI)) {
         console.log("ya existe un Usuario registrado con ese DNI") 
         return;    
      } 

      const name: string = rs.question("Ingrese Nombre y Apellido del Usuario y presione enter:");
      const DireccionCalle: string = rs.question("Ingrese Direccion calle:");
      const DireccionNumero: number = rs.questionInt("Ingrese Direccion numero:");
      const DireccionDepto: string = rs.question("Ingrese Direccion piso/depto:"); 
      const phoneNumber: string = rs.question("Ingrese Numero de telefono:");
      
      const newUser = new User(name,{street: DireccionCalle, number: DireccionNumero , apartment: DireccionDepto}, phoneNumber, DNI)
      this.users.push(newUser);
      this.appendUsers();

      console.log("Usuario creado con exito", newUser);
      console.log(this.users)
    
    }
    
    //agrega un usuario ya instanciado
    addUser(user: User): void { 
      rs.keyInPause();
      if (!this.isUserDuplicate(user)) {
          this.users.push(user); 
          FileManager.appendFile(this.users, "./Users.json");
          console.log(`Usuario ${user.getName()} agregado con éxito.`);
          
        } else {
          console.log('El usuario ya existe en la lista.');
          return;
        } 
        
        }

    //crear un item libro
    createItemBook(){
      console.log("========create Items=========");
      rs.keyInPause();  
      const readResult = FileManager.readFile("./ItemsArray.json"); //1 
      if (readResult) {
        this.items = readResult;
      } 

      const title: string = rs.question("Ingrese Titulo:");
      const existingItem = this.items.some((existingItem) => existingItem.title === title)
      if (existingItem) {
        console.log("ya existe un Item registrado con ese titulo") 
        return;    
     }

      const year: number = rs.questionInt("Ingrese Anio:");
      const author: string = rs.question("Ingrese Autor:");
      //const editor: string = rs.question("Ingrese Editor:"); 
      const newbook = new Book ( title, year, author);   
 
      this.items.push(newbook);
      FileManager.appendFile(this.items,"./ItemsArray.json")
      console.log("Item creado con exito",);

    }
    
    //crear un item magazine
    createItemMagazine(){
      console.log("========create Item Magazine=========");
      rs.keyInPause();  
      const readResult = FileManager.readFile("./ItemsArray.json"); //1 
      if (readResult) {
        this.items = readResult;
      } 

      const title: string = rs.question("Ingrese Titulo:");
      const existingItem = this.items.some((existingItem) => existingItem.title === title)
      if (existingItem) {
        console.log("ya existe un Item registrado con ese titulo") 
        return;    
     }
      const year: number = rs.questionInt("Ingrese Anio:");
      const editor: string = rs.question("Ingrese Editor:");
      
      const newMagazine = new Magazine ( title, year, editor);   
 
      this.items.push(newMagazine);
      FileManager.appendFile(this.items,"./ItemsArray.json")
      console.log("Item creado con exito",);

    }
            
    //creador de prestamos - en construccion -  
  loanCreator() {
  const readResultItems = FileManager.readFile("./ItemsArray.json"); //1 lo primero es asegurarme que los items esten cargados
   if (readResultItems) {
     this.items = readResultItems;
   } 
   
   const readResultUsers = FileManager.readFile("./Users.json");
   if (readResultUsers) {//2 cargo tambien los usuarios
     this.users = readResultUsers;
   } 
 
   const readResultLoans = FileManager.readFile("./LoansArray.json");
   if (readResultLoans) {//3 cargo tambien los prestamos
     this.loans = readResultLoans;
   } 
 
   //4. traigo un usuario atraves del dni
   const DNI: string = rs.question("Ingrese DNI (sin espacios ni puntos) y presione enter:");
   const existingUserIndex = this.users.findIndex((existingUser) => existingUser.DNI === DNI)    
   let UsertoLoan: User;
   if (existingUserIndex !== -1) { // y verifico que exista
     UsertoLoan = this.users[existingUserIndex];
     console.log("Usuario encontrado:", UsertoLoan);
   } else {
     console.log("No se encontró ningún usuario con el DNI proporcionado.");
     return;
   }
    
    
 //5.solicito la fecha actual de retiro 
 //  const loanDate: number = rs. questionInt("Ingrese la fecha en formato YYYY-MM-DD:");
 const fecha: string = rs.question("Ingrese fecha de la siguiente manera 'yyyy/mm/dd':");
 //const date = new Date();
 const date = this.newdate(fecha); 
 
 console.log(date)
 
  //6.ahora voy a verificar que ese usuario no este penalizado
  /* const penalizateDate = UsertoLoan.getpenalizeDate();
   const lateDays = Math.ceil((date.getTime() - penalizateDate.getTime()) / (1000 * 3600 * 24));
   if (lateDays >= 8){  
     UsertoLoan.decreaseScoring(0);
     UsertoLoan.setPenalizedStatus(false);
      
 }
   if (UsertoLoan.getPenalizedStatus() === true){ // verifico que ese usuario no este penalizado
     console.log("el usuario se encuentra penalizado para retirar libros");
     return;
   }*/
   
       //6. traigo un item atraves del ID
        let itemToLoan: LibraryItem;
        const item: string = rs. question("Ingrese Item ID (sin espacios ni puntos) y presione enter:");
        const existingItemIndex = this.items.findIndex((existing) => existing.id === item)    
        if (existingItemIndex !== -1) { // y verifico que exista
          itemToLoan = this.items[existingItemIndex];
          console.log("ITEM encontrado:", itemToLoan);
        } else {
          console.log("No se encontró ningún usuario con el DNI proporcionado.");
          return;
        }
         
  
   //7.valido que este disponible el item.
    const existing: LibraryItem | undefined = this.findItem(itemToLoan);
     if (!existing|| !existing.isItemAvailable()) {
     console.log("Item no está disponible.");
     return;
   }
 
   //8. si exite y esta disponible entonces lo marco como no disponible pues lo voy a prestar
   itemToLoan.markAsUnavailable();
   
   //9 creo finalmente el prestamo
   const loan = new Loan(itemToLoan, UsertoLoan, date);
   this.loans.push(loan);
  
 /* console.log(
     `${UsertoLoan.getName()} retira "${itemToLoan.getTitle()}" con fecha de devolución ${loan
       .getDueDate()
       .toLocaleDateString()}`
   );*/
 
   //hago el prestamo
 
  // this.loanItem(itemToLoan, UsertoLoan, date);
   
   //10. vuelco la informacion en el Json
   FileManager.appendFile(this.loans,"./LoansList.json")
   console.log("Prestamo exitoso"); 
   
 }

    //agrega item  
    addItem(item: LibraryItem): void {
      rs.keyInPause();
      /*const readResult =   FileManager.readFile("./ItemsArray.json");// traigo el json y lo meto en el array
      if (readResult) {
        this.loans = readResult;
      } */
      const existingItem: LibraryItem | undefined = this.findItem(item);
      if (existingItem) {
        console.log(`Item ${existingItem.getTitle()} ya existe en los registros`);
        return;
      }
      this.items.push(item);
      console.log(`Item ${item.getTitle()} agregado con exito`);

      /*FileManager.appendFile(this.items, "./ItemsArray.json");
      console.log("Prestamo realizado con exito",);*/


    }
      
    //realizo un prestamo
    loanItem(item: LibraryItem, user: User, loanDate: Date): void {
      rs.keyInPause();
      /*const readResult =   FileManager.readFile("./LoansList.json");// traigo el json y lo meto en el array
      if (readResult) {
        this.loans = readResult;
      } */
      
      if(!this.isUserDuplicate(user)){//valido que ul usuario no este duplicado
        console.log("Usuario no registrado");
        return;
      }
          
     if (user.getPenalizedStatus() === true){           
      const penalizateDate = user.getpenalizeDate();
      const lateDays = Math.ceil((loanDate.getTime() - penalizateDate.getTime()) / (1000 * 3600 * 24));
      if (lateDays >= 8){
          user.decreaseScoring(0);
          user.setPenalizedStatus(false);     
    } else{
      console.log("el usuario se encuentra penalizado para retirar libros");
      return;
    }  
      }

      const existingItem: LibraryItem | undefined = this.findItem(item);
      if (!existingItem || !existingItem.isItemAvailable()) {
        console.log("Item no está disponible.");
        return;
      }

      existingItem.markAsUnavailable();
      const loan = new Loan(existingItem, user,loanDate);
      this.loans.push(loan);
      console.log(
        `${user.getName()} retira "${existingItem.getTitle()}" con fecha de devolución ${loan
          .getDueDate()
          .toLocaleDateString()}`
      );

      /*FileManager.appendFile(this.loans, "./LoansList.json");
      console.log("Prestamo realizado con exito",);*/

    }
   
   /*2.5- Crear una escala de penalización que sume puntos al scoring del usuario:
	1 día después de la fecha: 2 puntos;
	entre 2 y 5 días después de la fecha: 3 puntos;
	más de 5 días: 5 puntos.
	Al acumular 6 puntos el usuario recibe una penalización que lo imposibilita de retirar ítems por una semana.*/
    
   //devolver un Item
    returnItem(item: LibraryItem, user: User, returnDate: Date): void {
     /* const readResult = FileManager.readFile("./LoansArray.json");// traigo el json y lo meto en el array
      if (readResult) {
        this.loans = readResult;
      } */
      
      const loan = this.findActiveLoan(item, user);
      if (!loan) {
        console.log("Préstamo no registrado. Revise Título y Usuario");
        return;
      }
      const existingItem = this.findItem(item);
      if (existingItem) {
        existingItem.markAsAvailable();
        this.loans = this.loans.filter((lo) => lo !== loan);
       // console.log(`${user.getName()} devolvió "${item.getTitle()}"`); 
      }
      
      const dueDate = loan.getDueDate();
      if (returnDate > dueDate) {
        const lateDays = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
        let lateFee = 0;
        
        switch (lateDays) {
          case 1:
            lateFee = 2;
            break;
          case 2:
          case 3:
          case 4:
          case 5:
            lateFee = 3;
            break;
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            lateFee = 6;
            break;
          default:
            lateFee = lateDays;
            break;
        }
        
        user.increaseScoring(lateFee); 
        
        if(user.getScoring() === 6){
        user.penalizedUser();
        user.penalizedDate(returnDate); 
        console.log(`${user.getName()} devolvió "${item.getTitle()}" tarde. ha sido penalizado y no podra retirar libros por 7 dias.`);
        return; 
     }

     if(user.getScoring() > 10){
        this.removeUser(user);
        console.log(`${user.getName()} devolvió "${item.getTitle()}" tarde. ha sido penalizado y queda eliminado!`);
        return; 
     }


        console.log(`${user.getName()} devolvió "${item.getTitle()}" tarde. Penalización: ${lateFee} puntos.`);
      }  
      
      else {
        console.log(`${user.getName()} devolvió "${item.getTitle()}" a tiempo.`);
        user.decreaseScoring(1);
      }
      this.loans = this.loans.filter((resLoan) => resLoan !== loan);
      console.log(`${user.getName()} devolvió "${item.getTitle()}" en la fecha "${returnDate.toLocaleDateString()}"`);

     /* FileManager.appendFile(this.loans, "./LoansArray.json");
      console.log("Prestamo realizado con exito",);*/
    }

    //buscar prestamo activo
    findActiveLoan(item: LibraryItem, user: User): Loan | undefined {
      return this.loans.find(
        (loan) => loan.getItem() === item && loan.getUser() === user
      );
    }
 
    //buscar item
    findItem(item: LibraryItem): LibraryItem | undefined {
      return this.items.find((i) => i === item);
    }  
    
    // verifica si el usuario esta dentro del array
    isUserValid(user: User): boolean {
      return this.users.includes(user);
    }

   //elimia un usuario
   removeUser(user: User): void {
       this.users = this.users.filter((remUser) => remUser !== user);
       FileManager.appendFile(this.users, "./Users.json");
       return console.log (`User ${user.getName()} borrado con exito`);
       
       }

    //elimina un item   
  removeItem(item:LibraryItem): void {
    this.items = this.items.filter((remItem) => remItem !== item); 
    FileManager.appendFile(this.items, "./ItemsArray.json");
    return console.log (`Item ${item.getTitle()} borrado con exito`);
       }

//elimina un prestamo
removeLoan() {
  console.log("======== Remove Loans ========\n");
  const readResult = FileManager.readFile("./LoansArray.json");
  if (readResult) {
    this.loans = readResult;
  } //traigo los datos del json y los meto en el array
  
  let loanToRemove: Loan;
  const loan: string = rs. question("Ingrese Item ID (sin espacios ni puntos) y presione enter:");
  const existingItemIndex = this.loans.findIndex((existing) => existing.id === loan)    
  if (existingItemIndex !== -1) { // y verifico que exista
    loanToRemove = this.loans[existingItemIndex];
    console.log("Loan encontrado:", loanToRemove);
  } else {
    console.log("No se encontró ningún prestamo con el ID proporcionado.");
    return;
  }

  this.loans = this.loans.filter((resLoan) => resLoan !== loanToRemove);
  console.log(this.loans, "borrado");
  this.saverLoans(); 
  
  rs.keyInPause();
    
       }

 //carga los datos del json en el array
 readUsers() {
        const readResult = FileManager.readFile("./Users.json");
        if (readResult) {
          this.users = readResult;
          console.log("======== Users =========\n");
          if (!this.users.length) {
            console.log("No users found. \n");
          } else {
            console.log("Datos cargados exitosamente");
            };
          }
        }

  // //carga los datos del json en el array
 readItems(){ const readResult = FileManager.readFile("./itemsArray.json");
        if (readResult) {
          this.items = readResult;
          console.log("======== Users =========\n");
          if (!this.users.length) {
            console.log("No users found. \n");
          } else {
            console.log("Datos cargados exitosamente");
            };
          }
        }


        
  //guarda los datos user en el jason
    appendUsers (): void { 
      fs.writeFileSync( "./Users.json", JSON.stringify(this.users, null, 2), {
        encoding: "utf8", //flag: 'w' //con flag w no agrego los archivos json sino que los reemplazo*
      });

         // FileManager.appendFile(this.users, "./Users.json");

        }
    

    findUser(user: User): User | undefined {
        return this.users.find((i) => i === user);
    }
 
    isUserDuplicate(user: User): boolean {
      const userDni = user.getDNI();
      return this.users.some((existingUser) => existingUser.DNI === userDni);
    }  


private newdate (date: string ): Date {
  const Fecha = new Date (date);
   return Fecha;
 }

//muestro usuarios 
showUsers(){
  this.users.forEach((user) => {
    console.log(user);
  });
} 
 
showLoans(){
  rs.keyInPause();
      this.loans.forEach((loan) => {
        console.log(`
      ID: ${loan.getId()}
      User: ${loan.getUser().getName()}  
      Title: ${loan.getItem().getTitle()}
      Date:  ${loan.getLoanDate()} 
      ---  
      `);
      });
    }

showItems(){
  rs.keyInPause();
  this.items.forEach((item) => {
    console.log(`
  Title: ${item.getTitle()}
  Year: ${item.getYear()}  
 
  ---  
  `);
  });

}    

//guardo los items en el json
appendItems(){
  FileManager.appendFile(this.items, "./itemsArray.json");

}

//guardar los prestamos en el json
saverLoans(){
  const filteredLoans = this.loans.map((loan) => ({
    id: loan.getId(),
    title: loan.getItem().getTitle(),
    name: loan.getUser().getName(),
    loanDate: loan.getLoanDate()
  }));

  fs.writeFileSync( "./LoansArray.json", JSON.stringify(filteredLoans, null, 2), {
    encoding: "utf8", //flag: 'w' //con flag w no agrego los archivos json sino que los reemplazo*
  });
  
}

}

  const book01 = new Book("El resplandor", 1977, "Sthephen King");
  const magazine01 = new Magazine("Revista Reader's digest", 1998, "TRD Association");
  const user01 = new User(
    "Hernan Elichiry",
    { street: "Colon", number: 611, apartment: "8b" },
    "123-444-555",
    "35412733"
  );
  const user02 = new User(
    "Bon Jovi",
    {
      street: "Av. Independencia",
      number: 580,
      apartment: "2B",
    },
    "011-555-555",
    "35412734"
  );
  const user03 = new User(
    "Juan Melendez",
    {
      street: "Sto. Cabral",
      number: 733,
      apartment: "",
    },
    "2983-2983",
    "35412735"
  );
  
  const library = new Library();
  console.log("-----Add Users-----");
  library.readUsers();
  library.addUser(user01); //lo agrega al array y lo guarda en el json
  library.addUser(user03); //lo agrega
  library.addUser(user02); //lo agrega 
  library.addUser(user01); //
  console.log("----------");
 
   //console.log("-----Show Users-----");
   //library.showUsers();
  
  console.log("-----Add Items-----");
  library.addItem(book01); //lo agrega
  library.addItem(book01); //me dice que ya existe
  library.addItem(magazine01);
  library.appendItems();
  
  console.log("-----Show Items-----");
  library.showItems();

  console.log("-----Create Loans-----");
  const Fecha = new Date ('10/01/2023');
  library.loanItem(book01,user03,Fecha);
  library.saverLoans();

  console.log("-----Create Loans-----");
  const Fecha2 = new Date ('10/01/2023');
  library.loanItem(magazine01,user01,Fecha2);
  library.saverLoans();
 
  console.log("-----Show Loans-----");
  library.showLoans();  //muestro los prestamos

  console.log("vuelvo a prestar lo mismo");
  const Fecha3 = new Date ('10/06/2023');
  library.loanItem(magazine01,user02,Fecha3);
  library.saverLoans();
  
  console.log("-----Return Loans-----")
  const Fechadevolucion = new Date('10/25/2023') //mes,dia,ano//
  library.returnItem(book01,user03,Fechadevolucion); //devuelvo 
  library.saverLoans(); // guardo cambios en el json de loans
  library.appendUsers();
 
  //console.log("-----Removers-----")
  //library.removeUser(user01);
  //library.appendUsers(); //guardo cambios en el json de user
  //library.removeItem(book01);
  //library.removeLoan(); //funciona solamente si rompo el encapsulamiento poniendo el id  publico
 
  //console.log("-----Creators-----")
  //library.createUser();
  //library.createItemBook();
  //library.loanCreator();*/

  





  

  


  
 













