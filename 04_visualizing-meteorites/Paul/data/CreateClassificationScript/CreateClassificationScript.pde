
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
  
  // Stops the program
  exit();
}
