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
 MailApp.sendEmail("alumnatsmxa@iesjoanramis.org","Alumnat 1r SMX: "+Assumpte, contingut, {attachments: [myFiles]});
}
