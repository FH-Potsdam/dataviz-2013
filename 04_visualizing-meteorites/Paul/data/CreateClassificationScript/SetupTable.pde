
void setupTable() {
  // You need to copy the csv file to the data directory.
  table = loadTable("meteorites.csv", "header");
  println("--> CSV File Loaded");
  //println("--> Total Rows: " + table.getRowCount());

  // Loop the csv file
  for (int i=0; i<table.getRowCount(); i++) {
    String recclass = table.getString(i, "recclass");
    //println("["+i+"] recclass = " + recclass);

    for (int j=0; j<objectItems.length; j++) {
      objectItems[j].classificationChecker(recclass, i);
    }

    
    // Solving search problem with the "L Group"
    if (recclass.equals("L") == true) {
      objectItems[0].total++;
      objectItems[0].rows += i+",";
      //println("["+i+"] = " + recclass);
    }
    // ... "H Group" problem
    if (recclass.equals("H") == true) {
      objectItems[1].total++;
      objectItems[1].rows += i+",";
      //println("["+i+"] = " + recclass);
    }
    
    
  }
}
