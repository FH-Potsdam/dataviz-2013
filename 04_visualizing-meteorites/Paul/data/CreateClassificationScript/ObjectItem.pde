
class ObjectItem {
  
  String itemName = "itemName";
  String name = "THE NAME";
  String desc = "THE DESCRIPTION";
  String classification = "THE CLASSIFICATION";
  int total = 0;
  String rows = "";
  String[] searchItems;
  
  ObjectItem(String in, String n, String d, String c, String[] s) {
    itemName = in;
    name = n;
    desc = d;
    classification = c;
    searchItems = s;
  }
  
  void classificationChecker(String in, int id) {
    for(int i=0; i<searchItems.length; i++) {
      //println("["+i+"]"+" Search Item = " + searchItems[i]);
      
      // If the string is exactly the seach string...
      if(in.equals(searchItems[i]) == true) {
        total++;
        rows += id+",";
      }
      // ...else check if the string starts with the search string.
      else if(in.startsWith(searchItems[i])) {
        total++;
        rows += id+",";
      }
    }
  }
  
}
