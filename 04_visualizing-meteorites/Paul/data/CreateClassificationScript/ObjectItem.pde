
class ObjectItem {
  
  String itemName = "itemName";
  String name = "THE NAME";
  String desc = "THE DESCRIPTION";
  String classification = "THE CLASSIFICATION";
  int total = 0;
  int totalFell = 0;
  int totalFound = 0;
  String rows = "";
  String[] searchItems;
  
  ObjectItem(String in, String n, String d, String c, String[] s) {
    itemName = in;
    name = n;
    desc = d;
    classification = c;
    searchItems = s;
  }
  
  /**
   * @param recclass
   *        The 'recclass' column content from the csv file.
   * @param fall
   *        The 'fall' column content from the csv file.
   * @param id
   *        The row number.
   */
  void classificationChecker(String recclass, String fall, int id) {
    for(int i=0; i<searchItems.length; i++) {
      //println("["+i+"]"+" Search Item = " + searchItems[i]);
      
      /* If the string is exactly the seach string...
       */
      if(recclass.equals(searchItems[i]) == true) {
        total++;
        fallChecker(fall, id);
        rows += id+",";
      }
      /* ...else check if the string starts with the search string.
       */
      else if(recclass.startsWith(searchItems[i])) {
        total++;
        fallChecker(fall, id);
        rows += id+",";
      }
    }
  }
  
  /**
   * @param fall
   *        The 'fall' column content from the csv file.
   * @param id
   *        The row number.
   */
  private void fallChecker(String fall, int id) {
    if(fall.equals("Fell") == true) {
      totalFell++;
    } else if(fall.equals("Found") == true) {
      totalFound++;
    } else {
      println("Error at fallChecker, row " + id);
    }
  }
}
