
void writeObjectItem(PrintWriter o, String itemName, String n, String d, String c, int t, String i) {
  o.println("  " + itemName);
  o.println("    name: " + n);
  o.println("    desc: " + d);
  o.println("    class: " + c);
  o.println("    total: " + t);
  o.println("    ids: " + i);
}
