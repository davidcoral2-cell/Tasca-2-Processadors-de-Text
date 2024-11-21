 	
import uno

def convert_tabulated_text_to_table():
    ctx = uno.getComponentContext()
    smgr = ctx.ServiceManager
    desktop = smgr.createInstanceWithContext("com.sun.star.frame.Desktop", ctx)
    doc = desktop.getCurrentComponent()
    
    if not hasattr(doc, "Text"):
        raise Exception("Este script debe ejecutarse en un documento de texto.")
    
    selection = doc.CurrentController.Selection
    if selection.getCount() != 1:
        raise Exception("Por favor, selecciona un texto tabulado antes de ejecutar la macro.")
    
    selected_text = selection.getByIndex(0).String
    rows = selected_text.split("\n") 
    data = [row.split("\t") for row in rows]
    
    row_count = len(data)
    col_count = max(len(row) for row in data)
    table = doc.createInstance("com.sun.star.text.TextTable")
    table.initialize(row_count, col_count)
    
    cursor = doc.Text.createTextCursor()
    doc.Text.insertTextContent(cursor, table, False)
    
    for i, row in enumerate(data):
        for j, cell in enumerate(row):
            table.getCellByPosition(j, i).String = cell

