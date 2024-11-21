 	
import uno

def convert_tabulated_text_to_table():
    """Convierte un texto tabulado en una tabla en LibreOffice Writer"""
    # Conectar al documento actual
    ctx = uno.getComponentContext()
    smgr = ctx.ServiceManager
    desktop = smgr.createInstanceWithContext("com.sun.star.frame.Desktop", ctx)
    doc = desktop.getCurrentComponent()
    
    # Verificar si estamos en un documento de texto
    if not hasattr(doc, "Text"):
        raise Exception("Este script debe ejecutarse en un documento de texto.")
    
    # Obtener el texto seleccionado
    selection = doc.CurrentController.Selection
    if selection.getCount() != 1:
        raise Exception("Por favor, selecciona un texto tabulado antes de ejecutar la macro.")
    
    selected_text = selection.getByIndex(0).String
    rows = selected_text.split("\n")  # Dividir por filas (nuevas líneas)
    data = [row.split("\t") for row in rows]  # Dividir cada fila por tabulaciones
    
    # Crear una tabla con el número de filas y columnas detectadas
    row_count = len(data)
    col_count = max(len(row) for row in data)
    table = doc.createInstance("com.sun.star.text.TextTable")
    table.initialize(row_count, col_count)
    
    # Insertar la tabla en el documento
    cursor = doc.Text.createTextCursor()
    doc.Text.insertTextContent(cursor, table, False)
    
    # Rellenar la tabla con los datos
    for i, row in enumerate(data):
        for j, cell in enumerate(row):
            table.getCellByPosition(j, i).String = cell

