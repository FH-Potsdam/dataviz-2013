
void writeObjectItem(PrintWriter o, ObjectItem i) {
  o.println("  " + i.itemName + ":");
  o.println("    name: '" + i.name + "'");
  o.println("    desc: '" + i.desc + "'");
  o.println("    class: '" + i.classification + "'");
  o.println("    total: " + i.total);
  o.println("    totalFell: " + i.totalFell);
  o.println("    totalFound: " + i.totalFound);
  
  // remove the "," at the end of the string
  String tmpRows = "";
  if(i.rows.charAt(i.rows.length()-1) == ',') {
    tmpRows = i.rows.substring( 0, i.rows.length()-1 );
  }
  
  o.println("    rows: [" + tmpRows + "]");
  
  println("Name    = " + i.name);
  println("- total = " + i.total);
}
