
void writeObjectItem(PrintWriter o, ObjectItem i) {
  o.println("  " + i.itemName);
  o.println("    name: '" + i.name + "'");
  o.println("    desc: '" + i.desc + "'");
  o.println("    class: '" + i.classification + "'");
  o.println("    total: " + i.total);
  o.println("    rows: [" + i.rows + "]");
}
