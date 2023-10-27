import * as fs from "node:fs";
import * as rs from "readline-sync";
import { User } from "./User";
import { LibraryItem } from "./Items";
import { Loan } from "./Loans";


export class FileManager {  //no va a crear ningun objeto, es una clase utilitaria. me sirve por los metodos que contienen no necesito instanciarla
  //no tiene  objetos propios. operar con archivos en nodejs con un modulo fs
  static readFile(url: string) { //metodo para leer un dato del archivo o bien leer todo los datos de un archivo y pasarlos a un array
    try {
      const files = fs.readFileSync(url, { encoding: "utf-8" });//que hace esto: codifico el json a javascrio/type
      //console.log("Lectura de datos satisfactoria");
     // rs.keyInPause("\n"); //que hace esto: entiendo que pone en pausa el msj de manera tal que no se cierre el prog
      return JSON.parse(files) as any[]; // convierto al json en array
    } catch (err) {
      console.log("Unexpected Error:", err);
    }
    //Pause to display messages
    rs.keyInPause("\n");
  }
  
  static appendFile(data: User[] | LibraryItem[] | Loan[], url: string) { //agrego un array al archivo json
    try {
      fs.writeFileSync( url, JSON.stringify(data, null, 2), {
        encoding: "utf8", //flag: 'w' //con flag w no agrego los archivos json sino que los reemplazo*
      });
     // console.log("Operation completed!\n");
     // rs.keyInPause("\n");
    } catch (err) {
      console.log("Unexpected Error:", err);
      rs.keyInPause("\n");
    }
  }
}

