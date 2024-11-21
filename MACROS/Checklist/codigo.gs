function enviar(){
 // Prec:
 // Post: Envia el document actual a tot el grup
 var llibre      = DocumentApp.getActiveDocument();
 var full        = llibre.getAs('application/pdf').getBytes();
 var NomFitxer   = "checklist.pdf";    // Nom que tindrà el fitxer que els envies
 var Assumpte    = "Vos envio la meva checklist";   // Agafem l'assumpte del missatge
 var Missatge    = "Tal i com tots hem de fer al exercici 6 de la tasca 2, vos compartesc la meva checklist";   // Agafem el cos del missatge
 var myFiles= {fileName:NomFitxer, content:full, mimeType:"application/pdf"};
 var salt = "\n";
 var pepe = "Hola al·lots,"+salt+Missatge; 
 var contingut = pepe+salt+"Per favor relleneu-la. Gràcies.";

  var IDCalc =  "1SFtJyfJM2h10yyTqQf6SE61V_xbc34EzXZxfOsj7GQ0" 

 // Obtenim el full de càlcul amb els correus electrònics

 var ss = SpreadsheetApp.openById(IDCalc).getSheetByName("Full 1");  // Obtenir el full de càlcul actiu

 var data = ss.getDataRange().getValues();  // Agafem la columna A amb els correus (ajusta si està en una altra columna)

  // Recorrem la llista de correus i enviem el correu a cada un

 for (var i = 1; i < data.length; i++) {

   var email = data[i][0];  // Cada correu de la columna A

   var name = data[i][1];



   if (email) {  // Si el correu no és buit

     MailApp.sendEmail(email, "Alumnat 1r SMX: " + "checklist" + name, contingut, {attachments: [myFiles]});

   }

 }
}


