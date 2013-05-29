
// Create the Object Items
ObjectItem[] objectItems;

// Read the csv file
Table table;

// The file writer
PrintWriter output;


void setup() {
  setupObjectItems();
  setupTable();
  setupWriter();
  
  //println(objectItems[0].total);

  // Stops the program
  exit();
}
