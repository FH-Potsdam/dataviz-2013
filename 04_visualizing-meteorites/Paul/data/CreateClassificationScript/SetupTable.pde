
void setupTable() {
  // You need to copy the csv file to the data directory.
  table = loadTable("meteorites.csv", "header");
  println("--> CSV File Loaded");
  //println("--> Total Rows: " + table.getRowCount());
  
  // Loop the csv file
  for (int i=0; i<table.getRowCount(); i++) {
    String recclass = table.getString(i, "recclass");
    //println("["+i+"] recclass = " + recclass);
    
    for(int j=0; j<objectItems.length; j++) {
      objectItems[j].classificationChecker(recclass, i);
    }
    
  }
}
